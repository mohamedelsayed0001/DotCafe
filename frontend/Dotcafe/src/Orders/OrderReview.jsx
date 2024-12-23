import "./order.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from '@mui/icons-material/Clear';

import { Button, IconButton, Stack, Typography ,Select,MenuItem,DialogTitle,Dialog,DialogContent,DialogContentText,DialogActions} from "@mui/material";
import logo_icon from "/public/logo.svg";
import { useState } from "react";

function OrderReview({ setWindow}) {
  const [items, setItems] = useState([
    { name: "item1", count: 1 ,price:100},
    { name: "item2", count: 1,price:150 },
    { name: "item3", count: 1 ,price:200},
    { name: "item4", count: 1,price:400 },
    { name: "item2", count: 1 ,price:220 },
    { name: "item3", count: 1 ,price:120 },
    { name: "item4", count: 1 ,price:300},
  ]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleIncrease = (index) => {
    const newItems = [...items];
    newItems[index].count++;
    setItems(newItems);
  };

  const handleDecrease = (index) => {
    const newItems = [...items];
    if (newItems[index].count > 0) {
      newItems[index].count--;
    }
    setItems(newItems);
  };
 // Handle Confirm
 const handleConfirm = () => {
  const randomOrderNumber = Math.floor(Math.random() * 1000000);
  setOrderNumber(randomOrderNumber);
  setDialogOpen(true); // Open the popup
};

// Handle Cancel
const handleCancel = () => {
  setItems([]); // Clear all items
};
  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
function calculateTotal(){
  let total=0 ;
  items.map((i)=>{
    total+=i.price*i.count;

  })
  return total;
}
function handleOnClose(){
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
        <button className="logo" onClick={() => {setWindow("home")}}>
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
          onClick={()=>setWindow("menu")}
        >
          Menu
        </Button>
      </Stack>
      <Stack>
        <Typography variant="h5" component="h2" style={{ marginBottom: "10px" ,fontWeight:"900",fontStyle:"italic"}}>
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
            borderRadius:"20px",
            overflowY: "auto", 
           margin:"auto",
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
              <Typography variant="h5" style={{ width:"20%" ,fontWeight:"850"}}>{item.name}</Typography>
                {item.price*item.count} EGP
              </div>
          
              <Typography variant="h5" > 
                <div style={{display:"flex",alignItems:"center",width:"10%"}}> <ClearIcon></ClearIcon> {item.count}</div></Typography>
                <div style={{backgroundColor:"#FEEFAE" ,width:"14%",borderRadius:"10px",display:"flex",justifyContent:"space-around",alignItems:"center"}}> 
                <IconButton onClick={() => handleIncrease(index)}>
                 <AddIcon style={{ color: "black" }}  />
              </IconButton>
                  <div style={{height:"100%"}}><strong>|</strong></div>
                  
              <IconButton
                onClick={() => handleDecrease(index)}
                disabled={item.count <= 0}
              >
                <RemoveIcon  style={{ color: "black" }} />
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
            marginTop:"12px",
            borderRadius: "10px",
            background: "white",
            padding: "10px",
           
            borderRadius:"20px",
          
           margin:"auto",
            width: "60%",
          }}
         
        >  
            {/* Payment Method */}
      
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "20px" ,width:"90%"}}
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
          style={{ width:"30%"}}
        >
          
        
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="PayPal">PayPal</MenuItem>
          <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
        </Select>
      </Stack>
      <div style={{display:"flex",flexDirection:"column" ,alignItems:"center",justifyContent:"center",gap:"2px"}}>
        <div> order: {calculateTotal()} EGP</div>
        <div> + taxes : 500 EGP</div>
     
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
       total : {calculateTotal()+500} EGP 
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
          style={{ width: "20%",borderRadius:"20px"  }}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ width: "20%",borderRadius:"20px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
         </Stack>
            {/* Popup for Order Number */}
      <Dialog open={isDialogOpen} onClose={handleOnClose}>
        <DialogTitle style={{background:"#FEEFAE" ,marginBottom:"10px"}}>Order Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="h6" >
            Your order has been confirmed!
          </Typography>
          <Typography variant="h6">Order Number: {orderNumber}</Typography>
          <Typography variant="h6">
            Payment Method: {paymentMethod}
          </Typography>
          <Typography variant="h6">Total: {calculateTotal()+500} EGP</Typography>
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