import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCardShop from "../components/ProductCardShop";
import { fetchProducts } from "../services/api";

function Products({ cart, setCart, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------------- FILTER + SORT (Optimized with useMemo) ---------------- */
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => {
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
  }, [products, search, sortType, priceRange]);

  /* ---------------- CART HANDLERS (Functional Updates) ---------------- */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast("🛒 Added to cart", "success");
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showToast("❌ Removed from cart", "info");
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* PRODUCTS SECTION */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Fresh Products</h2>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            placeholder="Search fruit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-white border border-gray-200 w-full sm:w-1/4 rounded-xl px-3 py-2 focus:outline-none"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="az">Name A → Z</option>
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
          </select>

          <select
            className="bg-white border border-gray-200 w-full sm:w-1/4 rounded-xl px-3 py-2 focus:outline-none"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Below ₹100</option>
            <option value="mid">₹100 – ₹300</option>
            <option value="high">Above ₹300</option>
          </select>
        </div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCardShop key={product._id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No products match your search.</p>
          </div>
        )}
      </div>

      {/* SIDEBAR CART */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🛒</span> Your Cart
          </h3>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Cart is empty</p>
              <p className="text-xs text-gray-400 mt-2">Add some fresh fruits!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4 group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-sm text-green-600 font-bold">₹{item.price}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item._id, -1)}
                            className="px-2 py-0.5 hover:bg-gray-100 transition-colors"
                          >
                            −
                          </button>
                          <span className="px-2 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item._id, 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-xl font-bold text-gray-800">₹{totalAmount}</span>
                </div>

                <Link to="/cart">
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-100 transition-all">
                    Checkout Now
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Products.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default Products;