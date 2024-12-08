import { useState } from 'react'
//import './App.css'
import Home from './home/home'
import Registration from './registration/registration';
import Admin from './admin/admin';

function App() {
  const isLoggedIn = true;
  return (
    <>
      <Registration/>
    </>
  )
}

export default App