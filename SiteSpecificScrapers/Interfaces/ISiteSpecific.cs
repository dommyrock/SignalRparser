using ScrapySharp.Network;
using SiteSpecificScrapers.Messages;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Interfaces
{
    // All derived classes from "BaseScraperClass" should implement this Interface & non unique methods moved to BaseScraperClass
    public interface ISiteSpecific/*<T> where T : class, new() --> something like this if i want to force implementing class to have constructor*/
    {
        string Url { get; set; }
        List<string> InputList { get; set; }
        ScrapingBrowser Browser { get; set; }

        //Each site should have list of scraped articles ,(i wil be parsing/adding them async , thats why this needs to be thread safe)
        ConcurrentDictionary<string, List<string>> ScrapedArticlesInSites { get; set; }

        /// <summary>
        /// This was temp method for structuring data while  testing scraper output.
        /// </summary>
        Task<Tuple<List<string>, Dictionary<string, bool>>> ScrapeWebshops();

        Task<bool> ScrapeSitemapLinks();

        /// <summary>
        /// Encapsulates scraping logic for each site specific scraper.
        /// </summary>
        /// <returns></returns>
        Task ScrapeSiteData();
    }
}