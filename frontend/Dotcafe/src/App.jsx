import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registration from './registration/registration'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Registration page="signIn" />
    </>
  )
}

export default App
