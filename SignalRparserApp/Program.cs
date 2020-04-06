using Microsoft.AspNetCore.SignalR.Client;
using ScrapySharp.Network;
using SiteSpecificScrapers.Helpers;
using SiteSpecificScrapers.Scrapers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalRparserApp
{
    class Program
    {
        // ALWAYS CHECK FOR " robots.txt" BEFORE SCRAPING WHOLE PAGE !
        // NOTE : !!!! When I need to test producers flow , set it as startup project and start webApp/ hub though cmd instead !!!!!

        #region Properties

        public static string Url { get; set; }//TEmp ...remove after refactor
        public static ScrapingBrowser Browser { get; set; }
        public static List<string> InputList { get; set; }
        public static List<string> WebShops { get; set; }

        //refactor this in hashset ? or some other key -value pair (maybe concurrent ?), parallel.foreach , caching ...
        public static Dictionary<string, bool> ScrapedDictionary { get; set; }

        #endregion Properties

        static async Task Main(string[] args)
        {
            #region SignalR_hub config

            var hubConnectionBuilder = new HubConnectionBuilder()
                .WithUrl("https://localhost:5001/outputstream")
                .WithAutomaticReconnect();
            await using HubConnection hubConnection = hubConnectionBuilder.Build();

            await hubConnection.StartAsync();//connrction to server

            #region Test_Producer for SignalR_hub

            //Subscribe to events (called after client sucessfuly reconnects)
            //hubConnection.Reconnected += async connectedId =>
            //{
            //    await hubConnection.SendAsync("PublishSensorData", args.Length == 0 ? "default_Producer" : args[0], GenerateTestData());
            //};

            //Test ------------TEMP COMENTED WHILE I TEST OUTPUT FROM TPL DATAFLOW PIPELINE
            //await hubConnection.SendAsync("PublishSensorData", args.Length == 0 ? "x" : args[0], GenerateTestData());

            #endregion Test_Producer for SignalR_hub

            #endregion SignalR_hub config

            string url = Url = "http://nabava.net";
            ScrapedDictionary = new Dictionary<string, bool>();
            InputList = new List<string>();
            WebShops = new List<string>();

            Browser = new ScrapingBrowser()
            {
                UserAgent = FakeUserAgents.Chrome24,
                IgnoreCookies = true,
                AutoDownloadPagesResources = false,
            };

            #region Composition Root

            try
            {
                //Pass all scraper clases that implement ISiteSpecific (with Polymorphism)
                var compositionRoot = new CompositionRoot(Browser, hubConnection, args,
                        new NabavaNet()
                        //TODO
                        //new AdmScraper(),
                        //new AbrakadabraScraper()
                        );
                compositionRoot.RunAll();//Synchronous pipe so i dont need to await it.
            }
            catch (Exception ex)
            {
                throw ex;
            }

            #endregion Composition Root

            Console.ReadLine();
        }

        static async IAsyncEnumerable<string> GenerateTestData()
        {
            string initString = "Start:";
            int counter = 0;
            while (true)
            {
                counter++;
                yield return initString + $"append num{counter}"; //return items as they arrive (like streaming vido.)
                await Task.Delay(100);
            }
        }
    }
}