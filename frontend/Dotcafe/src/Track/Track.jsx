import React, { useState, useEffect } from 'react';
import { Typography, Button, Stack } from '@mui/material';

function Track({cutomerDTO,setWindow}) {
  const [orders, setOrders] = useState( [
    {
      orderNumber: 1122,
      progress:"Order Placed",
      items: [
        { productName: "tea", size: "small", quantity: 4, price: 8 },
        { productName: "coffee", size: "medium", quantity: 2, price: 15 },
      ],
      total: 100,
    },
    {
      orderNumber: 1123,
      progress:"Order Placed",
      items: [
        { productName: "juice", size: "large", quantity: 3, itemPrice: 20 },
        { productName: "water", size: "medium", quantity: 5, itemPrice: 5 },
      ],
      total: 150,
    },
    {
      orderNumber: 1124,
      progress:"Order Placed",
      items: [
        { productName: "soda", size: "small", quantity: 6, itemPrice: 10 },
        { productName: "snacks", size: "large", quantity: 2, itemPrice: 25 },
      ],
      total: 200,
    },
  ]);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null); 
  const [orderState, setOrderState] = useState(); 


  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/customer/profile/${cutomerDTO.id}`);

      if (response.status === 200) {
          setOrders(response.data.orders);



      }
    } catch (error) {
      if (error.response?.status === 400) {
        // Account not found or other bad request error
        console.error("Error 400:", error.response.data);

      } else {
        // Generic error handler
        console.error("Unexpected Error:", error);

      }
    }
  
  };

  useEffect(() => {
    fetchOrders(); 
  }, []);


  const trackOrder = (orderNumber) => {
    setSelectedOrderNumber(orderNumber);
    
  };

  const getOrderState = (orderNumber) => {
   const order= orders.find(o=>o.orderNumber===orderNumber)
   setOrderState(order.progress);
   return orderState;
   
  };

  return (
    <div>
      {/* Orders List */}
      <Stack spacing={3}>
        <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Order List
        </Typography>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id}>
              <Typography variant="h6">Order Number: {order.id}</Typography>
              <Typography>
                <strong>Total Price:</strong> {order.total} EGP
                <strong>Taxes:</strong> {order.taxes} EGP
              </Typography>
              <Typography>
                <strong>Items:</strong>
              </Typography>
              <ul>
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    <strong>{item.productName}</strong> - Size: {item.size}, Quantity: {item.quantity}, Item Price: {item.price} EGP, Total Price:{item.totalPrice},Customize :{item.customize}
                  </li>
                ))}
              </ul>
              <Button
                variant="text"
                style={{ marginTop: '10px' }}
                onClick={() => trackOrder(order.id)}
              >
                Track Order
              </Button>
            </div>
          ))
        ) : (
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            No orders available.
          </Typography>
        )}
      </Stack>

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
            {['Order Placed', 'Preparing Order', 'Delivered Order'].map((state) => (
              <Button
                key={state}
                variant="contained"
                style={{
                  marginTop: "40px",
                  background: getOrderState(selectedOrderNumber) === state ? 'green' : 'white',
                  color: 'black',
                  padding: '10px',
                  borderRadius: '10px',
                  width: '30%',
                  fontSize: "1.2rem",
                  textAlign: 'center',
                }}
              >
                <strong>{state}</strong>
              </Button>
            ))}
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default Track;