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
  const [points,setPoints] = useState(0); 
  let customerPoints ;

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
        if (response.data.orderItems.Length<=0){
          setWindow("home");
        }
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
      const response = await axios.put(`http://localhost:8080/order/update/1`, items[index]);

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
  let confirmOrTrack="Confirm";
  let isReview=true;
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

    confirmOrTrack="Track Your Order";
    isReview=false;
    setOrderNumber(randomOrderNumber);
    setDialogOpen(true); // Open the popup
    try {
      const response = await axios.put(`http://localhost:8080/order/place/1`);

      if (response.status === 200) {
   
         setWindow("menu");
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
    setWindow("home");
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
  async function  applyPoints(e){
    if (e.target.value<=customerPoints){
      setPoints(e.target.value);
      console.log(points)
      try {
        const response = await axios.post(`http://localhost:8080/order/points/1`,null,
        {
          params:{
            points: points
          }
           
        }
         
        );
  
        if (response.status === 200) {
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
                {item.customize} EGP
              </div>

              <Typography variant="h5" >
                <div style={{ display: "flex", alignItems: "center", width: "10%" }}> {item.price }<ClearIcon></ClearIcon> { item.quantity}</div></Typography>
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
          marginTop: "20px",
          borderRadius: "10px",
          background: "white",
          padding: "10px",

          borderRadius: "20px",

          margin: "auto",
          width: "50%",
        }}

      >
        {/* Payment Method 

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

        */}
  <div
        
         
         
          style={{ marginBottom: "20px",width: "100%" ,display:"flex", alignItems:"center", justifyContent:"center",gap:'15px'}}
                  >
          <div htmlFor="">Enter points</div>
          <div style={{width:"20%"}}>
          <input
            type="number"
            placeholder="Enter points"
            value={points}
            onChange={(e) =>applyPoints(e) }
            style={{ padding: "8px", marginBottom: "10px" , width: "100%",        
              borderRadius: "8px",   
              border: "2px solid #ccc", 
              }}
          />
          </div>

          </div>
      
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
            color={confirmOrTrack==="Confirm"?"success":"info"}
            style={{ width: "30%", borderRadius: "20px" }}
            onClick={()=>{
              confirmOrTrack==="Confirm"?handleConfirm():setWindow("track")
            }
             }
          >
            {confirmOrTrack}
          </Button>
        {
          isReview&& <Button
          variant="contained"
          color="error"
          style={{ width: "30%", borderRadius: "20px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        } 
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
        <Button onClick={() => setWindow("track")} color="primary">
           Track Your Order 
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default OrderReview;