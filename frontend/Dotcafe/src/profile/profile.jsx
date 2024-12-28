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
  Snackbar,
  Alert,
} from "@mui/material";
import HomeLogo from "../menu/HomeLogo";
import Background from "../assets/background.jpg";
import Controlbuttons from "./controlbuttons";
import profile from "../assets/profileimage.svg";
import OrderListItem from "./OrderListItem";

function Profile({ setWindow, customerDTO }) {
  const [user, setUser] = useState(customerDTO);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/customer/profile/${customerDTO.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (customerDTO?.id) {
      fetchUser();
    }
  }, [customerDTO.id]);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
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
  };

  const validateInputs = () => {
    if (!user.mail.includes("@")) {
      setSnackbar({ open: true, message: "Invalid email address.", severity: "error" });
      return false;
    }
    if (user.phoneNumber.length !== 11) {
      setSnackbar({ open: true, message: "Phone number must be 11 digits.", severity: "error" });
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (!validateInputs()) return;

    setIsEditing(false);
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
      console.log("User profile saved:", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving profile changes:", error);
      setSnackbar({ open: true, message: "Error saving changes: " + error.message, severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "error" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Box sx={{ width: "100%", padding: 2 }}>
        <HomeLogo setwindow={setWindow} />
        <Controlbuttons setWindow={setWindow} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 8.7,
          position: "relative",
        }}
      >
        <Avatar
          src={user.src === null ? profile : user.src}
          alt={user.name}
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            top: -60,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            border: "4px solid #FFF9DF",
          }}
        />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "60%",
            backgroundColor: "rgba(255, 249, 223, 0.9)",
            paddingTop: 8,
            maxHeight: "70vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            borderRadius: 12,
          }}
        >
          <Grid item xs={12} sm={4} textAlign="center">
            {isEditing && (
              <Button variant="outlined" component="label" sx={{ marginTop: 1 }}>
                Change Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
            )}

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
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                Points: {user.points}
              </Typography>
            </Box>
          </Grid>

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
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ backgroundColor: "rgb(220, 151, 151,0.7)" }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Box sx={{ marginTop: 4 }}>
            {user.orders.length > 0 ? (
              <>
                <Typography variant="h6" gutterBottom>
                  All Orders
                </Typography>
                <Box
                  sx={{
                    height: "200px",
                    overflowY: "auto",
                    borderRadius: "5px",
                    padding: "10px",
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profile;
