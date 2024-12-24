import { useState, useEffect } from 'react';
import Home from './home/home';
import Registration from './registration/registration';
import Admin from './admin/admin';
import Menu from './menu/menu';
import './App.css';
import OrderTracker from './OrderTracker';

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
      {/* {["sign in", "sign up"].includes(window) && (
        <Registration
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
          signed={signed}
          setWindow={setWindow}
        />
      )} */}
      <OrderTracker/>
    </>
  );
}

export default App;
