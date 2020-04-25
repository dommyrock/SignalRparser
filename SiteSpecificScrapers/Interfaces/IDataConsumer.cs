using SiteSpecificScrapers.Messages;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace SiteSpecificScrapers.Interfaces
{
    public interface IDataConsumer
    {
        /// <summary>
        /// Push scraped messages into pipeline [TransformBlock 1st block that gets msg].
        /// </summary>
        /// <param name="target">Target page</param>
        /// <param name="token">Supports cancellation throughout the pipeline</param>
        /// <param name="scraper">Passed specific scraper</param>
        /// <returns></returns>
        Task StartConsuming(ITargetBlock<Message> target, CancellationToken token, ISiteSpecific scraper);
    }
}