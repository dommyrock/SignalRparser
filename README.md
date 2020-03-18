# SignalRparser
 Real time parser app in.NET Core 3.1 with SignalR, TPL Dataflow and React.js client app 
 
**Goal was to have modular/interchangeable and domain specific scraping while also having ability to stream processed data to separate web app.**
 
**Startup project** (Web App) --> **StreamOutputWebApp** (has SignalR hubs, methods defined in it.)

**Producer**(Console App) = "SignalRparserApp"

**FLOW**
**!1st start WebApp , 2. Start Producer by opening directory ~/SignalRparserApp, than run console app by typing  'dotnet run +'producerName'(optional) in cmd/shell**

1.Producer app , scrapes sites listed in SignalRparserApp ->Program.cs
(Details of what's being scraped from listed sites is still WIP.)

2.While data is being scraped, output is piped through TPL Dataflow pipeline and messages are than broadcasted with Actionblock to RealTimePublisher class, where we invoke SignalR Hub methods through passed HubConnection instance.

3.Data continues to be propagated through TPL Dataflow pipeline while there are new messages in pipeline.

4.Data/messages starts to be streamed through SignalR connection from our producer console app once "StreamOutputWebApp" is started and handshake between it and Producer app is done.

5.As data arrives to web app, data is logged to console and rendered in real time (initialy made for debugging purposes).

**! transport currently upgraded to websockets if possible (could be switched to Message pack..)**! 
 
 Big help were these projects/videos:
 
 TPL DATAFLOW :https://github.com/Vanlightly/StreamProcessingSeries/tree/master/src/net-apps 
 
 SignalR:  https://github.com/halter73/SignalR30SensorDemo
 and 
 https://www.youtube.com/watch?v=dHiETzo6GB8&list
