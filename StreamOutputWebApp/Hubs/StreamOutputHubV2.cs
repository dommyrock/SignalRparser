using Microsoft.AspNetCore.SignalR;
using StreamOutputWebApp.Stream;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StreamOutputWebApp.Hubs
{
    public class StreamOutputHubV2 : Hub
    {
        private readonly StreamCollection _sensorCollection;

        public StreamOutputHubV2(StreamCollection sensorCollection)
        {
            _sensorCollection = sensorCollection;
        }

        public IEnumerable<string> GetSensorNames()
        {
            return _sensorCollection.GetSensorNames();
        }

        public IAsyncEnumerable<string> GetSensorData(string sensorName, CancellationToken cancellationToken)
        {
            return _sensorCollection.GetSensorData(sensorName, cancellationToken);
        }

        public async Task PublishSensorData(string sensorName, IAsyncEnumerable<string> msgData)
        {
            try
            {
                await foreach (var measurement in msgData)
                {
                    _sensorCollection.PublishSensorData(sensorName, measurement);
                }
            }
            finally
            {
                _sensorCollection.DisconnectSensor(sensorName);
            }
        }

        //Test -fowler's example
        public async Task Pump(IAsyncEnumerable<string> incoming)
        {
            await foreach (var item in incoming)
            {
                await Clients.Others.SendAsync("Item", item);
            }
        }
    }
}