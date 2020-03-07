import React, { useState, useEffect } from "react";
//import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@aspnet/signalr"; dont need this npm
const signalR = require("@microsoft/signalr");
//import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack'; add npm if i want to switch protocols

//See for localized css !!
//https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
//https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e#.re1pdcz87

const SignalRStream = () => {
  //   const [hubConnection, setHubConnection] = useState();

  useEffect(() => {
    //Set initial hub connection
    const createHubConnection = async () => {
      //Config
      const connection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect() // add if you want auto reconnect clients to server
        .withUrl("/outputstream") //server- hub endpoint
        .configureLogging(signalR.LogLevel.Debug)
        .build();
      //   .withHubProtocol(new MessagePackHubProtocol()) adds new binary protocol

      ////reconnect  -
      connection.onreconnected(async function() {
        //const connectedClients = await connection.invoke("ListStreams");
        const connectedClients = await connection.invoke("GetSensorNames");
        //connectedClients.forEach(subscribeToStream);
        connectedClients.forEach(subscribeToSensor);
      });

      try {
        //start conn
        await connection.start();
        //const connectedClients = await connection.invoke("ListStreams"); //V1
        const sensorNames = await connection.invoke("GetSensorNames").catch(err => console.error(err.toString()));
        sensorNames.forEach(subscribeToSensor);
        connection.on("SensorAdded", subscribeToSensor); // we only have single "sensor" data source ...so i dont need this
      } catch (error) {
        alert(error);
      }
      function subscribeToSensor(sensorName) {
        console.log(`Client: ${sensorName} Subscribed! -->Starting to read data produced by ${sensorName}`);

        connection.stream("GetSensorData", sensorName).subscribe({
          next: item => {
            console.log(item);

            var btn = document.createElement("button");
            btn.className = "buttonBlue";
            btn.textContent = item;
            document.getElementById("messagesList").appendChild(btn);
            //Scroll to bottom of  element -id =messagesList
            window.scrollTo(0, document.getElementById("messagesList").scrollHeight);
          },
          complete: () => {
            console.log(`${sensorName} Completed.`);
            var btn = document.createElement("btn");
            btn.className = "buttonBlue";

            btn.textContent = "Stream completed";
            document.getElementById("messagesList").appendChild(btn);
          },
          error: err => {
            console.log(`${sensorName} error: "${err}"`);
            var btn = document.createElement("btn");
            btn.className = "buttonBlue";

            btn.textContent = err;
            document.getElementById("messagesList").appendChild(btn);
          }
        });
      }
      //const connectedClients = await connection.invoke("ListStreams");
      //console.log(connectedClients);
      //subscribe - foreach client
      //connectedClients.forEach(subscribeToStream);
      //connectedClients.on("SenStreamCreated", subscribeToStream);

      // from V1 (StreamOutputHub)
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

      //Test method
      //var subject = new signalR.Subject();
      //var promise = connection.invoke("Pump", subject);
      //var count = 0;
      //setInterval(function() {
      //  subject.next(count);
      //  count++;
      //  console.log(count);
      //}, 14);
    };
    createHubConnection();
  }, []);
  // [] -->specifies that we will be calling this effect only when the component first mounts.
  return (
    <>
      <div className="inc-exp-container">
        <h1>SignalR Stream component</h1>
      </div>
      <div id="messagesList"></div>
    </>
  );
};

export default SignalRStream;
