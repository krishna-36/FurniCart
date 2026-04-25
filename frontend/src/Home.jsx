import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortMode, setSortMode] = useState("featured");
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") || "").toLowerCase();

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

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const searchable = `${product.name || ""} ${product.category || ""} ${
        product.description || ""
      } ${product.brand || ""} ${product.material || ""} ${
        product.color || ""
      }`;
      const matchesSearch = searchable.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchTerm]);

  const displayProducts = useMemo(() => {
    const sortedProducts = [...filteredProducts];

    if (sortMode === "priceLow") {
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortMode === "priceHigh") {
      sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sortMode === "rating") {
      sortedProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    if (sortMode === "featured") {
      sortedProducts.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return sortedProducts;
  }, [filteredProducts, sortMode]);

  const featuredProduct = products.find((product) => product.isFeatured) || products[0];
  const heroImage = featuredProduct
    ? Array.isArray(featuredProduct.images)
      ? featuredProduct.images[0]
      : featuredProduct.images
    : "";

  function formatPrice(price) {
    return `Rs. ${Number(price || 0).toLocaleString("en-IN")}`;
  }

  return (
    <div className="homePage">
      <section className="homeHero">
        <div className="homeHeroText">
          <p className="eyebrow">FURNICART STORE</p>
          <h1>Modern furniture for every room.</h1>
          <p>
            Browse a live catalog of sofas, beds, tables, wardrobes, dining
            sets, and chairs pulled straight from your Furniture database.
          </p>
          <div className="heroActions">
            <a href="#products" className="primaryBtn">
              Shop collection
            </a>
            <a href="/about-us" className="secondaryBtn">
              Our story
            </a>
          </div>
          <div className="heroStats">
            <div>
              <strong>{products.length || "..."}</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>{Math.max(categories.length - 1, 0) || "..."}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>Top rating</span>
            </div>
          </div>
        </div>
        {featuredProduct && (
          <div className="heroFeature">
            <img src={heroImage} alt={featuredProduct.name} />
            <div className="heroFeatureBody">
              <span>Featured pick</span>
              <strong>{featuredProduct.name}</strong>
              <small>
                {featuredProduct.brand || featuredProduct.category} -{" "}
                {formatPrice(featuredProduct.price)}
              </small>
            </div>
          </div>
        )}
      </section>

      <section className="storeHighlights">
        {[
          ["Curated catalog", "Live products from MongoDB"],
          ["Free assembly", "On orders above Rs. 15,000"],
          ["Quick delivery", "5-7 business days in major cities"],
        ].map(([title, subtitle]) => (
          <div className="highlightItem" key={title}>
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
        ))}
      </section>

      <section className="productSection" id="products">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">SHOP THE CATALOG</p>
            <h2>Fresh pieces from every category</h2>
            <span className="resultCount">
              {status === "ready" ? `${displayProducts.length} items showing` : "Loading inventory"}
            </span>
          </div>
          <div className="catalogControls">
            <label className="sortControl">
              <span>Sort</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
              >
                <option value="featured">Featured first</option>
                <option value="rating">Highest rated</option>
                <option value="priceLow">Price: low to high</option>
                <option value="priceHigh">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <div className="categoryPills" aria-label="Product categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? "pill active" : "pill"}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {status === "loading" && <div className="stateMessage">Loading products...</div>}
        {status === "error" && (
          <div className="stateMessage">
            Start the backend on port 5000 to load the catalog.
          </div>
        )}
        {status === "ready" && filteredProducts.length === 0 && (
          <div className="stateMessage">No furniture matched your search.</div>
        )}

        <div className="productGrid">
          {displayProducts.map((product) => (
            <article className="productCard" key={product._id}>
              <div className="productImageWrap">
              <NavLink to ={`/products/${product._id}`}>
                <img
                    src={Array.isArray(product.images) ? product.images[0] : product.images}
                    alt={product.name}
                  />
              </NavLink>                
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
                {/* <Link className="detailsBtn" to={`/products/${product._id}`}>
                  View details
                </Link> */}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
