import "./order.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { Button, IconButton, Stack, Typography, Select, MenuItem, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import logo_icon from "/public/logo.svg";
import { useEffect, useState } from "react";

function OrderReview({ customerDTO, setWindow }) {
  useEffect(() => {
    fetchItems();

  }, [])

  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [points,setPoints] = useState(0); // 
  const customerPoints = 0;

  async function fetchItems() {
    try {
      const response = await axios.get(`http://localhost:8080/customer/user/${customerDTO.id}`);

      if (response.status === 200) {
        customerPoints = response.data.points
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

    try {
      const response = await axios.get(`http://localhost:8080/customer/cart/${customerDTO.id}`);

      if (response.status === 202) {
        setItems(response.data.orderItems);
        setOrderPrice(response.data.orderPrice);
        setTaxes(response.data.taxes);
        setTotal(response.data.total)

        console.log(response.data)


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
  }
  async function handleUpdate(index) {
    try {
      const response = await axios.put(`http://localhost:8080/order/update/${customerDTO.id}`, items[index]);

      if (response.status === 200) {
        setItems(response.data.orderItems);
        setOrderPrice(response.data.orderPrice);
        setTaxes(response.data.taxes);
        setTotal(response.data.total)



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
  }


  const [items, setItems] = useState([

  ]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    handleUpdate(index);
  };

  const handleDecrease = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 0) {
      newItems[index].quantity--;
    }
    setItems(newItems);
    handleUpdate(index);
  };
  // Handle Confirm
  async function handleConfirm() {
    const randomOrderNumber = Math.floor(Math.random() * 1000000);
    setOrderNumber(randomOrderNumber);
    setDialogOpen(true); // Open the popup
    try {
      const response = await axios.put(`http://localhost:8080/order/place/1`);

      if (response.status === 200) {
        


        console.log(response.data)

      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Error 400:", error.response.data);

      } else {
        // Generic error handler
        console.error("Unexpected Error:", error);

      }
    }

  };

  // Handle Cancel
  const handleCancel = () => {
    setItems([]); // Clear all items
  };
  async function  handleDelete(index){
    console.log(items)
    try {
      const response = await axios.delete(`http://localhost:8080/order/${items[index].id}`);

      if (response.status === 200) {
        console.log(response.data)
        setItems(response.data.orderItems);
        setOrderPrice(response.data.orderPrice);
        setTaxes(response.data.taxes);
        setTotal(response.data.total)
        
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("Error 400:", error.response.data);

      } else {
        // Generic error handler
        console.error("Unexpected Error:", error);

      }
    }
  };

  function handleOnClose() {
    setDialogOpen(false);
    setWindow("menu");
  }
  return (
    <div className="body">
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button className="logo" onClick={() => { setWindow("home") }}>
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
          onClick={() => setWindow("menu")}
        >
          Menu
        </Button>
      </Stack>
      <Stack>
        <Typography variant="h5" component="h2" style={{ marginBottom: "10px", fontWeight: "900", fontStyle: "italic" }}>
          Review Order
        </Typography>


        <Stack
          direction="column"
          alignItems="center"
          style={{
            borderRadius: "10px",
            background: "white",
            padding: "10px",
            maxHeight: "250px",
            borderRadius: "20px",
            overflowY: "auto",
            margin: "auto",
            width: "90%",
          }}
        >
          {items.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              style={{
                marginBottom: "10px",
                padding: "10px",
                width: "90%",
                background: "#f9f9f9",
                borderRadius: "8px",
              }}
            >
              <div >
                <Typography variant="h5" style={{ width: "20%", fontWeight: "850" }}>{item.productName}</Typography>
                {item.price * item.quantity} EGP
              </div>

              <Typography variant="h5" >
                <div style={{ display: "flex", alignItems: "center", width: "10%" }}> <ClearIcon></ClearIcon> {item.quantity}</div></Typography>
              <div style={{ backgroundColor: "#FEEFAE", width: "14%", borderRadius: "10px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <IconButton onClick={() => handleIncrease(index)}>
                  <AddIcon style={{ color: "black" }} />
                </IconButton>
                <div style={{ height: "100%" }}><strong>|</strong></div>

                <IconButton
                  onClick={() => handleDecrease(index)}
                  disabled={item.quantity <= 0}
                >
                  <RemoveIcon style={{ color: "black" }} />
                </IconButton>

              </div>

              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon style={{ color: "black" }} />
              </IconButton>


            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack
        direction="column"
        alignItems="center"
        style={{
          marginTop: "12px",
          borderRadius: "10px",
          background: "white",
          padding: "10px",

          borderRadius: "20px",

          margin: "auto",
          width: "60%",
        }}

      >
        {/* Payment Method */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: "20px", width: "90%" }}
        >
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: "8px", textAlign: "center" }}
          >
            Select Payment Method :
          </Typography>
          <Select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            style={{ width: "30%" }}
          >


            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="PayPal">PayPal</MenuItem>
            <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
          </Select>
        </Stack>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
          <div> order: {orderPrice} EGP</div>
          <div> + taxes : {taxes} EGP</div>

          <Typography
            variant="h6"
            component="h2"
            style={{
              marginBottom: "8px",
              fontWeight: "900",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            total : {total} EGP
          </Typography>
        </div>

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <Button
            variant="contained"
            color="success"
            style={{ width: "20%", borderRadius: "20px" }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{ width: "20%", borderRadius: "20px" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
      {/* Popup for Order Number */}
      <Dialog open={isDialogOpen} onClose={handleOnClose}>
        <DialogTitle style={{ background: "#FEEFAE", marginBottom: "10px" }}>Order Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="h6" >
            Your order has been confirmed!
          </Typography>
          <Typography variant="h6">Order Number: {orderNumber}</Typography>
          <Typography variant="h6">
            Payment Method: {paymentMethod}
          </Typography>
          <Typography variant="h6">Total: {total} EGP</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default OrderReview;