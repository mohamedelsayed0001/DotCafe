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

function Profile({ setWindow ,customerDTO}) {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    image: "https://via.placeholder.com/150",
    points: 120,
    discount: "15%",
    lastOrders: [
      { id: 1, name: "Order #001", date: "2024-12-20" },
      { id: 2, name: "Order #002", date: "2024-12-19" },
      { id: 3, name: "Order #003", date: "2024-12-18" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const saveChanges = () => {
    setIsEditing(false);
    console.log("User profile saved:", user);
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
          src={user.image}
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
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    value={user.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography variant="body1">Email: {user.email}</Typography>
                  <Typography variant="body1">Phone: {user.phone}</Typography>
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
            <Typography variant="h6" gutterBottom>
              Last 3 Orders
            </Typography>
            <List>
              {user.lastOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <ListItem>
                    <ListItemText
                      primary={order.name}
                      secondary={`Date: ${order.date}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Profile;