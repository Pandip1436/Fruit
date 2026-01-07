import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { placeOrder } from "../services/api";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    const order = {
      user: user.email,
      items: cart,
      total,
      payment: paymentMethod,
      date: new Date().toLocaleDateString()
    };

    await placeOrder(order);

    setCart([]);
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout
      </h2>

      {cart.length === 0 ? (
        /* EMPTY CHECKOUT */
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-2">
            No items to checkout
          </h3>
          <p className="text-gray-600 mb-6">
            Your cart is empty. Add some fresh fruits to continue.
          </p>
          <Link to="/products">
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
              Go Product Page
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* PRODUCT SUMMARY */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Product Summary
            </h3>

            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-600">
                      ₹{item.price}
                    </p>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-xl font-semibold">
              Payment Method
            </h3>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="Card Payment"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              Card Payment
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={e => {
                  setPaymentMethod(e.target.value);
                  setError("");
                }}
              />
              UPI
            </label>

            {/* CARD FORM (MOCK) */}
            {paymentMethod === "Card Payment" && (
              <div className="space-y-3 mt-4">
                <input
                  placeholder="Card Number"
                  maxLength="16"
                  className="w-full border rounded-md px-3 py-2"
                />
                <div className="flex gap-3">
                  <input
                    placeholder="MM/YY"
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                  <input
                    placeholder="CVV"
                    maxLength="3"
                    className="w-1/2 border rounded-md px-3 py-2"
                  />
                </div>
                <input
                  placeholder="Card Holder Name"
                  className="w-full border rounded-md px-3 py-2"
                />
                <p className="text-xs text-gray-500">
                  🔒 This is a demo card form
                </p>
              </div>
            )}

            {/* UPI PREVIEW */}
            {paymentMethod === "UPI" && (
              <div className="mt-4 text-center space-y-2">
                <p className="text-sm">
                  Scan QR using any UPI app
                </p>
                <img
                  src="/src/assets/qr.jpeg"
                  alt="UPI QR"
                  className="mx-auto w-40 h-40 object-contain"
                />
                <p className="text-xs text-gray-500">
                  UPI ID: myfruitsshop@upi
                </p>
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-bold">
              Total Amount: ₹{total}
            </h3>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
};

export default Checkout;
