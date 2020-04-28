using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace SiteSpecificScrapers.DataflowPipeline
{
    public class DataConsumer : IDataConsumer
    {
        private int _counter;

        public DataConsumer()
        {
            //TODO: init scraping class here or implement its scraping method through interface
        }

        /// <summary>
        ///This is the entry point into the TPL dataflow , data is than propagated through TPL blocks in pipeline (1stblock (TransformBlock) in my case)
        /// </summary>
        /// <see cref=""/>
        public Task StartConsuming(ITargetBlock<Message> target, CancellationToken token, ISiteSpecific scraper)
        {
            return Task.Factory.StartNew(async () => await ConsumeWithDiscard(target, token, scraper), TaskCreationOptions.LongRunning);
        }

        private async Task ConsumeWithDiscard(ITargetBlock<Message> target, CancellationToken token, ISiteSpecific scraper)//Maybe make this method async IAsyncEnumerable so can push msgs as they arrive
        {
            if (scraper.Url == "http://nabava.net")
            {
                //TODO :this is FUCKED ..ERROR IS IM NOW AWAITING RESULT IN ASYNC METHOD ,replace with separate method that only Fetches markup
                var scrapedData = await scraper.ScrapeWebshops();
                //TODO: streaming atm streams x100 or to fast anyway for some reasonable data... maybe make timer that sends batches of data every min or so !!!!

                //while (!token.IsCancellationRequested)
                //{
                foreach (string item in scrapedData.Item1) //Right now im just posting same webshops over and over to pipeline
                {
                    //map, than Pass msg to pipeline
                    var message = new Message();
                    //message.SourceHtml = //scraped data
                    message.Id = _counter;
                    message.SiteUrl = item;
                    message.Read = DateTime.Now;

                    _counter++;
                    Console.WriteLine($"Read mdg num[{_counter}] from [{message.SiteUrl}] @ [{message.Read}] on thread [{Thread.CurrentThread.ManagedThreadId}]");// temp logging

                    var post = target.Post(message);
                    if (!post)
                        Console.WriteLine("Buffer full, Could not post!");
                }
                target.Complete();
                //}
            }

            //await foreach (var item in collection)
            //{
            //    //replace while loop with  this one
            //    //pass fetched markup here to forward msgs to pipeline
            //}

            //PREVOUS VERSION ...
            //while (!token.IsCancellationRequested)
            //{
            //    //TODO : in current state , i should init scraping here and post it into pipeline 1by 1 (for that i would need to pass "ITargetBlock<Message> target"  as param to scraper)
            //    //scraper.RunInitMsg(...,...,target)
            //    var message = new Message();
            //    //message.SourceHtml = //scraped data
            //    message.Id = _counter;
            //    message.SiteUrl = scraper.Url;
            //    message.Read = DateTime.Now;

            //    _counter++;
            //    Console.WriteLine($"Read message num[{_counter}] from [{scraper.Url}] on thread [{Thread.CurrentThread.ManagedThreadId}]");// temp logging

            //    var post = target.Post(message);
            //    if (!post)
            //        Console.WriteLine("Buffer full, Could not post!");
            //}
        }
    }
}

//pipeline example https://stackoverflow.com/questions/32073831/tpl-dataflow-to-be-implemented-for-a-website-scraper

//4.5. Parallel Processing with Dataflow Blocks
/// <see cref="https://www.oreilly.com/library/view/concurrency-in-c/9781491906675/ch04.html"/>
/// MSDN https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/dataflow-task-parallel-library
/// injectable broadcast example https://www.ajeetyelandur.com/2016/07/Events-Part-3-with-dataflow/