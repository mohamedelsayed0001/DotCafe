import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Orders/order.css";
import { Client } from "@stomp/stompjs";
import Background from "../assets/background.jpg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import logo_icon from "/public/logo.svg";

function Track({ cutomerDTO, setWindow }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [connected, setConnected] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/profile/${cutomerDTO.id}`
      );

      if (response.status === 200) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Error 400:", error.response.data);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  useEffect(() => {
    // Create a new STOMP client
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 1000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        client.subscribe(`/track/order/${selectedOrderNumber}`, (message) => {
          setOrders(orders.map((order) => 
            order.id === selectedOrderNumber ? { ...order, progress: message.body } : order
          ));
          console.log(message.body)
          
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

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [selectedOrderNumber]);




  const getOrderState = (orderNumber) => {
    const order = orders.find((o) => o.id === orderNumber);
    return order?.progress || "Unknown";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        {/* Header Section */}
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="logo" onClick={() => setWindow("home")}>
            <img src={logo_icon} alt="Logo Icon" style={{ width: "100%" }} />
          </button>

          <button
           className="menu-class"
            onClick={() => {
              setWindow("menu");
            }}
          >
            Menu
          </button>
        </Stack>

        {/* Track Orders Section */}
        <Stack>
          <Typography
            variant="h5"
            component="h2"
            style={{
              marginBottom: "10px",
              fontWeight: "900",
              fontStyle: "italic",
            }}
          >
            Track Your Orders
          </Typography>
          <Stack
            direction="column"
            alignItems="center"
            style={{
             backgroundImage:`url(${Background})`,
              padding: "10px",
              maxHeight: "300px",
              borderRadius: "20px",
              overflowY: "auto",
              margin: "auto",
              width: "90%",
              marginBottom: "10px",
            }}
          >
            {orders.map((order, index) => (
              <div
                key={index}
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Accordion
                  key={index}
                  style={{
                    width: "90%",
                    borderRadius: "20px",
                    background: "#ffffffd0",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      Order Number : {order.id}
                    </Typography>

                    <Typography sx={{ color: "text.secondary", width: "33%", flexShrink: 0  }}>
                      Total: {order.total} EGP
                    </Typography>
                    <Typography sx={{ color: "text.secondary", width: "33%", flexShrink: 0  }}>
                      Date: {order.localDateTime}
                    </Typography>
                  </AccordionSummary>
                  <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {order.orderItems?.length > 0 ? (order.orderItems.map((item, itemIndex) => (
              <div
                key={itemIndex}
                style={{
                  marginBottom: "10px",
                  padding: "5px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <Typography variant="body1">
                  <strong>Product Name:</strong> {item.productName}
                </Typography>
                <Typography variant="body1">
                  <strong>Size:</strong> {item.size}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {item.quantity}
                </Typography>
                <Typography variant="body1">
                  <strong>Item Price:</strong> {item.price} EGP
                </Typography>
                <Typography variant="body1">
                  <strong>Customization:</strong> {item.customize}
                </Typography>
              </div>)
            )) : (<></>)}
          </div>
                </Accordion>
                <Button
                  variant="text"
                  style={{ marginLeft: "auto" }}
                  onClick={() => setSelectedOrderNumber(order.id)}
                >
                  Track Order
                </Button>
              </div>
            ))}
          </Stack>
        </Stack>

        {selectedOrderNumber && (
          <Stack>
            <Typography
              variant="h5"
              component="h2"
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                fontWeight: "900",
                fontStyle: "italic",
              }}
            >
              Order Number:
              <span
                style={{
                  marginLeft: "10px",
                  display: "inline-block",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {selectedOrderNumber}
              </span>
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{ width: "90%", margin: "auto" }}
            >
              {["Placed", "Preparing", "Ready"].map(
                (state) => (
                  <Button
                    key={state}
                    disabled
                    variant="contained"
                    style={{
                      marginTop: "40px",
                      background:
                        getOrderState(selectedOrderNumber) === state
                          ? "green"
                          : "white",
                      color: "black",
                      padding: "10px",
                      borderRadius: "10px",
                      width: "30%",
                      fontSize: "1.2rem",
                      textAlign: "center",
                    }}
                  >
                    <strong>{state}</strong>
                  </Button>
                )
              )}
            </Stack>
          </Stack>
        )}
      </div>
    </div>
  );
}

export default Track;
