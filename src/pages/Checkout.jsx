import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { placeOrder } from "../services/api";

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [paymentMethod] = useState("Razorpay");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cart.length > 0 && !user) navigate("/login");
  }, [cart, user, navigate]);

  const handleCheckout = async () => {
    if (!user) return navigate("/login");

    const order = {
      user: user.email,
      items: cart,
      total,
      payment: paymentMethod,
      date: new Date().toLocaleDateString()
    };

    try {
      await placeOrder(order);
      setCart([]);
      navigate("/orders");
    } catch {
      alert("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <Link to="/products">
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">
              Go to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Checkout
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* PERSONAL INFORMATION */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-600" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <input
                    className="w-full outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <input
                    className="w-full outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Phone Number *</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <input
                    className="w-full outline-none"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-600" />
              Shipping Address
            </h3>

            <textarea
              rows="3"
              className="w-full border rounded-md px-3 py-2 resize-none"
              placeholder="Enter your complete address"
            />

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">City *</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  <input className="w-full outline-none" placeholder="City" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">State *</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  <input className="w-full outline-none" placeholder="State" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">PIN Code *</label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 mt-1">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                  <input className="w-full outline-none" placeholder="PIN Code" />
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CreditCardIcon className="h-5 w-5 text-gray-600" />
              Payment Method
            </h3>

            <div className="flex items-center gap-3 border rounded-md p-4 bg-gray-50">
              <CreditCardIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium">Secure Payment via Razorpay</span>
              <ShieldCheckIcon className="h-5 w-5 text-green-600 ml-auto" />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Pay securely using UPI, Cards, Net Banking & Wallets
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            {/* <ShoppingBagIcon className="h-5 w-5 text-gray-600" /> */}
            Order Summary
          </h3>

          {cart.map(item => (
            <div key={item._id} className="flex gap-3 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover border"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Final Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md font-semibold transition"
          >
            Place Order & Pay ₹{total}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By placing your order, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
};

export default Checkout;
