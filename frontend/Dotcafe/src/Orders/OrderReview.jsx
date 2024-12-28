import "./order.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from '@mui/icons-material/Clear';
import Background from "../assets/background.jpg";
import axios from "axios";
import { Button, Box, IconButton, Stack, Typography, Select, MenuItem, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import logo_icon from "/public/logo.svg";
import { useEffect, useState } from "react";

function OrderReview({ customerDTO, setCartButton, setWindow }) {
  useEffect(() => {
    fetchItems();

  }, [])

  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [points, setPoints] = useState(0);
  const [cart, setCart] = useState([])
  const [customerPoints, setCustomerPoints] = useState(0);

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
        if (response.data.orderItems.Length <= 0) {
          setWindow("home");
        }
        setItems(response.data.orderItems);
        setOrderPrice(response.data.orderPrice);
        setTaxes(response.data.taxes);
        setTotal(response.data.total)
        setPoints(response.data.points)

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
  let confirmOrTrack = "Confirm";
  let isReview = true;
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
    confirmOrTrack = "Track Your Order";
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
  async function handleDelete(index) {
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

  async function applyPoints(e) {
    if (e.target.value <= customerPoints && e.target.value > 0) {
      const newPoints = e.target.value
      setPoints(newPoints);
      try {
        const response = await axios.post(`http://localhost:8080/order/points/${customerDTO.id}`, null,
          {
            params: {
              points: newPoints
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
    setCart([]);
    setCartButton(false);
    setDialogOpen(false);
    setWindow("menu");

  }
  function isEmpty() {
    if (items.length > 0) {
      return false
    }
    return true;

  }
  return (
    <div className="body" >
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

        <button
          className="menu-class"

          onClick={() => setWindow("menu")}
        >
          Menu
        </button>
      </Stack>


      {items.length > 0 ?
        (<>
          <Stack>
            <Typography variant="h5" component="h2" style={{ marginBottom: "10px", fontWeight: "900", fontStyle: "italic" }}>
              Review Order
            </Typography>

            <Stack
              direction="column"
              alignItems="center"
              style={{
                backgroundImage: `url(${Background})`,
                padding: "10px",
                maxHeight: "250px",
                borderRadius: "20px",
                overflowY: "auto",
                margin: "auto",
                width: "90%",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
                    <div style={{ display: "flex", alignItems: "center", width: "10%" }}> {item.price}<ClearIcon></ClearIcon> {item.quantity}</div></Typography>

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

        </>) :
        (
          <>
            <Typography variant="h5" style={{ width: "20%", fontWeight: "850" }}>Your Cart Is Empty!!</Typography>
          </>
        )
      }

      <Stack
        direction="column"
        alignItems="center"
        sx={{
          borderRadius: "16px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          margin: "auto",
          width: { xs: "90%", sm: "70%", md: "50%" },
        }}
      >
        {/* Input Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              color: "#555",
            }}
          >
            Enter points
          </Typography>
          <Box sx={{ width: "30%" }}>
            <input
              type="number"
              placeholder="Enter points"
              value={points}
              onChange={(e) => applyPoints(e)}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "14px",
                color: "#333",
              }}
            />
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "16px",
                color: "#555",
                paddingLeft: "20px"
              }}
            >
              Your Points : {customerPoints}
            </Typography>
          </Box>

        </Box>

        {/* Price Details Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333",
            }}
          >
            Order: {orderPrice} EGP
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333",
            }}
          >
            + Taxes: {taxes} EGP
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              fontStyle: "italic",
              textAlign: "center",
              color: "#222",
              marginTop: "8px",
            }}
          >
            Total: {total} EGP
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ width: "100%", marginTop: "20px", gap: "16px" }}
        >
          <Button
            variant="contained"
            color={confirmOrTrack === "Confirm" ? "success" : "info"}
            disabled={isEmpty()}
            sx={{
              width: "40%",
              borderRadius: "24px",
              padding: "10px 16px",
              fontWeight: "600",
              textTransform: "none",
            }}
            onClick={() =>
              handleConfirm()
            }
          >
            {confirmOrTrack}
          </Button>
          {isReview && (
            <Button
              variant="contained"
              color="error"
              sx={{
                width: "40%",
                borderRadius: "24px",
                padding: "10px 16px",
                fontWeight: "600",
                textTransform: "none",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
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
            {cart.orderItems?.length > 0 ? (cart.orderItems.map((item, itemIndex) => (
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
              </div>)
            )) : (<></>)}
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