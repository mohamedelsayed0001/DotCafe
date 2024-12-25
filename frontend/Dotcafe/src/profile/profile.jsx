import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeLogo from "../menu/HomeLogo";
import Background from "../assets/background.jpg";
import Controlbuttons from "./controlbuttons";
import profile from '../assets/profileimage.svg';
import OrderListItem from "./OrderListItem";

function Profile({ setWindow ,customerDTO}) {
  
  const [user, setUser] = useState(customerDTO);
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/customer/profile/${customerDTO.id}`); // Ensure the variable is named `response`
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data); // Set the user data in state
        
      } catch (err) {
        console.error("Error fetching user data:", err); // Proper error logging
      }
    };
  
    if (customerDTO?.id) {
      fetchUser(); // Call the API when customerDTO.id is provided
    }
  }, [customerDTO.id]); // Add customerDTO.id to the dependency array
  
  
  const [isEditing, setIsEditing] = useState(false);
  

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    console.log(user)
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setUser((prev) => ({ ...prev, src: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  }

  const saveChanges = async () => {
    setIsEditing(false); // Exit edit mode
    try {
      const response = await fetch(`http://localhost:8080/customer/profile/edit/${customerDTO.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save changes. Please try again.");
      }
  
      const updatedUser = await response.json();
      console.log("User profile saved:", updatedUser); // Log the updated profile
      setUser(updatedUser); // Update state with the response from the backend
    } catch (error) {
      console.error("Error saving profile changes:", error);
      alert("Error saving changes: " + error.message);
    }
  };
  
  

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        
        overflow: 'hidden',
        position: 'absolute', 
        top: 0, 
        left: 0, 
      }}
    >
      <Box sx={{ width: '100%', padding: 2 }}>
        <HomeLogo setwindow={setWindow} />
        <Controlbuttons setWindow={setWindow}/>
      </Box>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8.7,
        position: 'relative',
      }}>
        <Avatar
          src={user.src === null ? profile:user.src}
          alt={user.name}
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            top: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            border: '4px solid #FFF9DF'
          }}
        />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "60%",
            backgroundColor: "rgba(255, 249, 223, 0.9)",
            paddingTop: 8,
            maxHeight: '70vh',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            borderRadius:12,
          }}
        >
          <Grid item xs={12} sm={4} textAlign="center">
            {isEditing && (
              <Button
                variant="outlined"
                component="label"
                sx={{ marginTop: 1 }}
              >
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            )}

            {/* Profile Details */}
            <Box sx={{ marginTop: 2 }}>
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={user.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={user.mail}
                    onChange={(e) => handleChange("mail", e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    value={user.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body1">Email: {user.mail}</Typography>
                  <Typography variant="body1">Phone: {user.phoneNumber}</Typography>
                </>
              )}
              {/* Non-Editable Fields */}
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Points: {user.points}
              </Typography>
              
            </Box>
          </Grid>

          {/* Edit/Save Buttons */}
          <Box textAlign="center" marginTop={2}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveChanges}
                  sx={{ marginRight: 1 }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{backgroundColor: "rgb(220, 151, 151,0.7)"}}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          {/* Last 3 Orders Section */}
          <Box sx={{ marginTop: 4 }}>
  { user.orders.length > 0 ? (
    <>
      <Typography variant="h6" gutterBottom>
        All Orders
      </Typography>
      <Box
        sx={{
          height: "200px", // Adjust the height to fit 3 items
          overflowY: "auto", // Enable vertical scrolling
          borderRadius: "5px",
          padding: "10px", // Optional: Add padding for a better look
         
        }}
      >
        <List>
          {user.orders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem>
                
                <OrderListItem order={order}></OrderListItem>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
          ) : (
            <Typography variant="h6" align="center" gutterBottom>
              No orders yet
            </Typography>
          )}
        </Box>

        </Paper>
      </Box>
    </Box>
  );
}

export default Profile;