import { useState } from 'react'
import './App.css'
import Home from './home/home'

function App() {
  const isLoggedIn = true;
  return (
    <>
      <Home isLoggedIn={isLoggedIn} />
    </>
  )
}

export default App
