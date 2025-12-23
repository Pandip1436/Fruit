import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCardShop from "../components/ProductCardShop";
// import "../pages/css/Products.css"

function Products({ products, cart, setCart, showToast }) {
  /* -------------------- STATE -------------------- */
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product => {
      if (priceRange === "low") return product.price < 100;
      if (priceRange === "mid")
        return product.price >= 100 && product.price <= 300;
      if (priceRange === "high") return product.price > 300;
      return true;
    })
    .sort((a, b) => {
      if (sortType === "az") return a.name.localeCompare(b.name);
      if (sortType === "priceLow") return a.price - b.price;
      if (sortType === "priceHigh") return b.price - a.price;
      return 0;
    });

  /* -------------------- CART HANDLERS -------------------- */
  const addToCart = product => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showToast("🛒 Added to cart", "success");
  };

  const increaseQty = id => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
    showToast("❌ Removed from cart", "info");
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="page shop-with-cart">
      {/* PRODUCTS SECTION */}
      <div className="shop-products">
        <h2>Products</h2>

        {/* FILTER CONTROLS */}
        <div className="shop-controls">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={sortType}
            onChange={e => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="az">Name A → Z</option>
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
          </select>

          <select
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Below ₹100</option>
            <option value="mid">₹100 – ₹300</option>
            <option value="high">Above ₹300</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        <div className="shop-grid-ui">
          {filteredProducts.map(product => (
            <ProductCardShop
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    

      {/* CART PANEL */}
      <div className="shop-cart-panel">
        <h3>🛒 Cart</h3>

        {cart.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="mini-cart-item">
                <img src={item.image} alt={item.name} />

                <div className="mini-cart-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <div className="mini-cart-qty">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className="mini-cart-footer">
              <strong>Total: ₹{totalAmount}</strong>

              <Link to="/cart">
                <button className="checkout-btn">Go To Cart</button>
              </Link>
            </div>
          </>
        )}
      
      </div>

    </div>
      
  );
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default Products;
