import React, { useState, useEffect } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@aspnet/signalr";
//import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack'; add npm if i want to switch protocols

//https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
//https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e#.re1pdcz87
//See for localized css !!

const SignalRStream = () => {
  //   const [hubConnection, setHubConnection] = useState();

  useEffect(() => {
    //Set initial hub connection
    const createHubConnection = async () => {
      //Config
      const connection = new HubConnectionBuilder()
        .withUrl("/outputstream") //server- hub endpoint
        .configureLogging(LogLevel.Debug)
        .build();
      //   .withHubProtocol(new MessagePackHubProtocol()) adds new binary protocol

      ////reconnect  -
      //connection.onreconnected(async function () {
      //    const connectedClients = await connection.invoke("ListStreams");
      //    connectedClients.forEach(subscribeToStream);
      //});

      try {
        //start conn
        await connection.start();
        //const connectedClients = await connection.invoke("ListStreams"); //V1
        const sensorNames = await connection.invoke("GetSensorNames");
        sensorNames.forEach(subscribeToSensor);
        connection.on("SensorAdded", subscribeToSensor); // we only have single "sensor" data source ...so i dont need this

        // HubConnectionState.Connected;
      } catch (error) {
        alert(error);
      }
      function subscribeToSensor(sensorName) {
        connection.stream("GetSensorData", sensorName).subscribe({
          next: item => {
            var li = document.createElement("li");
            li.textContent = item;
            document.getElementById("messagesList").appendChild(li);
          },
          complete: () => {
            var li = document.createElement("li");
            li.textContent = "Stream completed";
            document.getElementById("messagesList").appendChild(li);
          },
          error: err => {
            var li = document.createElement("li");
            li.textContent = err;
            document.getElementById("messagesList").appendChild(li);
          }
        });
      }
      //const connectedClients = await connection.invoke("ListStreams");
      //console.log(connectedClients);
      //subscribe - foreach client
      //connectedClients.forEach(subscribeToStream);
      //connectedClients.on("SenStreamCreated", subscribeToStream);

      //function subscribeToStream(streamName) {
      //    console.log("Connected to hub!");
      //    connection.stream("WatchStream")
      //     .subscribe({
      //         next: (item) => {
      //             latestSensorData[sensorName] = item;
      //         },
      //         complete: () => {
      //             console.log(`${sensorName} Completed`);
      //         },
      //         error: (err) => {
      //             console.log(`${sensorName} error: "${err}"`);
      //         },
      //}

      //not logging anything ATM
      //connection.on("StreamCreated", stream => {
      //    console.log("Stream created");
      //    console.log(stream);
      //});

      //connection.on("StreamRemoved", stream => {
      //    console.log("Stream removed...reason (20 sec without server msg)");
      //    console.log(stream);
      //});

      //NOTE : Stream will disconnect after 20 sec if it doesnt get msg from server
      /* Retry logic ...something like this
             * $.connection.hub.disconnected(function() {
           setTimeout(function() {
               $.connection.hub.start();
           }, 5000); // Restart connection after 5 seconds.
             *
             */
    };
    createHubConnection();
  }, []);
  // [] -->specifies that we will be calling this effect only when the component first mounts.
  return (
    <>
      <div className="inc-exp-container">
        <h1>SignalR Stream component-placeholder</h1>
        <div id="messagesList"></div>
      </div>
    </>
  );
};

export default SignalRStream;
