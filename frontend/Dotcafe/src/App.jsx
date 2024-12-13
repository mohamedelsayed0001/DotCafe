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
  useEffect(() => {
    const savedSigned = sessionStorage.getItem("signed");
    const savedCustomerDTO = sessionStorage.getItem("customerDTO");
    const SavedWindow=sessionStorage.getItem("window")
    if (savedSigned) {
      setSigned(JSON.parse(savedSigned));
    }
    if (savedCustomerDTO) {
      setCustomerDTO(JSON.parse(savedCustomerDTO));
    }
    if(SavedWindow){
      setWindow(JSON.parse(SavedWindow));
    }
  }, []);


  const [signed, setSigned] = useState(false);
  const [window, setWindow] = useState("admin"); 
  useEffect(() => {
    sessionStorage.setItem("signed", JSON.stringify(signed));
    sessionStorage.setItem("customerDTO", JSON.stringify(customerDTO));
    sessionStorage.setItem("window", JSON.stringify(window));
  const [signed, setSigned] = useState(true);
  const [window, setWindow] = useState("home"); 

  }, [signed, customerDTO],window);
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

      {window === "admin" && <Admin setMainWindow={setWindow} setUserState={setSigned}/>}
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
