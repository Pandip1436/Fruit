import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const gst = subtotal * 0.05; // 5%
  const shipping = subtotal > 0 ? 0 : 0; // free shipping
  const discount = subtotal * 0.05; // 5%
  const finalTotal = subtotal + gst + shipping - discount;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        /* EMPTY CART */
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-10 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-3">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Add some fresh fruits to start shopping.
          </p>
          <Link to="/products">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ================= LEFT: CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row gap-5 items-center"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* INFO */}
                <div className="flex-1 w-full">
                  <h4 className="font-semibold text-lg">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Fresh quality product
                  </p>
                  <p className="font-semibold mt-1 text-gray-800">
                    ₹{item.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      disabled={item.quantity === 1}
                      className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-3 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* SUBTOTAL */}
                <div className="text-lg font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* ================= RIGHT: ORDER SUMMARY ================= */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">

            <h3 className="text-lg font-semibold mb-4">
              Order Summary
            </h3>

            {/* LOCATION */}
            <div className="mb-5">
              <p className="text-sm font-medium mb-2">
                Select Your Shipping Location
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

            {/* PRICE BREAKDOWN */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(0)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr />

              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{(subtotal + gst).toFixed(0)}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Discount (5%)</span>
                <span>-₹{discount.toFixed(0)}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-base">
                <span>Final Total</span>
                <span>₹{finalTotal.toFixed(0)}</span>
              </div>

              <p className="text-green-600 text-xs">
                You saved ₹{discount.toFixed(0)} on this order!
              </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 space-y-3">
              <Link to="/cart/checkout">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/products">
                <button className="w-full border py-3 rounded-lg hover:bg-gray-50 transition">
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
