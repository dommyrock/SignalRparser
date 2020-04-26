using ScrapySharp.Network;
using SiteSpecificScrapers.DataflowPipeline.RealTimeFeed;
using SiteSpecificScrapers.Interfaces;
using SiteSpecificScrapers.Messages;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace SiteSpecificScrapers.DataflowPipeline
{
    public class DataflowPipelineClass
    {
        //NOTE: TPL DATAFLOW ONLY DEFINES PIPELINE FOR MESSAGE FLOW & TRHOUGHPUT !!! (can extend it with kafka,0mq for load balancing),or Rx for timed pooling, batches
        //Data flow starts from "DataConsumer" class where we ".Post()"  it into pipeline.
        //TPL also uses up alot more resources since it handles async message branching to other blocks in pipeline
        //Example TPL flow :https://stackoverflow.com/questions/32073831/tpl-dataflow-to-be-implemented-for-a-website-scrapers

        readonly ISiteSpecific _specificScraper;
        readonly IRealTimePublisher _realTimeFeedPublisher;
        readonly IDataConsumer _dataConsumer;
        public ScrapingBrowser _browser { get; }

        /// <summary>
        /// Executes specific scraping logic for passed scraper.
        /// (Only role is message propagation)!
        /// </summary>
        /// <param name="browser">Headless browwser instance</param>
        /// <param name="scrapers">passed site scrapers scrapers</param>
        public DataflowPipelineClass(ScrapingBrowser browser,
                                    ISiteSpecific scraper,
                                    IRealTimePublisher realTimePublisher,
                                    IDataConsumer dataConsumer)
        {
            this._browser = browser;
            this._specificScraper = scraper;
            this._realTimeFeedPublisher = realTimePublisher;
            this._dataConsumer = dataConsumer;
        }

        /// <summary>
        /// 1)Init pipeline config , 2)StartConsuming, 3) Post data into pipeline!
        /// </summary>
        public async Task StartPipelineAsync(CancellationToken token)
        {
            //****** IMPORTANT ****** config is not yet optimized !!!! (still in testing faze)

            #region Pipeline config

            // Example -Block config
            var linkOptions = new DataflowLinkOptions { PropagateCompletion = true };

            //var largeBufferOptions = new ExecutionDataflowBlockOptions() { BoundedCapacity = 600000 };
            //var largeBufferOptionsSingleProd = new ExecutionDataflowBlockOptions() { BoundedCapacity = 600000, SingleProducerConstrained = true };
            //unused ATM
            //var smallBufferOptions = new ExecutionDataflowBlockOptions() { BoundedCapacity = 1000 };
            //var realTimeBufferOptions = new ExecutionDataflowBlockOptions() { BoundedCapacity = 6000 };
            //var parallelizedOptions = new ExecutionDataflowBlockOptions() { BoundedCapacity = 6000, MaxDegreeOfParallelism = 4 };//was 1000
            //var batchOptions = new GroupingDataflowBlockOptions() { BoundedCapacity = 1000 };

            //Optimized block config
            var largeBufferOptions = new ExecutionDataflowBlockOptions() { BoundedCapacity = 2 };
            var largeBufferOptionsSingleProd = new ExecutionDataflowBlockOptions() { BoundedCapacity = 2, SingleProducerConstrained = true };//MaxDegreeOfParallelism = DataflowBlockOptions.Unbounded
            //BatchBlock
            //One caveat with this solution is that the resulting array is not sorted: you're not going to know which item came from which source.
            //And I have no idea how does its performance compare with JoinBlock, you'll have to test that by yourself.

            #endregion Pipeline config

            //Block definitions

            //FINAL :1) have single block "TransformBlock" as entry , "markup downloader" (single threaded at first , test out multy... later)
            //       2) TransformMany or Transformblock parse provided markup (multy threaded from start !) if i produce markup to slow in 1st) step make it async 2s
            //       3) Broadcast block into SignalR stream

            //For each message it consumes, it outputs another(with optional clonning filter/alter func ).
            var transformBlock = new TransformBlock<Message, Message>((Message msg) => //SEE"DataBusReader" Class for example !! //This was (async (Message msg) => before
            {
                //TODO msg is passed here from DataConsumer class , so there i need to init scraper , and here fetch site markup
                var testPassedMsgValue = msg;
                //Call some cloning function here if i need to alter/filter incomming messages
                //await _specificScraper.RunInitMsg(this._browser, msg);// TODO: REMOVE this line is wrong , since im not sraping from insde pipeline ...
                return msg;
            }, largeBufferOptionsSingleProd);

            //It is like the TransformBlock but it outputs an IEnumerable<TOutput> for each message it consumes.
            //var scrapeManyBlock = new TransformManyBlock<Message, ProcessedMessage>(async (Message msg) =>
            //   await _specificScraper.Run(_browser, msg), largeBufferOptions);  //TODO :SINCE "RUN" THROWS NOT IMPLEMENTED EX. BLOCK COMPLETES AND STOPS RECEIVEING MSG'S ...

            #region BroadcasterBlock info

            //BroadcastBlock has a buffer of one message that gets overwritten by each incoming message.
            //So if the BroadcastBlock cannot forward a message to downstream blocks then the message is lost when the next message arrives. This is load-shedding.
            //Only the blocks up until the first BroadcastBlock could force producer slowdown or load shedding as the BroadcastBlock simply overwrites its buffer on each new message
            //and so neither it or downstream blocks can apply back-pressure to the producer.
            //The broadcast block will make an attempt to pass the message onto all downstream linked blocks before allowing the message to get overwritten.
            //But if a linked block has a bounded buffer which is full, the message gets discarded - load shedding.
            //So as long as the linked blocks have capacity, then the broadcast block ensures all of them get the message.

            #endregion BroadcasterBlock info

            //Branches out the messages to other consumer blocks linked!
            var broadcast = new BroadcastBlock<Message>(msg => msg);

            //Real time publish to SignalR hub
            //Actionblock (delegate/callback that runs asynchronously when data becomes available)
            var realTimeFeedBlock = new ActionBlock<Message>((Message msg) =>
           _realTimeFeedPublisher.PublishMessageToHub(msg), largeBufferOptions);/*publush to console _realTimeFeedPublisher.PublishAsync(msg)*/

            //Link blocks together
            transformBlock.LinkTo(broadcast, linkOptions);
            broadcast.LinkTo(realTimeFeedBlock, linkOptions);
            //transformBlock.LinkTo(scrapeManyBlock, linkOptions); //Can add 3rd param , ()=>  filter method msg need to pass to propagate from source to target!!
            //scrapeManyBlock.LinkTo(broadcast, linkOptions);
            //broadcast.LinkTo(realTimeFeedBlock, linkOptions);

            //Start consuming data (uncoment block to switch block from which propagation starts)
            var consumerTask = _dataConsumer.StartConsuming(transformBlock,/*scrapeManyBlock,*/ token, _specificScraper);

            //Keep going untill CancellationToken is cancelled or block is in the completed state either due to a fault or the completion of the pipeline.
            while (!token.IsCancellationRequested
               && !realTimeFeedBlock.Completion.IsCompleted)
            {
                await Task.Delay(100);
            }

            //the CancellationToken has been cancelled and our producer has stopped producing
            //Call Complete on the first block, this will propagate down the pipeline
            transformBlock.Complete();
            //scrapeManyBlock.Complete();

            //Wait for all blocks to finish processing their data
            await Task.WhenAll(realTimeFeedBlock.Completion, consumerTask).ContinueWith((i) => System.Console.WriteLine("Task.WhenAll() executed ...all tasks completed"));

            // clean up any other resources like ZeroMQ/kafka for example
        }
    }
}