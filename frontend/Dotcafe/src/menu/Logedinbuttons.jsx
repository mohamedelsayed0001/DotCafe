import React, { useState } from 'react';
import './menu.css';
import Orders from '../assets/tracking.svg';
import { Button, IconButton, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function LogedinButton({setWindow,cart}){
    const [snackbarOpen, setSnackbarOpen] = useState(false);
   
    return (
        <div className='navigation-container'>
          <button 
            onClick={() => { setWindow("track") }} 
            className="menu-track-button" 
            aria-label="Track"
          >
            Track
          </button>
         <img src={Orders} alt="Cart" style={{ width: "50px", height: "50px", position: "absolute", left: "-13%",top:"3.5%" }}  onClick={()=>{setWindow("reviewOrder")}}/> 

              
         
         
        </div>
      );
}
export default LogedinButton;