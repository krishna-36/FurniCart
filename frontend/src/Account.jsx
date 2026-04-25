import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Account({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(currentUser ? "loading" : "idle");

  useEffect(() => {
    async function loadOrders() {
      if (!currentUser?.email) {
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          params: { email: currentUser.email },
        });
        setOrders(response.data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    }

    loadOrders();
  }, [currentUser]);

  const accountStats = useMemo(() => {
    const totalSpent = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const totalItems = orders.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce(
          (itemTotal, item) => itemTotal + Number(item.quantity || 0),
          0
        )
      );
    }, 0);

    return {
      orders: orders.length,
      totalItems,
      totalSpent,
      lastOrder: orders[0],
    };
  }, [orders]);

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  if (!currentUser) {
    return (
      <main className="accountPage">
        <section className="emptyCart accountGate">
          <p className="eyebrow">ACCOUNT</p>
          <h1>Login to view your account</h1>
          <p>
            Your profile details, saved cart, and purchase history will appear
            here after you login.
          </p>
          <Link className="primaryBtn" to="/login">
            Login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="accountPage">
      <section className="accountHero">
        <div>
          <p className="eyebrow">MY ACCOUNT</p>
          <h1>Welcome back, {currentUser.name || "FurniCart shopper"}</h1>
          <span>{currentUser.email}</span>
        </div>
        <button className="removeBtn accountLogout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>

      <section className="accountGrid">
        <div className="profilePanel">
          <div className="profileAvatar">
            {(currentUser.name || currentUser.email || "F").charAt(0).toUpperCase()}
          </div>
          <h2>{currentUser.name || "FurniCart Customer"}</h2>
          <p>{currentUser.email}</p>
          <div className="profileRows">
            <div>
              <span>Customer ID</span>
              <strong>{currentUser.id || "Local account"}</strong>
            </div>
            <div>
              <span>Membership</span>
              <strong>Standard</strong>
            </div>
            <div>
              <span>Preferred support</span>
              <strong>Email and phone</strong>
            </div>
          </div>
          <Link className="detailsBtn" to="/contact-us">
            Contact support
          </Link>
        </div>

        <div className="accountMain">
          <div className="accountStats">
            <div>
              <span>Orders</span>
              <strong>{accountStats.orders}</strong>
            </div>
            <div>
              <span>Items bought</span>
              <strong>{accountStats.totalItems}</strong>
            </div>
            <div>
              <span>Total spent</span>
              <strong>{formatPrice(accountStats.totalSpent)}</strong>
            </div>
            <div>
              <span>Last status</span>
              <strong>{accountStats.lastOrder?.status || "No orders yet"}</strong>
            </div>
          </div>

          <section className="ordersPanel">
            <div className="ordersHeader">
              <div>
                <p className="eyebrow">PAST PURCHASES</p>
                <h2>Order history</h2>
              </div>
              <Link className="detailsBtn inlineBtn" to="/">
                Shop again
              </Link>
            </div>

            {status === "loading" && (
              <div className="stateMessage">Loading your orders...</div>
            )}
            {status === "error" && (
              <div className="stateMessage">Unable to load order history.</div>
            )}
            {status === "ready" && orders.length === 0 && (
              <div className="stateMessage">
                You have not placed an order yet. Your purchases will appear here.
              </div>
            )}

            <div className="orderList">
              {orders.map((order) => (
                <article className="orderCard" key={order._id}>
                  <div className="orderSummary">
                    <div>
                      <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                      <h3>{formatDate(order.createdAt)}</h3>
                    </div>
                    <div>
                      <strong>{formatPrice(order.total)}</strong>
                      <span className="orderStatus">{order.status}</span>
                    </div>
                  </div>

                  <div className="orderItems">
                    {order.items.map((item) => (
                      <Link
                        className="orderItem"
                        to={`/products/${item.productId}`}
                        key={`${order._id}-${item.productId}`}
                      >
                        <img src={item.image} alt={item.name} />
                        <div>
                          <strong>{item.name}</strong>
                          <span>
                            Qty {item.quantity} - {formatPrice(item.price)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Account;
