import { useState, useEffect } from 'react';
import Home from './home/home';
import Registration from './registration/registration';
import Admin from './admin/admin';
import Menu from './menu/menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import OrderReview from './Orders/OrderReview'
import Track from './Track/Track'
import Profile from './profile/profile';
function App() {
  const [customerDTO, setCustomerDTO] = useState(() => {
    const savedCustomerDTO = sessionStorage.getItem("customerDTO");
    return savedCustomerDTO ? JSON.parse(savedCustomerDTO) : {
      id: null,
      role: null,
      points: null,
      name: null,
      mail: null,
      password: null,
      phoneNumber: null,
    };
  });

  const [signed, setSigned] = useState(() => {
    const savedSigned = sessionStorage.getItem("signed");
    return savedSigned ? JSON.parse(savedSigned) : false;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : false;
  });
  const [window, setWindow] = useState(()=>{
    const savedWindow=sessionStorage.getItem("window");
    return savedWindow?JSON.parse(savedWindow):"home";
  }



  );

  
  useEffect(() => {
    sessionStorage.setItem("signed", JSON.stringify(signed));
    sessionStorage.setItem("window", JSON.stringify(window));
    sessionStorage.setItem("customerDTO", JSON.stringify(customerDTO));
  }, [signed, customerDTO,window]);

  return (
    <>
    {/*
       
    <Router>
      <Routes>
      <Route path='/'menu>
      <Menu
          signed={signed}
          setWindow={setWindow}
        />
        </Route>
        <Route path='/'>
        <Home
          setSigned={setSigned}
          signed={signed}
          setWindow={setWindow}
        />
          </Route>
          <Route path='/admin'>
          <Admin setMainWindow={setWindow} setUserState={setSigned}/>
          </Route>
          <Route path='/order-review'>
          <OrderReview customerDTO={customerDTO} setWindow={setWindow}></OrderReview>

          </Route>
          <Route path='/sign-in'>
          <Registration
          window={window}
          setWindow={setWindow}
          customerDTO={customerDTO}
          setCustomerDTO={setCustomerDTO}
          signed={signed}
          setSigned={setSigned}
        />

          </Route>
          <Route path='/sign-up'>
          <Registration
          window={window}
          setWindow={setWindow}
          customerDTO={customerDTO}
          setCustomerDTO={setCustomerDTO}
          signed={signed}
          setSigned={setSigned}
        />
          </Route>
      </Routes>
    </Router>
    
    */}
   
         {
      window==="reviewOrder"&&(<OrderReview setWindow={setWindow} setCartButton ={setCart} customerDTO={customerDTO}></OrderReview>)
    } 
    
        {["sign in", "sign up"].includes(window) && (
        <Registration
         setCart={setCart}
          window={window}
          setWindow={setWindow}
          customerDTO={customerDTO}
          setCustomerDTO={setCustomerDTO}
          signed={signed}
          setSigned={setSigned}
        />
      )}

      {window === "admin" && <Admin setMainWindow={setWindow} setUserState={setSigned}/>}
      {window === "home" && (
        <Home
          setSigned={setSigned}
          signed={signed}
          setWindow={setWindow}
        />
      )}   
      {window === "menu" && (
        <Menu
        setCart={setCart}
          cart={cart}
          signed={signed}
          setWindow={setWindow}
          customerDTO={customerDTO}
        />

      )}
         {window === "profile" && (
        <Profile
        setWindow={setWindow} customerDTO ={customerDTO}></Profile>
      )}

{window === "track" && (
      <Track setWindow={setWindow} cutomerDTO={customerDTO}></Track>
      )}
      
    </>
  );
}

export default App;
