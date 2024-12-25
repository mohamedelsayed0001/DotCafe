import React, { useState } from 'react';
import './menu.css';
import Orders from '../assets/tracking.svg';
import { Button, IconButton, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
function LogedinButton({setWindow,cart}){
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
      };
      
      const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      };
    return (
        <div className='navigation-container'>
          <button 
            onClick={() => { setWindow("track") }} 
            className="menu-track-button" 
            aria-label="Track"
          >
            Track
          </button>
          {cart ? (
            <IconButton onClick={() =>{ setWindow("reviewOrder")}}>
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleSnackbarOpen}>
              <RemoveShoppingCartIcon />
            </IconButton>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
              Your cart is empty.
            </Alert>
          </Snackbar>
        </div>
      );
}
export default LogedinButton;