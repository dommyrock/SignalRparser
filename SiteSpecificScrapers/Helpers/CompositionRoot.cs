﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using ScrapySharp.Network;
using SiteSpecificScrapers.DataflowPipeline;
using SiteSpecificScrapers.DataflowPipeline.RealTimeFeed;
using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using SiteSpecificScrapers.Services;

namespace SiteSpecificScrapers.Helpers
{
    public class CompositionRoot : IComposition
    {
        /* NOTES:
         * 1.2. respect politeness policy --delay requests to single domain ..., and NEVER make async requests to same domain (only async other site scrapers)
         * 1.3. make QUEUES SPECIFIC to  sites --ONE QUEUE per site !!
         * 1.4 run scraper and await task completion...than run next one
         */

        #region Properties,fields

        private HubConnection _hubConnection { get; }

        // readonly -> indicates that assignment to the field can only occur as part of the declaration or in a constructor in the same class
        private readonly ISiteSpecific[] _specificScrapers;

        private ScrapingBrowser _browser { get; }
        public int PipeIndex { get; private set; } = 0;

        //Passed from producers started in cli/cmd -->dotnet run "producerId"(name)
        private string[] _args { get; }

        #endregion Properties,fields

        #region Constructors

        //FLOW : CompositionRoot --->RunAll() -->InitSinglePipeline() -->StartPipelineAsync()--->DataflowPipelineClass -->DataConsumer -->StartConsuming()-->pass msgs 1st TPL block & propagate down the pipe
        public CompositionRoot(ScrapingBrowser browser, HubConnection hubConnection, string[] args, params ISiteSpecific[] scrapers)
        {
            this._specificScrapers = scrapers;
            this._browser = browser;
            this._hubConnection = hubConnection;
            this._args = args;
        }

        //Start scrapers without TPL DF And SignalR
        public CompositionRoot(ScrapingBrowser browser, params ISiteSpecific[] scrapers)
        {
            this._specificScrapers = scrapers;
            this._browser = browser;
        }

        #endregion Constructors

        public void RunListedScrapers()
        {
            foreach (ISiteSpecific scraper in _specificScrapers)
            {
                //pass browser instance to scraper
                scraper.Browser = _browser;

                Console.WriteLine($"Scraper [{scraper.Url}] started:");
                try
                {
                    Task.Run(async () => await scraper.ScrapeSiteData())
                            .ContinueWith((i) => Console.WriteLine($"All scrapers completed. [EXITING] {scraper.Url} Scraper now."));
                    //NOTE: Left InitPipeline async ...so i can reuse it for RunAllAsync
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        protected async Task InitSingleTDataflowPipeline(ISiteSpecific scraper)
        {
            //TODO:  await completion , than start next scraper (in future if i have more threads ...can make few pipes run in parallel as well)
            //TODO: throw this class init and cts , one leayer out ..into "RunAll" method when i'll have more scrapers running
            //-->>>later make method where we continously scrape on same pipeline aka dont init DataflowPipelineClass() here

            var cts = new CancellationTokenSource();
            // init new TPL pipeline for each new scraper , and all other requred classes in pipeline

            var pipeline = new DataflowPipelineClass(_browser, scraper, new RealTimePublisher(_hubConnection, _args), new DataConsumer());

            try
            {
                await Task.Run(async () => //TODO:might need to be moved inside try to catch  ex
                {
                    try
                    {
                        await pipeline.StartPipelineAsync(cts.Token);
                    }
                    catch (AggregateException ae)
                    {
                        //NOTE :each exception in TPL DF will wrap it in its own layer of AggregateException
                        //ae.Flatten(); to pull out nested exception under aggregate exceptions thrown form tpl pipeline

                        Console.WriteLine($"Pipeline {PipeIndex} terminated due to error {ae}");
                    }
                    Console.WriteLine($"Pipe -->[{++PipeIndex}] done processing Messages!");
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                //throw ex;
            }

            #region TPL Channels option

            //2 .or use TPLChannels instead ... (in my case 3rd option is better!)
            //var channel = new TPLChannelsClass();
            //channel.EnqueueAsync("llalall");

            //3. or directly output to signalR since it uses channels too
            // with RealTimePublisher -->PublishMessageToHub()
            //_realTimeFeedPublisher.PublishMessageToHub();

            #endregion TPL Channels option
        }

        /// <summary>
        /// Runs SINGLE synchronous pipe & await completion , than run next.
        /// </summary>
        /// <returns></returns>
        public void RunDataflow()
        {
            foreach (ISiteSpecific scraper in _specificScrapers)
            {
                //pass browser instance to scraper
                scraper.Browser = _browser;

                Console.WriteLine($"Scraper [{scraper.Url}] started:");
                try
                {
                    Task task = Task.Run(async () => await InitSingleTDataflowPipeline(scraper))
                        .ContinueWith((i) => Console.WriteLine($"All scrapers completed. [EXITING] {scraper.Url} Scraper now."));
                    //NOTE: Left InitPipeline async ...so i can reuse it for RunAllAsync
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        /// <summary>
        /// Runs multiple pipeline's in parallel(not supported yet since i dont have that many threads for this to be efficient.)
        /// </summary>
        /// <returns></returns>
        public async Task<List<Task<Message>>> RunDataflowAsync()
        {
            //List of completed tasks
            List<Task<Message>> tasklist = new List<Task<Message>>();
            //Run each scraper in parellel
            foreach (ISiteSpecific scraper in _specificScrapers)
            {
                try
                {
                    await InitSingleTDataflowPipeline(scraper); //I ONLY WANT 1 PIPE FOR NOW (RUN MSG PASSING INSIDE PIPE ASYNC INSTEAD + MAKE ANOTHER SYNC VESION OF "RunAll" since i dont async run pipes atm)

                    //Await completion , than go to next Task
                    //var completedTask = await scraper.Run(browser);
                    ////Run each scraper async
                    //tasklist.Add(scraper.Run(Browser)); //TODO:  call awaitAll() just for testing 2,3 sites , else catch and store/print results as they arive .
                    //await Task.Run(async () => await scraper.Run(Browser));
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
            //return await Task.WhenAll<Task>(tasklist); not efficient to wait on all to complete , instead await and print/outptut each result as they arrive
            //
            return await Task.FromResult(tasklist);
        }

        //*** Task.WhenAll -->asynchronously awaits the result.
        //*** Task.WaitAll blocks the calling thread until all tasks are completed

        /// ildasm ...> <see cref="https://www.youtube.com/watch?v=eZFtSwh0k4E&list=PLRwVmtr-pp05brRDYXh-OTAIi-9kYcw3r&index=20&frags=wn"/>

        /*NEXT STEP
         * Because Task and Task<TResult> are reference types, memory allocation in performance-critical paths,
         * particularly when allocations occur in tight loops, can adversely affect performance.
         * Support for generalized return types means that you can return a lightweight value type instead of a reference type to avoid additional memory allocations.
         /// <see cref="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/async-return-types" Generalized async return types -at the bottom of page />
         /// ValueTask--->> <see   https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1?view=netcore-3.1
         ///for less memory alocation (non reference & return types <see cref="https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.valuetask-1?view=netcore-3.0"/>
         */

        /// <remarks The Task.Result property is a blocking property. ></remarks>
        /// In most cases, you should access the value by using await instead of accessing the property directly.
        /// exceptions <see cref="https://markheath.net/post/async-antipatterns"/>
        ///
        /// Task.Run(()=> func) arhitecutre <see cref="https://stackoverflow.com/questions/25720977/return-list-from-async-await-method"/>
        ///
        /// multyple web requests async <see cref="https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/how-to-make-multiple-web-requests-in-parallel-by-using-async-and-await"/>

        ///  yields back to the current context <see cref="https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.yield?view=netframework-4.8"/>
        ///

        ///For ERROR metadata file <see cref="https://stackoverflow.com/questions/1421862/metadata-file-dll-could-not-be-found"/>
        ///
        //Parallel.Foreach & For are blocking (like built in await all)... they block code execution untill loop is done iterating !!!

        //OR Task.FromResult<TResult> https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.fromresult?view=netcore-3.1
        //The method is commonly used when the return value of a task is immediately known without executing a longer code path.

        //EXAMPLES

        //Return value from async method
        /*
         * public async Task<bool> doAsyncOperation()
        {
            // do work
            return true;
        }

        bool result = await doAsyncOperation();

        */

        //REFLECTION (get all classes implementing Iinterface https://stackoverflow.com/questions/26733/getting-all-types-that-implement-an-interface)

        #region LoopAsyncExample

        /*
         * //Async method to be awaited
         *
        public static Task<string> DoAsyncResult(string item)
        {
        Task.Delay(1000);
        return Task.FromResult(item);
        }

        //Method to iterate over collection and await DoAsyncResult

        public static async Task<IEnumerable<string>> LoopAsyncResult(IEnumerable<string> thingsToLoop)
        {
            List<Task<string>> listOfTasks = new List<Task<string>>();

            foreach (var thing in thingsToLoop)
            {
               listOfTasks.Add(DoAsyncResult(thing));
            }

        return await Task.WhenAll<string>(listOfTasks);
        */

        #endregion LoopAsyncExample
    }
}