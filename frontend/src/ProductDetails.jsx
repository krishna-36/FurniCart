import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${productId}`
        );
        setProduct(response.data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    }

    loadProduct();
  }, [productId]);

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;
  }

  if (status === "loading") {
    return <div className="detailPage stateMessage">Loading product...</div>;
  }

  if (status === "error" || !product) {
    return (
      <div className="detailPage">
        <div className="stateMessage">Product could not be loaded.</div>
        <Link className="detailsBtn inlineBtn" to="/">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <main className="detailPage">
      <Link className="backLink" to="/">
        Back to shop
      </Link>

      <section className="detailLayout">
        <div className="detailImagePanel">
          <img src={product.images} alt={product.name} />
        </div>

        <div className="detailInfoPanel">
          <span className="productCategory">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <div className="detailPriceRow">
            <strong>{formatPrice(product.price)}</strong>
            {product.originalPrice > product.price && (
              <del>{formatPrice(product.originalPrice)}</del>
            )}
          </div>

          <div className="detailMetaGrid">
            <div>
              <span>Brand</span>
              <strong>{product.brand || "FurniCart"}</strong>
            </div>
            <div>
              <span>Rating</span>
              <strong>{product.rating} star</strong>
            </div>
            <div>
              <span>Material</span>
              <strong>{product.material || "Premium finish"}</strong>
            </div>
            <div>
              <span>Color</span>
              <strong>{product.color || "Natural"}</strong>
            </div>
            <div>
              <span>Dimensions</span>
              <strong>{product.dimensions || "Standard Size"}</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>{product.stock} in stock</strong>
            </div>
          </div>

          <div className="detailActions">
            <button
              className="cartBtn"
              type="button"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
            <Link className="detailsBtn" to="/cart">
              Go to cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
