import { useState } from 'react';
import './App.css';
import Registration from './registration/registration';
import Admin from './admin/admin';

function App() {
  const [window, setWindow] = useState("sign up");

  return (
    <>
      {window === "sign in" && <Registration window={window} setWindow={setWindow} />}
      {window === "sign up" && <Registration window={window} setWindow={setWindow} />}
    </>
  );
}

export default App;
