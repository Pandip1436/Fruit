import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Trash2 } from "lucide-react";

function Cart({ cart, setCart, showToast }) {
  const [location, setLocation] = useState("tamilnadu");

  /* ---------------- QTY HANDLERS ---------------- */
  const increaseQty = id => {
    setCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    setCart(
      cart
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item._id !== id));
    showToast("❌ Item removed from cart", "info");
  };

  /* ---------------- PRICE CALCULATIONS ---------------- */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05;
  const discount = subtotal * 0.05;
  const finalTotal = subtotal + gst - discount;

  return (
    <div className="min-h-screen  bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-10 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-3">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Add some products to start shopping.
          </p>
          <Link to="/products">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT: PREMIUM CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map(item => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl border hover:shadow-xl transition-all duration-300 p-5 flex flex-col sm:flex-row gap-6"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl border"
                  />
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Hand-picked quality product
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.price + 20}
                    </span>
                  </div>

                  {/* QTY CONTROL */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center border rounded-full px-3 py-1">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        disabled={item.quantity === 1}
                        className="px-2 text-lg disabled:opacity-40"
                      >
                        −
                      </button>
                      <span className="px-3 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-2 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">Item Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= RIGHT: ORDER SUMMARY ================= */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-4">
              Order Summary
            </h3>

            <div className="mb-5">
              <p className="text-sm font-medium mb-2">
                Shipping Location
              </p>
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={location === "tamilnadu"}
                    onChange={() => setLocation("tamilnadu")}
                  />
                  Tamil Nadu
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={location === "other"}
                    onChange={() => setLocation("other")}
                  />
                  Other State
                </label>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(0)}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(0)}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-base">
                <span>Final Total</span>
                <span>₹{finalTotal.toFixed(0)}</span>
              </div>

              <p className="text-green-600 text-xs">
                You saved ₹{discount.toFixed(0)} today!
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Link to="/cart/checkout">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/products">
                <button className="w-full border py-3 rounded-xl hover:bg-gray-50">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default Cart;
