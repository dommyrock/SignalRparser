using Microsoft.AspNetCore.SignalR.Client;
using ScrapySharp.Network;
using SiteSpecificScrapers.Helpers;
using SiteSpecificScrapers.Scrapers;
using SiteSpecificScrapers.Scrapers.Jobs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalRparserApp
{
    class Program
    {
        // ALWAYS CHECK FOR " robots.txt" BEFORE SCRAPING WHOLE PAGE !
        // NOTE : !!!! When I need to test producers flow , set it as startup project and start webApp/ hub though cmd instead !!!!!
        //VS studio shortcuts: https://www.dofactory.com/reference/visual-studio-shortcuts
        //scrapysharp repo :https://github.com/rflechner/ScrapySharp

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

            //var hubConnectionBuilder = new HubConnectionBuilder()
            //    .WithUrl("https://localhost:5001/outputstream")
            //    .WithAutomaticReconnect();
            //await using HubConnection hubConnection = hubConnectionBuilder.Build();
            ////Subscribe to onReconnect event (called after web app is restarted after crash/close)
            //hubConnection.Reconnected += async connectedId =>
            //{
            //    await hubConnection.SendAsync("PublishSensorData", args.Length == 0 ? "default_Producer" : args[0], GenerateTestData());//TEMP Testing only
            //};
            //connection to server (commment this line while testing producer.)
            //await hubConnection.StartAsync(); //this will fail if "StreamOutputWebApp" isnt started

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
                //Only run scraper (no TPL DF , no SignalR)
                //init
                var compositionRoot = new CompositionRoot(Browser, new MojPosao());
                //run
                compositionRoot.RunListedScrapers();

                //NOTE : Version with SignalR stream from producer to webApp (using TPL Dataflow)
                ////Pass all scraper clases that implement ISiteSpecific (with Polymorphism)
                //var compositionRoot = new CompositionRoot(Browser, hubConnection, args,
                //        new NabavaNet()
                //        //TODO
                //        //new AdmScraper(),
                //        //new AbrakadabraScraper() todo extractinto separate class "InitScrapers:ISiteSpecific"
                //        //new MojPosao()
                //        );
                //compositionRoot.RunDataflow();//Synchronous pipe so i dont need to await it.
            }
            catch (Exception ex)
            {
                throw ex;
            }

            #endregion Composition Root

            #region tpl error catching

            //var throwIfNegative = new ActionBlock<int>(n =>
            //{
            //    Console.WriteLine("n = {0}", n);
            //    if (n < 0)
            //    {
            //        throw new ArgumentOutOfRangeException();
            //    }
            //});
            //// Create a continuation task that prints the overall
            //// task status to the console when the block finishes.
            //throwIfNegative.Completion.ContinueWith(task =>
            //{
            //    Console.WriteLine("The status of the completion task is '{0}'.",
            //       task.Status);
            //});

            //// Post values to the block.
            //throwIfNegative.Post(0);
            //throwIfNegative.Post(12);
            //throwIfNegative.Post(-1);
            //throwIfNegative.Post(1);
            //throwIfNegative.Post(-2);
            //throwIfNegative.Complete();

            //// Wait for completion in a try/catch block.
            //try
            //{
            //    throwIfNegative.Completion.Wait();
            //}
            //catch (AggregateException ae)
            //{
            //    // If an unhandled exception occurs during dataflow processing, all
            //    // exceptions are propagated through an AggregateException object.
            //    ae.Handle(e =>
            //    {
            //        Console.WriteLine("Encountered {0}: {1}",
            //           e.GetType().Name, e.Message);
            //        return true;
            //    });
            //}

            #endregion tpl error catching

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