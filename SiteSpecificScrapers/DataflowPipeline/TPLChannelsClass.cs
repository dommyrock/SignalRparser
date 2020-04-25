using System;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.DataflowPipeline
{
    //other classes Cant inherit from this class
    public sealed class TPLChannelsClass
    {
        //TPL Channels :Producer Consumer collection ->Channels focuses on data handoff between 2 parties in same process. (handles async message passing )
        // TPL Channels (used in SignalR) https://devblogs.microsoft.com/dotnet/an-introduction-to-system-threading-channels/ , https://www.youtube.com/watch?v=gT06qvQLtJ0
        //pipeline arhitecture info https://www.oreilly.com/library/view/concurrency-in-c/9781491906675/ch04.html
        //Could be used as part of Pub Sub arhitecture

        private ChannelWriter<string> _writer;

        //EXAMPLES

        //Writer methods
        //writer .TryWrite -synchrinous (completes and returns treu or false othervise)
        // writeasync --wait untill data is excepted by channel ,

        //waitTowriteasync  proceede when space is awailable ,
        //public TPLChannelsClass()
        //{
        //    var channel = Channel.CreateBounded<string>(10);
        //    _ = Task.Run(async delegate
        //     {
        //         while (await channel.Writer.WaitToWriteAsync())
        //         {
        //             if (channel.Writer.TryWrite())
        //             {
        //             }
        //         }
        //     });
        //}

        //TODO :i  would have 1 chanell for each scraper, so i would have 1 producer , and possibly more consumers ...(test it out , and if i need back pressure i can use Channel.CreateBounded (to slow down producer)
        public TPLChannelsClass()
        {
            var channel = Channel.CreateUnbounded<string>(new UnboundedChannelOptions { SingleWriter = true });
            var reader = channel.Reader;
            _writer = channel.Writer;

            Task.Factory.StartNew(async () =>
            {
                // Wait while channel is not empty and still not completed
                while (await reader.WaitToReadAsync())
                {
                    var job = await reader.ReadAsync();
                    Console.WriteLine(job);
                }
            }, TaskCreationOptions.LongRunning);
        }

        public async Task EnqueueAsync(string job)
        {
            await _writer.WriteAsync(job);
        }

        public void Stop()
        {
            _writer.Complete();
        }

        //Handle on Multiple Threads
        public TPLChannelsClass(int threads)
        {
            var channel = Channel.CreateUnbounded<string>();
            var reader = channel.Reader;
            _writer = channel.Writer;
            for (int i = 0; i < threads; i++)
            {
                var threadId = i;
                Task.Factory.StartNew(async () =>
                {
                    // Wait while channel is not empty and still not completed
                    while (await reader.WaitToReadAsync())
                    {
                        var job = await reader.ReadAsync();
                        Console.WriteLine(job);
                    }
                }, TaskCreationOptions.LongRunning);
            }
        }

        public void Enqueue(string job)
        {
            _writer.WriteAsync(job).GetAwaiter().GetResult();
        }

        public async void TestReadAllAsyncMetod()
        {
            var c = Channel.CreateBounded<int>(10);// if i know the number of profucers i  will have i can use new UnboundedChannelOptions{SingleReader=true,SingleWriter=true,AllowSynchronousContinuations=false

            _ = Task.Run(async delegate
            {
                for (int i = 0; i < 10; i++)
                {
                    await Task.Delay(100);
                    await c.Writer.WriteAsync(i);
                }
                c.Writer.Complete();
            });

            await foreach (var item in c.Reader.ReadAllAsync())
            {
                Console.WriteLine(item);
            }
            //or
            //while (await c.Reader.WaitToReadAsync())
            //{
            //    Console.WriteLine(await c.Reader.ReadAsync());
            //}
            Console.WriteLine("done");
            //youc can have any number of producers or consumers
        }
    }
}

/* Channels info
 * Channel.CreateUnbounded<>() has no limit of items you can put in
    .ReaderWaitAsync() wait's untill there is something awailble
    channel.Writer.WriteAsync() waits untill there is space available just like ReaderWaitAsync()
    .. in case of bounded channel -- will wait untill there is space available
    .. in case of unbounded channe -- this will complete synchronously

    channels implement ValueTask and avoid memory alocation when implemented synchronously and also async

    --Back presure is when we have high output producer and we cant keep up consumption , so we need to slow producer down.

    we can use new syntax in .NET core 3.0+ await foreach(int i c.Reader.ReadAllAsync()) to read items as they become awailable.

    c.Writer.Complete() tells the channel , no more data is gonna arrive , tell listers to complete. completion is propagated and
    writer exits the loop

    Pipelines: is all about IO , and operates with byte arrays, focused on reading data from network ,processing it , and heanding it to next stage in pipeline.
    */