import { Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import ContactUs from "./ContactUs.jsx";
import AboutUs from "./AboutUs.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ProductDetails from "./ProductDetails.jsx";
import Cart from "./Cart.jsx";
import SearchResults from "./SearchResults.jsx";
import Account from "./Account.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("furnicartUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("furnicartCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("furnicartCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item._id === product._id);

      if (existingItem) {
        return currentItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function updateCartQuantity(productId, quantity) {
    const nextQuantity = Math.max(1, Number(quantity));
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem("furnicartUser", JSON.stringify(user));
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("furnicartUser");
  }

  return (
    <div>
      <Navbar cartCount={cartCount} currentUser={currentUser} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/search"
          element={<SearchResults addToCart={addToCart} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/account"
          element={<Account currentUser={currentUser} onLogout={handleLogout} />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
