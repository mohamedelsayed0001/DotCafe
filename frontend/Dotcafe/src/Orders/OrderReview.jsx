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
  const [cart,setCart] = useState([])
  const [customerPoints,setCustomerPoints] = useState(0);

  async function fetchItems() {
    try {
      const response = await axios.get(`http://localhost:8080/customer/user/${customerDTO.id}`);
      if (response.status === 200) {
        
        setCustomerPoints(response.data.points)
        console.log(customerPoints)
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
    setDialogOpen(true); 
    try {
      const response = await axios.put(`http://localhost:8080/order/place/${customerDTO.id}`);
     
      if (response.status === 200) {
        setCart(response.data);
        console.log(cart)

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
    setWindow("menu");
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
    if (e.target.value <= customerPoints){
      setPoints(e.target.value);
      console.log(points)
      try {
        const response = await axios.post(`http://localhost:8080/order/points/${customerDTO.id}`,null,
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
    setItems([]);
    setPoints(0);
    setOrderPrice(0);
    setTaxes(0);
    setTotal(0)
    setCart([])
    setDialogOpen(false);
   
  }
  function isEmpty (){
    if(items.length>0){
      return false
    }
    return true;
    
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
            marginBottom:"10px",
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
                {item.customize} , {item.size}
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
              <Typography variant="h5" style={{ width: "20%", fontWeight: "850" }}>{item.price * item.quantity}</Typography>
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
            disabled= {isEmpty()}
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
      <Dialog open={isDialogOpen} onClose={handleOnClose} fullWidth maxWidth="sm">
  <DialogTitle
    style={{
      backgroundColor: "#FEEFAE",
      color: "#333",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Order Confirmation
  </DialogTitle>
  <DialogContent
    style={{
      padding: "20px",
      backgroundColor: "#FFF",
    }}
  >
    <Typography
      variant="h6"
      style={{
        marginBottom: "10px",
        textAlign: "center",
        fontWeight: "bold",
        color: "#444",
      }}
    >
      Your order has been confirmed!
    </Typography>
    <Typography
      variant="h6"
      style={{
        marginBottom: "15px",
        textAlign: "center",
        color: "#666",
      }}
    >
      Order Number: <span style={{ fontWeight: "700" }}>{cart.id}</span>
    </Typography>
    <div
      style={{
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {cart.orderItems?.length>0 ?(cart.orderItems.map((item, itemIndex) => (
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
            <strong>Item Price:</strong> {items.price} EGP
          </Typography>
        </div>)
      )):(<></>)}
    </div>
    <Typography
      variant="h6"
      style={{
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "10px",
        color: "#000",
      }}
    >
      Total: {cart.total} EGP
    </Typography>
  </DialogContent>
  <DialogActions
    style={{
      justifyContent: "space-around",
      padding: "10px 20px",
      backgroundColor: "#f5f5f5",
    }}
  >
    <Button
      onClick={() => setWindow("track")}
      variant="contained"
      color="primary"
      style={{
        backgroundColor: "#4caf50",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "20px",
        padding: "8px 16px",
      }}
    >
      Track Your Order
    </Button>
    <Button
      onClick={handleOnClose}
      variant="contained"
      color="secondary"
      style={{
        backgroundColor: "#f44336",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "20px",
        padding: "8px 16px",
      }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
}

export default OrderReview;