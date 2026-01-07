import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCardShop from "../components/ProductCardShop";
import { fetchProducts } from "../services/api";

function Products({ cart, setCart, showToast }) {
  /* ---------------- STATE ---------------- */
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  /* ---------------- FILTER + SORT ---------------- */
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => {
      if (priceRange === "low") return p.price < 100;
      if (priceRange === "mid") return p.price >= 100 && p.price <= 300;
      if (priceRange === "high") return p.price > 300;
      return true;
    })
    .sort((a, b) => {
      if (sortType === "az") return a.name.localeCompare(b.name);
      if (sortType === "priceLow") return a.price - b.price;
      if (sortType === "priceHigh") return b.price - a.price;
      return 0;
    });

  /* ---------------- CART HANDLERS ---------------- */
  const addToCart = product => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(
        cart.map(item =>
          item._id === product._id
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
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(
      cart
        .map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item._id !== id));
    showToast("❌ Removed from cart", "info");
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* PRODUCTS */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl  font-bold mb-4">Products</h2>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-5 mb-6">
          <input
            className=" bg-white border rounded-md px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="bg-white border w-full md:w-1/3 rounded-md px-3 py-2 focus:outline-none"
            value={sortType}
            onChange={e => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="az">Name A → Z</option>
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
          </select>

          <select
            className=" bg-white w-full md:w-1/4  border rounded-md px-3 py-2 focus:outline-none"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCardShop
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* CART */}
      <div className="bg-white border rounded-lg shadow-sm p-4 h-fit sticky top-24">
        <h3 className="text-xl font-semibold mb-4">🛒 Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {cart.map(item => (
                <div key={item._id} className="flex gap-3 border-b pb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">₹{item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        disabled={item.quantity === 1}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <p className="font-semibold mb-3">Total: ₹{totalAmount}</p>

              <Link to="/cart">
                <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                  Go To Cart
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Products.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default Products;
