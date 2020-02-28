using ScrapySharp.Network;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Base
{
    public abstract class BaseScraperClass
    {
        private ScrapingBrowser Browser { get; set; }

        protected BaseScraperClass()// Base constructor called before derived constructor

        {
        }

        /// <summary>
        /// Derived classes should call this method to fetch .sitemap file if it exists.
        /// [Protected: only derived class can use this method]
        /// </summary>
        protected async Task<string> GetSitemap(ScrapingBrowser browser, string url)
        {
            Browser = browser;
            if (Browser != null)
            {
                string sitemapSource = url + "/robots.txt";

                var document = await browser.DownloadStringAsync(new Uri(sitemapSource));

                //NOTE: Global regex (might not be suited for all sites)
                var matchSitemap = Regex.Match(document, @"\b(?:https?://|www\.)\S+\b", RegexOptions.Compiled | RegexOptions.IgnoreCase);

                if (matchSitemap.Success && matchSitemap.Value.Contains("sitemap"))
                {
                    url = matchSitemap.Value;
                    return url;
                }
                url = string.Empty;
            }
            return url;
        }

        /// <summary>
        /// Default method for sitemap scraping. (Overridable if needed!)
        /// </summary>
        /// <param name="browser">headless browser instance</param>
        /// <param name="url">Current URI</param>
        /// <returns></returns>
        protected virtual async Task<bool> ScrapeSitemapLinks(ScrapingBrowser browser, string url)
        {
            this.Browser = browser;

            var sitemapUrl = await GetSitemap(Browser, url);

            if (sitemapUrl != string.Empty)
            {
                WebPage document = await Browser.NavigateToPageAsync(new Uri(url));//might replace with basic downloadstrignasync...

                //TODO: Scrape all links from "document"

                return true;//true
            }
            return false;//false
        }
    }
}