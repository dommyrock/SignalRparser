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

        public Task StartConsuming(ITargetBlock<Message> target, CancellationToken token, ISiteSpecific scraper)
        {
            return Task.Factory.StartNew(() => ConsumeWithDiscard(target, token, scraper), TaskCreationOptions.LongRunning);
        }

        //Post messages to the 1st block and propagate them through pipeline.
        private void ConsumeWithDiscard(ITargetBlock<Message> target, CancellationToken token, ISiteSpecific scraper)
        {
            while (!token.IsCancellationRequested)
            {
                var message = new Message();
                //message.SourceHtml = //scraped data
                message.Id = _counter;
                message.SiteUrl = scraper.Url;
                message.ReadingTime = DateTime.Now; //TODO :test out incomming messages and se if timestamp printed in web app is correct

                _counter++;
                Console.WriteLine($"Read message num[{_counter}] from [{scraper.Url}] on thread [{Thread.CurrentThread.ManagedThreadId}]");//TODO: remove this temp logging

                //Post MSG TO 1ST BLOCK IN PIPELINE!! & Report if buffer is full
                var post = target.Post(message);
                if (!post)
                    Console.WriteLine("Buffer full, Could not post!");
            }
        }
    }
}