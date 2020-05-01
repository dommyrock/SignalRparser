using HtmlAgilityPack;
using ScrapySharp.Extensions;
using ScrapySharp.Network;
using SiteSpecificScrapers.Base;
using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace SiteSpecificScrapers.Scrapers.Jobs
{
    public class MojPosao : BaseScraperClass, ISiteSpecific
    {
        //NOTE: NOT worth scraping /sitemap.xml because it has alot of expired jobs/links(all the way to 2010) ...so rather re-scrape site!

        //css selectors https://www.w3schools.com/cssref/css_selectors.asp

        public string Url { get; set; }
        public List<string> InputList { get; set; }
        public ScrapingBrowser Browser { get; set; }
        public Dictionary<string, bool> ScrapedKeyValuePairs { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public ConcurrentDictionary<string, List<string>> ScrapedArticlesInSites { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string ITSectionQuery { get; private set; } = "https://www.moj-posao.net/Pretraga-Poslova/?searchWord=&keyword=&job_title=&job_title_id=&area=&category=11";

        public MojPosao()
        {
            this.Url = "https://www.moj-posao.net";
        }

        //TODO :maybe format this to JSON file for now , or just store it in DB
        //All data = featuredJobs_Node,searchlist_first + all PrintDisplayData() data
        public async Task ScrapeSiteData()
        {
            try
            {
                //Temp output for data structure testing
                StringBuilder sb = new StringBuilder();

                WebPage page = await Browser.NavigateToPageAsync(new Uri(this.ITSectionQuery));

                HtmlNode paginationNode = page.Html.SelectNodes("//*[@id='main']/section[1]/ul/li[9]/a").First();

                //get all nodes under class="featured-job" [first page only [1]]
                var featuredJobs_Node = page.Html.CssSelect(".featured-job");
                //select all children nodes of <section class="searchlist" with class="job-data"
                var searchlist_first = page.Html.CssSelect(".searchlist .job-data");

                //skip 1st page, navigate all other pages
                int lastPage = GetLastPage(paginationNode);
                for (int i = 2; i <= lastPage; i++)
                {
                    page = await Browser.NavigateToPageAsync(new Uri($"{this.ITSectionQuery}&page={i}"));
                    var searchlist_others = page.Html.CssSelect(".searchlist .job-data");

                    sb.Append($"\n \tPage : [{i}] \n");
                    //Extract display data & employer profile linq
                    foreach (HtmlNode node in searchlist_others)
                    {
                        //filter p nodes, select their children
                        var p_nodes = node.ChildNodes.Where(x => x.Name == "p").Select(x => x.ChildNodes);
                        //TOOD print innerText for each P_nodes item , only for 1st take innetHtml, for profile link
                        PrintDisplayData(p_nodes, sb);
                    }
                }
                //Print agregated string from StringBuilder
                Console.WriteLine(sb.ToString());
                sb.Clear();
            }
            catch (Exception e)
            { throw e; }
        }

        private void PrintDisplayData(IEnumerable<HtmlNodeCollection> nodeCollection, StringBuilder sb)
        {
            //todo  from 1st,2nd get <a> and froma tributes get links

            sb.Append("------------------------------------------------------------------------------------");
            foreach (var node in nodeCollection)
            {
                //select <a> than select "href" attribute than select its value
                string link = node.Where(x => x.Name == "a").SelectMany(x => x.Attributes.Where(x => x.Name == "href").Select(x => x.Value)).SingleOrDefault();
                if (link != null)
                {
                    sb.Append($"\n{link}\n");
                    var txt = node.Where(x => x.Name == "a").Select(x => x.InnerHtml).FirstOrDefault();
                    sb.Append($"{txt.Trim()}\n");
                }
                else
                {
                    //, from others get iner html
                    foreach (var item in node)
                    {
                        var innherHtml = item.InnerHtml;

                        sb.Append($"{innherHtml}\n");
                    }
                }
            }
        }

        private int GetLastPage(HtmlNode node)
        {
            //fetch last page url & convert it to Uri so we can get query params
            string lastPageUrl = node.Attributes.Select(x => x.Value).FirstOrDefault();
            Uri lastPageUri = new Uri(lastPageUrl);
            //Get query pramas from Uri https://stackoverflow.com/questions/659887/get-url-parameters-from-a-string-in-net
            int param = int.Parse(HttpUtility.ParseQueryString(lastPageUri.Query).Get("page"));

            return param;
        }

        //MojPosao sitemap has alot expired jobs ranging from 2005. year , so it makes no sence to use this method ATM
        public async Task<bool> ScrapeSitemapLinks()
        {
            //Call common sitemapFetch method from Base class
            string sitemapUrl = await base.GetSitemap(Browser, Url);
            if (sitemapUrl == string.Empty)
            {
                //try fetching url/sitemap.xml instead
                WebPage document = await Browser.NavigateToPageAsync(new Uri($"{this.Url}/sitemap.xml"));
                if (document is null) return false;
                var nodes = document.Html.CssSelect("loc").Select(i => i.InnerText).ToList();
                InputList.AddRange(nodes);
            }
            return true;
        }

        Task<Tuple<List<string>, Dictionary<string, bool>>> ISiteSpecific.ScrapeWebshops()
        {
            throw new NotImplementedException();
        }
    }
}