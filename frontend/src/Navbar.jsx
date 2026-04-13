import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./App.css";

function Navbar() {
  const location = useLocation();

  const hideSearchOn = ["/about-us", "/contact-us", "/login", "/signup"];
  const showSearch = !hideSearchOn.includes(location.pathname);

  return (
    <div className="navbarWrapper">
      <div className="logosection">
        <NavLink to="/">
          <img src="/furnicart_logo.svg" alt="Logo" width={150} height={100} />
        </NavLink>
      </div>
      {showSearch && (
        <div className="navSearch">
          <input
            type="text"
            placeholder="Search furniture..."
            className="searchInput"
          />
          <button className="searchBtn">Search</button>
        </div>
      )}

      <div className="navMenu">
        <NavLink to="/signup" className="navLinks">
          Sign Up
        </NavLink>
        <NavLink to="/about-us" className="navLinks">
          About Us
        </NavLink>
        <NavLink to="/contact-us" className="navLinks">
          Contact Us
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
