using ScrapySharp.Network;
using SiteSpecificScrapers.Messages;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Interfaces
{
    // All derived classes from "BaseScraperClass" should implement this Interface & non unique methods moved to BaseScraperClass
    public interface ISiteSpecific/*<T> where T : class, new() --> something like this if i want to force implementing class to have constructor*/
    {
        string Url { get; set; }
        List<string> InputList { get; set; }
        string SitemapUrl { get; set; }
        ScrapingBrowser Browser { get; set; }
        //Dictionary<string, bool> ScrapedKeyValuePairs { get; set; }//refactor this in hashset ? or some other key -value pair (maybe concurrent ?)

        Task<bool> ScrapeSitemapLinks(ScrapingBrowser browser);

        /// <summary>
        /// Encapsulates scraping logic for each site specific scraper. (Must be async if it encapsulates async code)
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<ProcessedMessage>> Run(ScrapingBrowser browser, Message message);

        Task RunInitMsg(ScrapingBrowser browser, Message message);
    }
}