using ScrapySharp.Network;
using SiteSpecificScrapers.Helpers;
using SiteSpecificScrapers.Scrapers;
using System;
using System.Collections.Generic;

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

        static void Main(string[] args)
        {
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
                var compositionRoot = new CompositionRoot(Browser,
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

            Console.ReadKey();
        }
    }
}