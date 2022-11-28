import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login'
import Home from './Container/Home'


const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App