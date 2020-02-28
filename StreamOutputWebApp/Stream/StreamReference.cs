using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Channels;

namespace StreamOutputWebApp.Stream
{
    public class StreamReference
    {
        readonly IAsyncEnumerable<string> _source;

        internal ConcurrentDictionary<long, Channel<string>> Clients { get; } =
            new ConcurrentDictionary<long, Channel<string>>();

        internal StreamReference(IAsyncEnumerable<string> source) =>
            _source = source;
    }
}