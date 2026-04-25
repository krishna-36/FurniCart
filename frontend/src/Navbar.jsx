import React from "react";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./App.css";

function Navbar({ cartCount, currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const hideSearchOn = [
    "/about-us",
    "/contact-us",
    "/login",
    "/signup",
    "/cart",
    "/account",
  ];
  const showSearch = !hideSearchOn.includes(location.pathname);

  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = event.currentTarget.search.value.trim();
    navigate(searchTerm ? `/search?query=${encodeURIComponent(searchTerm)}` : "/");
  }

  return (
    <div className="navbarWrapper">
      <div className="logosection">
        <NavLink to="/">
          <img src="/furnicart_logo.svg" alt="FurniCart" width={150} height={100} />
        </NavLink>
      </div>
      {showSearch && (
        <form className="navSearch" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search furniture..."
            className="searchInput"
            defaultValue={searchParams.get("query") || searchParams.get("search") || ""}
          />
          <button className="searchBtn" type="submit">
            Search
          </button>
        </form>
      )}

      <div className="navMenu">
        <NavLink to="/" className="navLinks">
          Shop
        </NavLink>
        <NavLink to="/cart" className="navLinks cartLink">
          Cart
          {cartCount > 0 && <span className="cartCount">{cartCount}</span>}
        </NavLink>
        {currentUser ? (
          <NavLink to="/account" className="navLinks accountLink">
            Account
            <span>{currentUser.name?.charAt(0) || currentUser.email?.charAt(0)}</span>
          </NavLink>
        ) : (
          <>
            <NavLink to="/login" className="navLinks">
              Login
            </NavLink>
            <NavLink to="/signup" className="navLinks">
              Sign Up
            </NavLink>
          </>
        )}
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
