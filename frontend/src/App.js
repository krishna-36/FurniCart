import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import ContactUs from "./ContactUs.jsx";
import AboutUs from "./AboutUs.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  return(
    <div>
      <Navbar></Navbar>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/about-us" element={<AboutUs/>} />
      </Routes>

    </div>
  );
}

export default App;