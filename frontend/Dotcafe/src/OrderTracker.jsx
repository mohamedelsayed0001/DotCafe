import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

 function OrderTracker (){
  const [orderState, setOrderState] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Create a new STOMP client
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws", // WebSocket endpoint
      reconnectDelay: 5000, // Reconnect after 5 seconds
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        // Subscribe to the order topic
        client.subscribe(`/topic/order/${1}`, (message) => {
          // Handle incoming messages
          setOrderState(message.body);
          console.log(`Order ${1} update:`, message.body);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
        setConnected(false);
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
      },
    });

    client.activate(); // Activate the connection

    return () => {
      client.deactivate(); // Cleanup on component unmount
    };
  }, [1]);

  return (
    <div>
      <h1>Order Tracker</h1>
      <p>Tracking Order ID: {1}</p>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      <h2>Order State:</h2>
      <p>{orderState ? orderState : "Waiting for updates..."}</p>
    </div>
  );
};

export default OrderTracker;
