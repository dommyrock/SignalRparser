using ScrapySharp.Extensions;
using ScrapySharp.Network;
using SiteSpecificScrapers.Base;
using SiteSpecificScrapers.Helpers;
using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Scrapers
{
    public class NabavaNet : BaseScraperClass, ISiteSpecific
    {
        //NOTE :(ScrapySharp is wrapper around html agility pack , it exposses its jquery like markup parsing methods)

        public string Url { get; set; }
        public List<string> InputList { get; set; }
        public string SitemapUrl { get; set; }
        public ScrapingBrowser Browser { get; set; }
        public Dictionary<string, bool> ScrapedKeyValuePairs { get; set; }
        private List<string> WebShops { get; set; }

        public NabavaNet()
        {
            this.Url = "http://nabava.net";
            InputList = new List<string>(); //TODO:use instance passd from main , else this gets oveerriden
        }

        public async Task<bool> ScrapeSitemapLinks(ScrapingBrowser browser)
        {
            this.Browser = browser;

            //Call common sitemapFetch method from Base class
            SitemapUrl = await base.GetSitemap(Browser, Url);

            if (SitemapUrl != string.Empty)
            {
                WebPage document = Browser.NavigateToPage(new Uri(SitemapUrl));//might replace with basic downloadstrignasync...

                //Specific  query for nabava.net
                var nodes = document.Html.CssSelect("loc").Select(i => i.InnerText).ToList();
                InputList.AddRange(nodes);

                InputList.RemoveAt(0);
                Url = InputList[0];
                return true;
            }
            return false;
        }

        /// <summary>
        /// Adds webshops scraped from sitemap to "WebShops" list.
        /// </summary>
        public async Task<Tuple<List<string>, Dictionary<string, bool>>> ScrapeWebshops()//it has to be public since its exposed through ISiteSpecific interface
        {
            WebShops = new List<string>();
            ScrapedKeyValuePairs = new Dictionary<string, bool>();

            WebShops = CachingExtensions.GetFromLocalCache(WebShops);
            InputList = CachingExtensions.GetFromLocalCache(InputList, true, "nNetSections.json");

            //Return Tuple https://stackoverflow.com/questions/748062/return-multiple-values-to-a-method-caller
            var result = Tuple.Create(WebShops, ScrapedKeyValuePairs);
            //FOR NOW only return collection of previously scraperd sites___________________________TODO: TEMP for testing....refactor after
            return result;

            if (WebShops.Count == 0)
            {
                while (true)
                {
                    //NOTE: we fetch 1 by 1 node because shop links still need to be scraped from nabava.net(direct Urls-are not in sitemap)
                    WebPage pageSource = await Browser.NavigateToPageAsync(new Uri(Url));//can speed this up by using DownloadStringAsync(but need other filter to extract shop link (regex))

                    var node = pageSource.Html.SelectSingleNode("//b");//get<b> node/Link select all nodes
                    if (node != null)
                    {
                        bool isLink = node.InnerHtml.StartsWith("http");
                        if (isLink)
                        {
                            //InputList.Add(node.InnerHtml);

                            WebShops.Add(node.InnerHtml);

                            //Real link assignment
                            Url = node.InnerHtml;
                            Console.WriteLine(node.InnerHtml);
                        }
                    }
                    else
                    {
                        Console.WriteLine($"All [{WebShops.Count}] Shops scraped from nabava.net/sitemap.xml \n");

                        //Set url to [0] item in "Webshop" queue before exiting
                        Url = WebShops[0];

                        CachingExtensions.CacheToLocalCache(WebShops);
                        CachingExtensions.CacheToLocalCache(InputList, "nNetSections.json");
                        //Exit loop when all webshops are scraped
                        break;
                    }

                    if (!ScrapedKeyValuePairs.ContainsKey(Url))//TODO : use Hash(set)  or concurrent collection
                    {
                        ScrapedKeyValuePairs.Add(Url, true);//added scraped links from sitemap here...
                    }

                    InputList.RemoveAt(0);//remove scraped links from sitemap
                    Url = InputList[0];
                }
            }
        }

        // OLD METHOD, was used inside DF pipeline which was false,,REMOVE WHEN REPLACED
        // Encapsulates scraping logic for each site specific scraper.(Must be async if it encapsulates async code)
        public async Task RunInitMsg(ScrapingBrowser browser, Message msg)
        {
            var success = await ScrapeSitemapLinks(browser);

            if (success)
            {
                //await ScrapeWebshops().ContinueWith(i => Console.WriteLine("Scraping Webshops in Nabava.net DONE"));
            }

            await Task.Yield();
        }

        //NOTE:  NOT USED AT THE MOMENT
        async Task<IEnumerable<ProcessedMessage>> ISiteSpecific.Run(ScrapingBrowser browser, Message message)
        {
            //TODO: make this method get shops/link data and assigns it to message.Webshops ---TEST FLOW ON "RunInitMsg" FIST HAN REPLACE IT WITH THIS METHOD
            throw new NotImplementedException(); // WARNING : SINCE THIS THROWS ERROR ...TRANSFORM MANY BLOCK COMPLETES AND  STOPS GETTING MESSAGES PASSED TO HIM ...
        }
    }
}