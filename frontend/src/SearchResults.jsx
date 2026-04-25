import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function SearchResults({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [sortMode, setSortMode] = useState("relevance");
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim();
  const normalizedQuery = query.toLowerCase();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setProducts(response.data);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    }

    loadProducts();
  }, []);

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const matchingProducts = products.filter((product) => {
      const searchable = `${product.name || ""} ${product.category || ""} ${
        product.description || ""
      } ${product.brand || ""} ${product.material || ""} ${
        product.color || ""
      }`;
      return searchable.toLowerCase().includes(normalizedQuery);
    });

    if (sortMode === "priceLow") {
      matchingProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortMode === "priceHigh") {
      matchingProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortMode === "rating") {
      matchingProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return matchingProducts;
  }, [normalizedQuery, products, sortMode]);

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;
  }

  return (
    <main className="searchPage">
      <section className="searchHero">
        <div>
          <p className="eyebrow">SEARCH RESULTS</p>
          <h1>{query ? `Results for "${query}"` : "Search the catalog"}</h1>
          <span>
            {status === "ready"
              ? `${results.length} matching products`
              : "Checking inventory"}
          </span>
        </div>
        <Link className="detailsBtn inlineBtn" to="/">
          Back to shop
        </Link>
      </section>

      <section className="productSection searchResultsSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">MATCHED PRODUCTS</p>
            <h2>Find the right piece faster</h2>
          </div>
          <div className="catalogControls">
            <label className="sortControl">
              <span>Sort</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest rated</option>
                <option value="priceLow">Price: low to high</option>
                <option value="priceHigh">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        {status === "loading" && <div className="stateMessage">Loading products...</div>}
        {status === "error" && (
          <div className="stateMessage">
            Start the backend on port 5000 to search the catalog.
          </div>
        )}
        {status === "ready" && !query && (
          <div className="stateMessage">Type a product name in the search bar.</div>
        )}
        {status === "ready" && query && results.length === 0 && (
          <div className="stateMessage">No products matched your search.</div>
        )}

        <div className="productGrid">
          {results.map((product) => (
            <article className="productCard" key={product._id}>
              <div className="productImageWrap">
                <img src={product.images} alt={product.name} />
                <span className="ratingBadge">{product.rating} star</span>
                {product.stock <= 10 && <span className="stockBadge">Limited stock</span>}
              </div>
              <div className="productContent">
                <div>
                  <div className="productLabelRow">
                    <span className="productCategory">{product.category || "Furniture"}</span>
                    {product.brand && <span>{product.brand}</span>}
                  </div>
                  <h3>{product.name}</h3>
                  <div className="specRow">
                    {product.material && <span>{product.material}</span>}
                    {product.color && <span>{product.color}</span>}
                  </div>
                  <p>{product.description}</p>
                </div>
                <div className="productMeta">
                  <div>
                    <strong>{formatPrice(product.price)}</strong>
                    {product.originalPrice > product.price && (
                      <del>{formatPrice(product.originalPrice)}</del>
                    )}
                  </div>
                  <span>{product.stock} in stock</span>
                </div>
                <button
                  className="cartBtn"
                  type="button"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
                <Link className="detailsBtn" to={`/products/${product._id}`}>
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SearchResults;
