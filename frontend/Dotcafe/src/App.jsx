
import Home from './home/home'
import { useState } from 'react';
import './App.css';
import Registration from './registration/registration';
import Admin from './admin/admin';

function App() {
  const isLoggedIn = true;
  
      
  const [window, setWindow] = useState("sign up");

  return (
    <>
      {/*window === "sign in" && <Registration window={window} setWindow={setWindow} />*/}
      {/*window === "sign up" && <Registration window={window} setWindow={setWindow} />*  {<Home></Home>}*/}
     
      <Admin></Admin>
    </>
  );
}

export default App;
