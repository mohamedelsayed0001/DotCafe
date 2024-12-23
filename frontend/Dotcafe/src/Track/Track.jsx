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
import { useState,useEffect } from "react";

function Track() {
    const [orderState,setOrderState]=useState();
    const [selectedOrderNumber,setSelectedOrderNumber]=useState()
  const [orders, setOrders] = useState([
    
        {
          "number": 19990,
          "details": {
            "items": ["Orange", "Tea", "Coffee"],
            "price": 200,
            "paymentMethod": "Cash",
            "orderState": "Placing Order"
          }
        },
        {
          "number": 19991,
          "details": {
            "items": ["Apple", "Water", "Snack"],
            "price": 150,
            "paymentMethod": "Credit Card",
            "orderState": "Delivered Order"
          }
        }
      ]
  );
  useEffect(()=>{
     ///fetch state from back end
  },[selectedOrderNumber])

  // Function to handle the "Track" button click
  const trackOrder = (orderNumber) => {
    setSelectedOrderNumber(orderNumber)
   
  };
  const getOrderState = (orderNumber) => {
    const order = orders.find((order) => order.number === orderNumber);
    return order ? order.details.orderState : '';
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column",marginTop:"20px" }}>
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
        <button className="logo" onClick={() => console.log("Go Home")}>
          <img src={logo_icon} alt="Logo Icon" style={{ width: "100%" }} />
        </button>

        <Button
          variant="contained"
          style={{
            backgroundColor: "white",
            color: "black",
            width: "10%",
            borderRadius: "10px",
          }}
          onClick={() => {setWindo("menu")}}
        >
          Menu
        </Button>
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
            borderRadius: "10px",
            background: "white",
            padding: "10px",
            maxHeight: "300x",
            borderRadius: "20px",
            overflowY: "auto",
            margin: "auto",
            width: "90%",
            marginBottom: "10px",
          }}
        >
          {orders.map((order, index) => (
            <div style={{width:"100%",display:"flex",alignItems:'center'}}> 

       
            <Accordion
              key={index}
              style={{
                
                 width:"90%",
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
                  Order Number : {order.number}
                </Typography>
                
                <Typography sx={{ color: "text.secondary" }}>
                  Total: {order.details.price} EGP
                </Typography>
               
              </AccordionSummary>

              <AccordionDetails>
                <Typography variant="h6">Details:</Typography>
                <ul>
                  {order.details.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
                <Typography>
                  <strong>Payment Method:</strong> {order.details.paymentMethod}
                </Typography>
                <Typography>
                  <strong>Total:</strong> {order.details.price} EGP
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Button
                  variant="text"
                  style={{ marginLeft: "auto" }}
                  onClick={() => trackOrder(order.number)}
                >
                  Track Order
                </Button>
             </div>
          ) )}
        </Stack>
      </Stack>
   
    {/* Selected Order Details */}
    {selectedOrderNumber && (
        <Stack>
          <Typography
            variant="h5"
            component="h2"
            style={{
              marginTop: '20px',
              marginBottom: '10px',
              fontWeight: '900',
              fontStyle: 'italic',
            }}
          >
            Order Number:{' '}
            <span
              style={{
              
                marginLeft: '10px',
                display: 'inline-block',
                padding: '5px',
                borderRadius: '5px',
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
            style={{ width: '90%', margin: 'auto' }}
          >
            {['Placing Order', 'Preparing Order', 'Delivered Order'].map(
              (state) => (
                <Button
                  key={state}
                  variant="contained"
                  style={{
                    marginTop:"40px",
                    background:
                      getOrderState(selectedOrderNumber) === state
                        ? 'green'
                        : 'white',
                    color: 'black',
                    padding: '10px',
                    borderRadius: '10px',
                    width: '30%',
                    fontSize:"1.2rem",
                    textAlign: 'center',
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
  );
}

export default Track;