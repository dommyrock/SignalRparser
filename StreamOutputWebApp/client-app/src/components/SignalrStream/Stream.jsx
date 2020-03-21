import React, { useState, useEffect } from "react";
//import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@aspnet/signalr"; dont need this npm
//import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack'; add npm if i want to switch protocols
import "./stream.css";
const signalR = require("@microsoft/signalr");

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
        //   .withHubProtocol(new MessagePackHubProtocol()) adds new binary protocol
        .build();

      //client reconnected  -
      connection.onreconnected(async function() {
        //const connectedClients = await connection.invoke("ListStreams");
        const connectedClients = await connection.invoke("GetSensorNames");
        connectedClients.forEach(subscribeToSensor);
      });

      try {
        //start conn
        await connection.start();
        //const connectedClients = await connection.invoke("ListStreams"); //V1
        const sensorNames = await connection.invoke("GetSensorNames").catch(err => console.error(err.toString()));
        sensorNames.forEach(subscribeToSensor);
        connection.on("SensorAdded", subscribeToSensor);
      } catch (error) {
        alert(error);
      }
      function subscribeToSensor(sensorName) {
        console.log(`Client: ${sensorName} Subscribed! -->Starting to read data produced by ${sensorName}`);

        connection.stream("GetSensorData", sensorName).subscribe({
          next: item => {
            console.log(item);
            //conditionaly render diff styles
            const btn = document.createElement("button");
            switch (sensorName) {
              case "pink":
                btn.className = "buttonPink";
                btn.textContent = item;
                document.getElementById("messagesList").appendChild(btn);
                break;
              case "blue":
                btn.className = "buttonBlue";
                btn.textContent = item;
                document.getElementById("messagesList").appendChild(btn);
                break;

              default:
                btn.className = "buttonDefault";
                btn.textContent = item;
                document.getElementById("messagesList").appendChild(btn);
                break;
            }

            //Scroll to bottom of  element -id =messagesList
            window.scrollTo(0, document.getElementById("messagesList").scrollHeight);
          },
          complete: () => {
            console.log(`${sensorName} Completed.`);
            var btn = document.createElement("btn");
            btn.className = "buttonBlue";

            btn.textContent = `${sensorName} Stream Completed.`;
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

      //   connection.on("StreamCreated", stream => { medhod on "StreamOutputHub" Hub
      //     console.log("Stream created");
      //     console.log(stream);
      //   });

      //metod on "StreamOutputHubV2" --> "PublishSensorData" method
      connection.on("StreamRemoved", stream => {
        console.log("Stream removed(Client ended stream). Disconnecting client now...");
        console.log(stream);
      });

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
        <h1>SignalR Stream component</h1>
      </div>
      <div id="messagesList"></div>
    </>
  );
};

export default SignalRStream;
