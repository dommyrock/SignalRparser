using SiteSpecificScrapers.Messages;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.Services
{
    public interface IComposition
    {
        Task<List<Task<Message>>> RunDataflowAsync();

        void RunDataflow();
    }
}