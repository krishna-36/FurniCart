import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Cart({
  cartItems,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  currentUser,
}) {
  const [customer, setCustomer] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  }, [cartItems]);
  const deliveryFee = subtotal > 15000 || subtotal === 0 ? 0 : 499;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      name: currentCustomer.name || currentUser.name || "",
      email: currentCustomer.email || currentUser.email || "",
    }));
  }, [currentUser]);

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  async function placeOrder(event) {
    event.preventDefault();

    if (!cartItems.length) {
      setStatus("Your cart is empty.");
      return;
    }

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setStatus("Please fill all checkout details.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        customer,
        items: cartItems,
      });
      setOrderConfirmation({
        orderId: response.data.orderId,
        total: response.data.total,
        name: customer.name,
        email: customer.email,
      });
      setStatus("");
      clearCart();
      setCustomer({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      setStatus(error.response?.data?.message || "Unable to place order right now.");
    }
  }

  return (
    <main className="cartPage">
      <section className="cartHeader">
        <div>
          <p className="eyebrow">YOUR CART</p>
          <h1>Review and checkout</h1>
          <span>{cartItems.length} item types selected</span>
        </div>
        <Link className="detailsBtn inlineBtn" to="/">
          Continue shopping
        </Link>
      </section>

      {orderConfirmation ? (
        <section className="orderThanks">
          <div className="thanksIcon">OK</div>
          <p className="eyebrow">ORDER PLACED</p>
          <h2>Thank you, {orderConfirmation.name}!</h2>
          <p>
            We appreciate you choosing FurniCart. Your order has been received,
            and our team will prepare your furniture for delivery soon.
          </p>
          <div className="thanksDetails">
            <div>
              <span>Order ID</span>
              <strong>{orderConfirmation.orderId}</strong>
            </div>
            <div>
              <span>Confirmation sent to</span>
              <strong>{orderConfirmation.email}</strong>
            </div>
            <div>
              <span>Order total</span>
              <strong>{formatPrice(orderConfirmation.total)}</strong>
            </div>
          </div>
          <div className="thanksActions">
            {currentUser && (
              <Link className="primaryBtn" to="/account">
                View purchases
              </Link>
            )}
            <Link className="detailsBtn inlineBtn" to="/">
              Continue shopping
            </Link>
          </div>
        </section>
      ) : cartItems.length === 0 ? (
        <section className="emptyCart">
          <h2>Your cart is empty</h2>
          <p>Add a few pieces from the shop and they will appear here.</p>
          <Link className="primaryBtn" to="/">
            Browse products
          </Link>
        </section>
      ) : (
        <section className="cartLayout">
          <div className="cartItems">
            {cartItems.map((item) => (
              <article className="cartItem" key={item._id}>
                <img src={item.images} alt={item.name} />
                <div>
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.brand || item.material}</p>
                  <strong>{formatPrice(item.price)}</strong>
                </div>
                <div className="quantityControl">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      updateCartQuantity(item._id, event.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <form className="checkoutPanel" onSubmit={placeOrder}>
            <h2>Checkout</h2>
            <div className="summaryRows">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>{deliveryFee ? formatPrice(deliveryFee) : "Free"}</strong>
              </div>
              <div className="summaryTotal">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="checkoutFields">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={customer.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={customer.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={customer.phone}
                onChange={handleChange}
              />
              <textarea
                name="address"
                placeholder="Delivery address"
                value={customer.address}
                onChange={handleChange}
              ></textarea>
            </div>

            {status && <p className="formStatus">{status}</p>}

            <button className="cartBtn" type="submit">
              Place order
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

export default Cart;
