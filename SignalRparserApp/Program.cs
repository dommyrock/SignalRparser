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
        #region Properties

        public static string Url { get; set; }//TEmp ...remove after refactor
        public static ScrapingBrowser Browser { get; set; }
        public static List<string> InputList { get; set; }
        public static List<string> WebShops { get; set; }

        //refactor this in hashset ? or some other key -value pair (maybe concurrent ?), parallel.foreach , caching ...
        public static Dictionary<string, bool> ScrapedDictionary { get; set; }

        #endregion Properties

        // ALWAYS CHECK FOR " robots.txt" BEFORE SCRAPING WHOLE PAGE !

        static async Task Main(string[] args)
        {
            #region Start SignalR hub

            //TODO : move this to separate console app , find out how to subscribee to event in tpl dataflow --->real time publisher, than oush event to client hub
            var hubConnectionBuilder = new HubConnectionBuilder()
                .WithUrl("https://localhost:5001/outputstream")
                .WithAutomaticReconnect();
            await using HubConnection hubConnection = hubConnectionBuilder.Build();

            //Subscribe to events
            //(called after client sucessfuly reconnects)
            hubConnection.Reconnected += async connectedId =>
            {
                await hubConnection.SendAsync("PublishSensorData", args.Length == 0 ? "default_Producer" : args[0], GenerateTestData());
            };
            await hubConnection.StartAsync();//connrction to server

            #region TestMethod

            //Test ------------TEMP COMENTED WHILE I TEST OUTPUT FROM TPL DATAFLOW PIPELINE
            //await hubConnection.SendAsync("PublishSensorData", args.Length == 0 ? "x" : args[0], GenerateTestData());

            #endregion TestMethod

            #endregion Start SignalR hub

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

        //Test method (like streaming vido. i stream items as they arrive.)
        static async IAsyncEnumerable<string> GenerateTestData()
        {
            string initString = "Start:";
            int counter = 0;
            while (true)
            {
                counter++;
                yield return initString + $"append num{counter}"; //return items as they arrive
                await Task.Delay(100);
            }
        }
    }
}