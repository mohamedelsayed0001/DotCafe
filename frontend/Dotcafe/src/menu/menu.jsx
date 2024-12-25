import React, { useEffect, useState } from 'react';
import './menu.css'
import HomeLogo from './HomeLogo';
import SignupButtons from'./SignupButtons'
import LogedinButton from './Logedinbuttons';
import MainMenu from './mainMenu';
import ItemCardpage from './itemCardPage';
import { Snackbar, SnackbarContent } from '@mui/material';
function Menu({setCart, cart ,signed,setWindow ,customerDTO}) {
    const [menu, setMenu] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [itemAddedToCart, setItemAddedToCart] = useState(false);
    const handleCloseSnackbar = () => {
        setItemAddedToCart(false);
       
      };

    const pull = "http://localhost:8080/"
    async function pullmenu() {
        try {
            const response = await fetch(`${pull}menu`); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMenu(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

    useEffect(() => {
        pullmenu();
        
        document.body.classList.add('menu-body');
        return () => {
            
            document.body.classList.remove('menu-body');
        };
    }, []); 
    return(
        <>
        <HomeLogo  setwindow={setWindow}/>
        {signed ? (
            <LogedinButton  setWindow={setWindow} cart={cart}/>
        ) : (
            <SignupButtons setwindow={setWindow}/>
        )}
        <MainMenu  menu ={menu} setProduct={setSelectedProduct}/>
        {selectedProduct && (
        <ItemCardpage
        setCart={setCart}
          product={selectedProduct}
          setProduct = {setSelectedProduct}
          signed={signed}
          customerDTO={customerDTO}
          setWindow={setWindow}
          setItemAddedToCart={setItemAddedToCart}
        />
      )}
      <Snackbar
        open={itemAddedToCart}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#4caf50',  // Green color for success message
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '10px',
          }}
          message={"Item added to cart"}
        />
      </Snackbar>
    
        </>
    );
}
export  default  Menu;