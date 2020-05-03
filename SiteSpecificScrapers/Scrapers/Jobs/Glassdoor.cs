using HtmlAgilityPack;
using ScrapySharp.Extensions;
using ScrapySharp.Network;
using SiteSpecificScrapers.Base;
using SiteSpecificScrapers.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Scrapers.Jobs
{
    public class Glassdoor : BaseScraperClass, ISiteSpecific
    {
        public string Url { get; set; }
        public List<string> InputList { get; set; }
        public ScrapingBrowser Browser { get; set; }
        public Dictionary<string, bool> ScrapedKeyValuePairs { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public ConcurrentDictionary<string, List<string>> ScrapedArticlesInSites { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string ZgLocationQuery { get; private set; } = "https://www.glassdoor.com/Job/zagreb-jobs-SRCH_IL.0,6_IC2874294.htm";
        public string TotalJobsFound { get; set; }

        //NOTE: for now im only parsing jobs filtered by location relevant to me
        public Glassdoor()
        {
            this.Url = "https://www.glassdoor.com";
            this.InputList = new List<string>();
        }

        public async Task ScrapeSiteData()
        {
            try
            {
                //Temp output for data structure testing
                StringBuilder sb = new StringBuilder();

                WebPage page = await Browser.NavigateToPageAsync(new Uri(this.ZgLocationQuery));

                HtmlNode paginationNode = page.Html.SelectSingleNode("//*[@id='ResultsFooter']/div[1]");

                GetTotalJobsPosted(page);

                await NavigatePagesAsync(paginationNode, page, sb); //TODO : remove string builder when done testing

                //Print agregated string from StringBuilder
                Console.WriteLine(sb.ToString());
                sb.Clear();
            }
            catch (Exception e)
            {
                //TODO :log exceptions and continue executing rest of scrapers (print exceptions somwhere so i know wich scrapers had errors)
                throw e;
            }
        }

        #region Helper methods

        /// <summary>
        /// Navigates all required pages and their nodes to get data.
        /// </summary>
        private async Task NavigatePagesAsync(HtmlNode paginationNode, WebPage page, StringBuilder sb)
        {
            for (int i = 1; i <= GetLastPage(paginationNode); i++)
            {
                if (i > 1)
                {
                    page = await Browser.NavigateToPageAsync(new Uri($"{this.ZgLocationQuery}&_IP{i}.htm"));
                }
                sb.Append($"\n \tPage : [{i}] \n----------------------------------------------------");

                //get all a nodes , than get its attributes
                var a_nodes = page.Html.SelectNodes("//*[@id='MainCol']/div/ul/li/div[2]/a");
                foreach (HtmlNode a in a_nodes)
                {
                    string relativePath = a.Attributes.Select(x => x.Value).First();
                    //full path to job post details
                    sb.Append($"\n{this.Url}{relativePath}");
                    await GetJobDetails($"{this.Url}{relativePath}");
                    InputList.Add($"{this.Url}{relativePath}");
                    //Company name
                    sb.Append($"\nCompany: {a.PreviousSibling.InnerText}");
                    //Role
                    sb.Append($"\nRole: {a.InnerText}\n");
                }
            }
        }

        /// <summary>
        /// Gets job details
        /// </summary>
        private async Task GetJobDetails(string url)
        {
            WebPage page = await Browser.NavigateToPageAsync(new Uri($"{url}"));
            //get text part
            var nodes = page.Html.CssSelect("#JobDescriptionContainer");
            string details = page.Html.SelectNodes("//*[@id='JobDesc3477979814']/div").Single().InnerHtml;//use innertext if i need only txt
        }

        /// <summary>
        /// Gets total jobs posted for current filter.
        /// </summary>
        private void GetTotalJobsPosted(WebPage page)
        {
            string jobCount = page.Html.CssSelect("#MainColSummary").SelectMany(x => x.ChildNodes.Where(x => x.Name == "p")).First().InnerHtml;
            this.TotalJobsFound = jobCount.Substring(0, jobCount.IndexOf('&'));
        }

        /// <summary>
        /// Gets total pages num (from pagiantion selector)
        /// </summary>
        private int GetLastPage(HtmlNode node)
        {
            int position_last = node.InnerHtml.Replace(" ", "").Length - 1;
            int lastPage = int.Parse(node.InnerHtml.Replace(" ", "").Substring(position_last));
            return lastPage;
        }

        #endregion Helper methods

        public Task<bool> ScrapeSitemapLinks()
        {
            throw new NotImplementedException();
        }

        public Task<Tuple<List<string>, Dictionary<string, bool>>> ScrapeWebshops()
        {
            throw new NotImplementedException();
        }
    }
}

//remove trailing chars after specific char
//https://stackoverflow.com/questions/2660723/remove-characters-after-specific-character-in-string-then-remove-substring