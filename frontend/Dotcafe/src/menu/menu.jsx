import React, { useEffect, useState } from 'react';
import './menu.css'
import HomeLogo from './HomeLogo';
import SignupButtons from'./SignupButtons'
import LogedinButton from './Logedinbuttons';
import MainMenu from './mainMenu';
import ItemCardpage from './itemCardPage';

function Menu({ signed,setWindow ,customerDTO}) {
    const [menu, setMenu] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            <LogedinButton />
        ) : (
            <SignupButtons setwindow={setWindow}/>
        )}
        <MainMenu  menu ={menu} setProduct={setSelectedProduct}/>
        {selectedProduct && (
        <ItemCardpage
          product={selectedProduct}
          setProduct = {setSelectedProduct}
          signed={signed}
          customerDTO={customerDTO}
          setWindow={setWindow}
        />
      )}
        </>
    );
}
export  default  Menu;