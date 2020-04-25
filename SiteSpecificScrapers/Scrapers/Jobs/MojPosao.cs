using ScrapySharp.Network;
using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Scrapers.Jobs
{
    public class MojPosao : ISiteSpecific
    {
        //NOTE: NOT worth scraping /sitemap.xml because it has alot of expired jobs/links(all the way to 2010) ...so rather re-scrape site!
        public string Url { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public List<string> InputList { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Dictionary<string, bool> ScrapedKeyValuePairs { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string SitemapUrl { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public ScrapingBrowser Browser { get; set; }

        public MojPosao()
        {
        }

        public Task<IEnumerable<ProcessedMessage>> Run(ScrapingBrowser browser, Message message)
        {
            throw new NotImplementedException();
        }

        public Task RunInitMsg(ScrapingBrowser browser, Message message)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ScrapeSitemapLinks(ScrapingBrowser browser)
        {
            throw new NotImplementedException();
        }

        Task<Tuple<List<string>, Dictionary<string, bool>>> ISiteSpecific.ScrapeWebshops()
        {
            throw new NotImplementedException();
        }
    }
}