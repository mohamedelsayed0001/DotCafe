import Home from './home/home';
import { useState } from 'react';
import './App.css';
import Registration from './registration/registration';
import Admin from './admin/admin';
import Menu from './menu/menu';

function App() {
  const [customerDTO, setCustomerDTO] = useState(
    {
      id: null,
      role: null,
      points:null,
      name:null,
      mail: null,
      password:null,
      phoneNumber: null,
    }
  );
  const [signed, setSigned] = useState(true);
  const [window, setWindow] = useState("home"); 

  return (
    <>
     
     {["sign in", "sign up"].includes(window) && (
        <Registration
          window={window}
          setWindow={setWindow}
          customerDTO={customerDTO}
          setCustomerDTO={setCustomerDTO}
          signed={signed}
          setSigned={setSigned}
        />
      )}

      {window === "admin" && <Admin/>}
      {window==="home"&& < Home
          signed={signed} 
          setWindow={setWindow}
          />}
      {window === "menu" && <Menu  
          signed = {signed}
          setWindow =  {setWindow}/>}
    </>
  );
}

export default App;
