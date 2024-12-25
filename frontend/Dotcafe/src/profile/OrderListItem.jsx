import React, { useState } from 'react';
import { ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const OrderListItem = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={`order number :${order.id}`}
          secondary={`Date: ${order.localDateTime}`}
        />
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          View Details
        </Button>
      </ListItem>

      <Dialog
            open={open}
            onClose={handleClose}
           
        >
        <DialogTitle  style={{backgroundColor: "rgba(255, 249, 223, 0.9)",}}>Order Details</DialogTitle>
        <DialogContent  style={{
            backgroundColor: "rgba(255, 249, 223, 0.9)",
            padding: "20px",
            borderRadius: "10px",
         }}>
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Date:</strong> {order.localDateTime}</div>
          <div><strong>Order Price:</strong> {order.orderPrice}</div>
          <div><strong>Taxes:</strong> {order.taxes}</div>
          <div><strong>Total:</strong> {order.total}</div>
          <div><strong>Order Items:</strong></div>
          <ul>
            {order.orderItems.map((item, index) => (
              <li key={index}>{item.productName} - {item.quantity} x {item.price}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions style={{backgroundColor: "rgba(255, 249, 223, 0.9)",}}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderListItem;
