import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import Background from "../assets/background.jpg";
import sizeIcon from "../assets/size.svg";

function ItemCardpage({setCart, product,setProduct,signed,customerDTO,setWindow,setItemAddedToCart}) {
  const [size, setSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(true);
  const [customize,setCustomize] = useState("");
  const [customizeflag,setCustomizeflag] = useState(false);
  let factor = Math.round(product.description.length / 52);
  if (factor ===4)
    {factor=3}
  console.log(factor)

  const handleClose = () =>{ 
    setProduct(null)
    setOpen(false)
  }
  const addtocart = async () => {
    setProduct(null)
    setOpen(false)
    setCart(true)
    const userId = customerDTO.id; 
    const apiUrl = `http://localhost:8080/order/cart/${userId}`;

    const requestData = {
        productId: product.id,
        quantity: quantity,
        size: size,
        customize: customize,
    };

    try {
        
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const data = await response.json();
        console.log("Response received:", data);
        setItemAddedToCart(true);

    } catch (error) {
        console.error("Error while adding to cart:", error);
    }
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { backgroundColor: "#FEEFAE",borderRadius: 4,},
      }}
    >
      
    {!customizeflag&&(  
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={3}
          sx={{ backgroundColor: "#FEEFAE", padding: 2, borderRadius: 2 }}
        >
          {/* Top Image */}
          <Box
            component="img"
            src={Background}
            alt="Top Banner"
            sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2 }}
          />

          {/* Product Image and Shadow */}
          <Box position="relative" textAlign="center"
                sx={{marginTop:-20 ,marginLeft:-60}}>
            <Box
              component="img"
              src={product.src || Background}
              alt={product.name || "Product Image"}
              sx={{  objectFit: "contain", width: 150, height: 150,marginTop: 2, gap: 3}}
            />

          </Box>

          {/* Product Details */}
          <Box
            sx={{
              width: "50%",
              textAlign: "left",
              padding: 2,
              backgroundColor: "#FEFCE7",
              borderRadius: 4,
              
              boxShadow: 2,
              marginLeft:48,
              marginBottom: -9 ,
                       
            }}
          >
            <Typography variant="h6">{product.name}</Typography>
            <Typography
                variant="body1"
                sx={{
                width: '100%', // Ensures that the description takes up the full width
                overflow: 'hidden', // Prevents overflow
                textOverflow: 'ellipsis', // Adds ellipsis if the text overflows (optional)
                wordWrap: 'break-word', // Ensures words break and wrap to the next line if necessary
                
                }}
             >{product.description}</Typography>
          </Box>

          {/* Size Selector */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            sx={{
                width: "40%",
                backgroundColor: "#FEFCE7",
                padding: 2,
                borderRadius: 4,
                boxShadow: 2,
                marginTop:-5.3-factor*3,
                marginLeft:-57,
            }}
          >
      <Typography variant="h6">Size</Typography>
      <Box
        width="45%"
        height="5px" 
        sx={{ backgroundColor: "#FE9F81", marginY: -1,borderRadius: 2, }}
      ></Box>
      <Box display="flex" gap={2}>
      <Box
        component="img"
        src={sizeIcon}
        alt="Small Size"
        onClick={() => setSize("Small")}
        sx={{
          width: 50,
          height: 70,
          cursor: "pointer",
          borderRadius: "50%",
          backgroundColor: size === "Small" ? "#FE9F81" : "none",
          marginTop: 6
        }}
    />
      <Box
        component="img"
        src={sizeIcon}
        alt="Medium Size"
        onClick={() => setSize("Medium")}
        sx={{
          width: 75,
          height: 95,
          cursor: "pointer",
          borderRadius: "50%",
          backgroundColor: size === "Medium" ? "#FE9F81" : "none",
          marginTop: 3
        }}
        />
        <Box
        component="img"
        src={sizeIcon}
        alt="Large Size"
        onClick={() => setSize("Large")}
        sx={{
             width: 100,
             height: 120,
             cursor: "pointer",
             border:  "none",
             borderRadius: "50%",
             backgroundColor: size === "Large" ? "#FE9F81" : "none",
            }}
            />
          </Box>
        </Box>


          {/* Price and Quantity */}
          <Box display="flex" justifyContent="space-between"  alignItems="center"width="50%"
            gap="2%" position="relative" textAlign="center" sx={{marginTop:-7 ,marginLeft:50 }}>
            <Typography variant="h6" 
             sx={{ flex: 1
              , textAlign: "center"
              , backgroundColor: "#FEFCE7"
              , borderRadius: 4
              , boxShadow: 2 
              }}>
              Price: {product.price} EGP
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                flex: 1,
                backgroundColor: "#FEFCE7",
                borderRadius:6,
                boxShadow: 2,
                
              }}
            >
              <Button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</Button>
              <Typography variant="h6">{quantity}</Typography>
              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
            </Box>
          </Box>

          {/* Actions */}
          <Box display="flex" justifyContent="space-around" width="100%" mt={2}>
          <Button
              variant="contained"
              onClick={() => (signed ? addtocart() : setWindow("sign up"))}
              sx={{
                    backgroundColor: "#FEFCE7",
                    borderRadius: 4,
                    color: "black",
                    boxShadow: 2,
                    "&:hover": {
                        backgroundColor: "#E6E4D8",
                    },
              }}>
                Add to Cart
          </Button>

            <Button variant="contained" onClick={() => setCustomizeflag(true)} sx={{
                backgroundColor: "#FEFCE7",
                borderRadius: 4,
                color: "black",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#E6E4D8",
                },
              }}>Customize</Button>
          </Box>
        </Box>
      </DialogContent>
      )}
      {customizeflag&&(
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            sx={{ padding: 2 }}
          >
            <TextField
              label="Customize your product"
              variant="outlined"
              fullWidth
              value={customize}
              onChange={(e) => setCustomize(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => setCustomizeflag(false)}
              sx={{
                backgroundColor: "#FEFCE7",
                borderRadius: 4,
                color: "black",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#E6E4D8",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ItemCardpage;
