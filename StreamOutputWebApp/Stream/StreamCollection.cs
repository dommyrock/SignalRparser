using Microsoft.AspNetCore.SignalR;
using StreamOutputWebApp.Hubs;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Channels;

namespace StreamOutputWebApp.Stream
{
    public class StreamCollection
    {
        private readonly ConcurrentDictionary<string, ConcurrentQueue<Channel<string>>> _sensors = new ConcurrentDictionary<string, ConcurrentQueue<Channel<string>>>();
        private readonly IHubContext<StreamOutputHubV2> _sensorHubContext;

        public StreamCollection(IHubContext<StreamOutputHubV2> sensorHubContext)
        {
            _sensorHubContext = sensorHubContext;
        }

        public IEnumerable<string> GetSensorNames()
        {
            return _sensors.Keys;
        }

        public void PublishSensorData(string sensorName, string msg)
        {
            var subscriberQueue = _sensors.GetOrAdd(sensorName, _ =>
            {
                // This could be called multiple times for the same sensor, but the client will dedupe.
                _sensorHubContext.Clients.All.SendAsync("SensorAdded", sensorName);

                return new ConcurrentQueue<Channel<string>>();
            });

            foreach (var subscriber in subscriberQueue)
            {
                Trace.Assert(subscriber.Writer.TryWrite(msg));
            }
        }

        public void DisconnectSensor(string sensorName)
        {
            if (!_sensors.TryRemove(sensorName, out var subscriberQueue))
            {
                return;
            }

            foreach (var subscriber in subscriberQueue)
            {
                subscriber.Writer.Complete();
            }
        }

        public IAsyncEnumerable<string> GetSensorData(string sensorName, CancellationToken cancellationToken = default)
        {
            var subscriberQueue = _sensors.GetOrAdd(sensorName, _ => new ConcurrentQueue<Channel<string>>());

            var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(10)
            {
                FullMode = BoundedChannelFullMode.DropOldest
            });

            subscriberQueue.Enqueue(channel);

            return channel.Reader.ReadAllAsync(cancellationToken);
        }
    }
}