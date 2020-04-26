using ScrapySharp.Network;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Base
{
    public abstract class BaseScraperClass
    {
        //Protected member is accessible within its class and by derived class instances.

        //Dont need constructor since im not init any instance here
        //protected BaseScraperClass(ScrapingBrowser browser)// Base constructor called before derived constructor
        //{
        //    this.Browser = browser;
        //}

        /// <summary>
        /// Derived classes should call this method to fetch .sitemap file if it exists.
        /// [Protected: only derived class can use this method]
        /// </summary>
        protected async Task<string> GetSitemap(ScrapingBrowser browser, string url)
        {
            if (browser != null)
            {
                string sitemapSource = url + "/robots.txt";

                string document = await browser.DownloadStringAsync(new Uri(sitemapSource));

                //NOTE: Global regex (might not be suited for all sites)
                var matchSitemap = Regex.Match(document, @"\b(?:https?://|www\.)\S+\b", RegexOptions.Compiled | RegexOptions.IgnoreCase);

                if (matchSitemap.Success && matchSitemap.Value.Contains("sitemap"))
                {
                    url = matchSitemap.Value;
                    return url;
                }
                else
                {
                    //TODO : also check https://domainname/sitemap.xml....
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
            if (browser == null) return false;

            var sitemapUrl = await GetSitemap(browser, url);

            if (sitemapUrl != string.Empty)
            {
                WebPage document = browser.NavigateToPage(new Uri(url));

                //TODO: Scrape all links from "document"

                return true;//true
            }
            return false;//false
        }
    }
}

#region Abstract class info

/* ABSTRACT CLASS INFO
 * Abstract classes are useful when you need a class for the purpose of inheritance and polymorphism, but it makes no sense to instantiate the class itself,
 * only its subclasses. They are commonly used when you want to define a template for a group of subclasses that share some common implementation code,
 * but you also want to guarantee that the objects of the superclass cannot be created.
 * For instance, let's say you need to create Dog, Cat, Hamster and Fish objects.
 * They possess similar properties like color, size, and number of legs as well as behavior so you create an Animal superclass.
 * However, what color is an Animal? How many legs does an Animal object have? In this case, it doesn't make much sense to instantiate an object of type Animal
 * but rather only its subclasses.
 * Abstract classes also have the added benefit in polymorphism–allowing you to use the (abstract) superclass's type as a method argument or a return type.
 * If for example you had a PetOwner class with a train() method you can define it as taking in an object of type Animal e.g. train(Animal a)
 * as opposed to creating a method for every subtype of Animal.
 * */

#endregion Abstract class info