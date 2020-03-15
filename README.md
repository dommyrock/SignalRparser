# SignalRparser
 Real time parser app in.NET Core 3.1 with SignalR, TPL Dataflow and React.js client app 
 
**Startup project (Web App) --> StreamOutputWebApp (has SignalR hubs, methods defined in it.)**
**Producer (Console App) ---> SignalRparserApp**
***Start producer by opening directory ~/SignalRparserApp, than run app by typing  'dotnet run +'producerName'(optional) in cmd/shell
**1st start WebApp , 2. than start producer -console app**
1.producer app , scrapes sites listed in SignalRparserApp ->Program.cs (Details of what's being scraped from listed sites is still WIP.)
2. while data is being scraped, output is piped through TPL Dataflow pipeline and messages are than broadcasted with Actionblock to RealTimePublisher class, where we invoke SignalR Hub methods through passed HubConnection instance.
3.Data continues to be propagated through TPL Dataflow pipeline while there are new messages in pipeline.
4.Data/messages starts to be streamed through SignalR connection from our producer console app once "StreamOutputWebApp" is started and handshake between it and producer is done.
5.As data arrives to web app through SignalR client hub , data is logged to console and appened to single div as it arrives(temp. solution while testing.)

**! transport currently upgraded to websockets if possible (could be switched to Message pack..)**! 
 
 
 
