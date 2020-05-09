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
using System.Net;
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

                //NOTE : Replaced with web client and HtmlAgilityPack.HtmlDocument because of unicode characters encoding
                //WebPage page = await Browser.NavigateToPageAsync(new Uri(this.ITSectionQuery));
                //HtmlNode paginationNode = page.Html.SelectSingleNode("//*[@id='main']/section[1]/ul/li[9]/a");// Version 1
                //var div_nodes = page.Html.CssSelect(".featured-job");// Version 1

                WebClient wc = new WebClient();
                HtmlDocument document = new HtmlDocument();
                document.Load(wc.OpenRead(this.ITSectionQuery), Encoding.UTF8);

                HtmlNode paginationNode = document.DocumentNode.SelectSingleNode("//*[@id='main']/section[1]/ul/li[9]/a");

                var div_nodes = document.DocumentNode.CssSelect(".featured-job");
                await FeaturedJobsDetails(div_nodes);

                NavigatePagesAsync(paginationNode, wc, document, sb);// Version 1

                //Print agregated string from StringBuilder
                Console.WriteLine(sb.ToString());
                sb.Clear();
            }
            catch (Exception e)
            { throw e; }
        }

        #region Helper Methods

        private async Task FeaturedJobsDetails(IEnumerable<HtmlNode> featuredNodes)
        {
            foreach (HtmlNode node in featuredNodes)
            {
                string logo_link = node.CssSelect("a .logo").SelectMany(x => x.Attributes.Where(n => n.Name == "src").Select(v => v.Value)).SingleOrDefault();
                var a_nodes = node.CssSelect(".job-data a");
                foreach (HtmlNode job_post in a_nodes)
                {
                    var span_nodes = job_post.CssSelect("span");
                    foreach (HtmlNode span in span_nodes)
                    {
                        Console.WriteLine($"{span.InnerHtml}\n");
                    }
                    var time_node = job_post.CssSelect("time");
                    Console.WriteLine(time_node.First().InnerText);

                    try
                    {
                        string jobLink = job_post.Attributes.Where(n => n.Name == "href").Select(x => x.Value).First();
                        Console.WriteLine($"{jobLink}\n");

                        WebPage page = await Browser.NavigateToPageAsync(new Uri(jobLink));
                        var jobDetails_markup = page.Html.CssSelect("#job-html").FirstOrDefault();
                        if (jobDetails_markup != null)
                        {
                            string markup = jobDetails_markup.InnerHtml;
                        }

                        //TODO: content can be html ,or just img ... so make some kind of rule to store/cover both casses
                        //Finish this when i have Frontend app -- and see how it looks there
                    }
                    catch (Exception e)
                    {
                        string ss = e.Message;
                        throw e;
                    }
                }
            }
        }

        private void NavigatePagesAsync(HtmlNode paginationNode, WebClient wc, HtmlDocument document, StringBuilder sb)
        {
            for (int i = 1; i <= GetLastPage(paginationNode); i++)
            {
                if (i > 1)
                {
                    //page = await Browser.NavigateToPageAsync(new Uri($"{this.ITSectionQuery}&page={i}"));//old without utf8 encoding
                    document.Load(wc.OpenRead($"{this.ITSectionQuery}&page={i}"), Encoding.UTF8);
                }
                sb.Append($"\n \tPage : [{i}] \n");

                //var searchlist_nodes = page.Html.CssSelect(".searchlist .job-data");//old without utf8 encoding
                var searchlist_nodes = document.DocumentNode.CssSelect(".searchlist .job-data");//old without utf8 encoding
                foreach (HtmlNode node in searchlist_nodes)
                {
                    //filter p nodes, select their children
                    var p_nodes = node.ChildNodes.Where(x => x.Name == "p").Select(x => x.ChildNodes);
                    //print innerText for each P_nodes item , only for 1st take innetHtml, for profile link
                    GetJobDetails(p_nodes, sb);
                }
            }
        }

        /// <summary>
        /// Extracts job details
        /// </summary>
        private void GetJobDetails(IEnumerable<HtmlNodeCollection> nodeCollection, StringBuilder sb)
        {
            sb.Append("------------------------------------------------------------------------------------\n");
            //Get links from <a> elements, get text from others
            foreach (var node in nodeCollection)
            {
                //if element is <a> than select "href" attribute than select its value
                string link = node.Where(x => x.Name == "a").SelectMany(x => x.Attributes.Where(x => x.Name == "href").Select(x => x.Value)).SingleOrDefault();
                if (link != null)
                {
                    sb.Append($"\n{link}\n");
                    var txt = node.Where(x => x.Name == "a").Select(x => x.InnerHtml).FirstOrDefault();
                    sb.Append($"{txt.Trim()}\n");
                }
                else
                {
                    //for other elements get inner html
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

        #endregion Helper Methods

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

//WebClient + HtmlAgility source load:https://stackoverflow.com/questions/3452343/c-sharp-and-htmlagilitypack-encoding-problem