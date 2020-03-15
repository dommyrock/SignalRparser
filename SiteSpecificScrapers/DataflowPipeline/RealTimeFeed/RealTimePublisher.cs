using Microsoft.AspNetCore.SignalR.Client;
using SiteSpecificScrapers.Messages;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SiteSpecificScrapers.DataflowPipeline.RealTimeFeed
{
    public class RealTimePublisher : IRealTimePublisher
    {
        private HubConnection _hubConnection { get; }
        private string[] _args { get; }

        public RealTimePublisher(HubConnection hubConnection, string[] args)
        {
            this._hubConnection = hubConnection;
            this._args = args;
        }

        public void PublishAsync(Message message)
        {
            // send over a network socket
            Console.WriteLine($"Publish in real-time message {message.SourceHtml} on thread {Thread.CurrentThread.ManagedThreadId}");// V1 --test publish to console
        }

        public Task PublishMessageToHub(Message message)
        {
            //Execute signalR hub method & pass the Message
            return Task.FromResult(_hubConnection.SendAsync("PublishSensorData", _args.Length == 0 ? "default_Producer" : _args[0], GenerateStreamData(message)));
        }

        static async IAsyncEnumerable<string> GenerateStreamData(Message msg)//method doesnt access class data so it can be marked static.
        {
            //string initString = "Start:";
            //int counter = 0;
            while (true)
            {
                //counter++;
                yield return msg.ReadingTime.ToString(); //return items as they arrive
                await Task.Delay(100);
            }
        }
    }

    public class MessageArgs : EventArgs
    {
        public Message Msg { get; set; }
        //public HubConnection HubConnection { get; set; } might need to pass hub connection as well ?
    }
}

//1. Dont need async method (SINCE I ONLY NEED TO PUBLISH DATA TO SIGNALR METHOD FORM HERE)
//2. async method -->  await Task.Yield(); do not rely on await Task.Yield(); to keep a UI responsive
//return Task.CompletedTask; also not needed it as stated in ( 1.)

/* yield return -explained
    I tend to use yield-return when I calculate the next item in the list (or even the next group of items).

    Using your Version 2, you must have the complete list before returning. By using yield-return, you really only need to have the next item
    before returning.

    Among other things, this helps spread the computational cost of complex calculations over a larger time-frame. For example,
    if the list is hooked up to a GUI and the user never goes to the last page, you never calculate the final items in the list.

    Another case where yield-return is preferable is if the IEnumerable represents an infinite set. Consider the list of Prime Numbers,
    or an infinite list of random numbers. You can never return the full IEnumerable at once,
    so you use yield-return to return the list incrementally.
*/

//Decode function in StreamProcessing ->
//yield return Decode(reading, sensorConfig, decodeCounter);//next time the itteration is started , we continue from last element we returned(and dont return previous elements again !!)