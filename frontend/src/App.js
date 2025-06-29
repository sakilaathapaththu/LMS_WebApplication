import React from "react";
import Login from './Pages/loginpage.jsx'
import Home from "./Pages/homepage.jsx";
import Signuppage from "./Pages/signuppage.jsx";
import Footer from "./Components/Home/Footer.jsx";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Login />} />
    
      </Routes>
      <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
