import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { placeOrder } from "../services/api";
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../services/api";

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  /* ---------------- STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");


  const [form, setForm] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: ""
  });

  // const paymentMethod = "Razorpay";

  /* ---------------- TOTAL ---------------- */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (cart.length > 0 && !user) navigate("/login");
  }, [cart, user, navigate]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit phone number";

    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!/^\d{6}$/.test(form.pin))
      newErrors.pin = "Enter valid 6-digit PIN code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleCheckout = async () => {
    if (!validateForm()) return;
    setLoading(true);
  // console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);


    try {
       // ================= COD (NO Razorpay) =================
    if (paymentMethod === "COD") {
      await placeOrder({
        user: user.email,
        items: cart,
        shippingAddress: form,
        payment: "Cash on Delivery",
        paymentStatus: "Pending",
        date: new Date().toLocaleDateString(),
        total
      });

      setCart([]);
      navigate("/orders");
      return;
    }
      // 1️⃣ Create Razorpay order
      const razorOrder = await createRazorpayOrder(total);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: "INR",
        name: "Fruit Shop 🍎",
        description: "Fresh Fruits Order",
        order_id: razorOrder.id,

        handler: async response => {
          // 2️⃣ Verify payment
          const verify = await verifyRazorpayPayment({
            ...response,
            orderData: {
              user: user.email,
              items: cart,
              shippingAddress: form,
              total
            }
          });

          if (verify.success) {
            await placeOrder({
              user: user.email,
              items: cart,
              shippingAddress: form,
               payment: paymentMethod, 
               date: new Date().toLocaleDateString(),
              paymentId: response.razorpay_payment_id,
              total
            });
            setCart([]);
            navigate("/orders");
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: form.name,
          email: user.email,
          contact: form.phone
        },

        theme: { color: "#F59E0B" }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMPTY CART ---------------- */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold mb-2">
            Your cart is empty
          </h3>
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
        Secure Checkout
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* PERSONAL INFO */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-600" />
              Personal Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="border rounded-md px-3 py-2 w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="border rounded-md px-3 py-2 w-full bg-gray-100"
              />

              <div className="md:col-span-2">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="border rounded-md px-3 py-2 w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* SHIPPING */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gray-600" />
              Shipping Address
            </h3>

            <textarea
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              rows="3"
              placeholder="Complete Address *"
              className="w-full border rounded-md px-3 py-2 mb-2"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mb-2">{errors.address}</p>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City *"
                  className="border rounded-md px-3 py-2 w-full"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="state"
                  required
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State *"
                  className="border rounded-md px-3 py-2 w-full"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  name="pin"
                  required
                  value={form.pin}
                  onChange={handleChange}
                  placeholder="PIN Code *"
                  className="border rounded-md px-3 py-2 w-full"
                />
                {errors.pin && (
                  <p className="text-red-500 text-xs">{errors.pin}</p>
                )}
              </div>
            </div>
          </div>

          {/* PAYMENT */}
<div className="bg-white rounded-xl shadow-sm p-6">
  <h3 className="font-bold mb-3 flex items-center gap-2">
    <CreditCardIcon className="h-5 w-5 text-gray-600" />
    Payment Method
  </h3>

  <div className="space-y-3">

    {/* Razorpay */}
    <label className="flex items-center gap-3 bg-gray-50 border rounded-lg p-4 cursor-pointer">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === "Razorpay"}
        onChange={() => setPaymentMethod("Razorpay")}
      />
      <CreditCardIcon className="h-5 w-5 text-gray-600" />
      <span className="font-medium">
        Razorpay – UPI / Cards / NetBanking
      </span>
      <ShieldCheckIcon className="h-5 w-5 text-green-600 ml-auto" />
    </label>

    {/* COD */}
    <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
      <input
        type="radio"
        name="payment"
        checked={paymentMethod === "COD"}
        onChange={() => setPaymentMethod("COD")}
      />
      <span className="font-medium">Cash on Delivery</span>
    </label>

  </div>
</div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <h3 className="font-bold mb-4">Order Summary</h3>

          {cart.map(item => (
            <div key={item._id} className="flex gap-3 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded border object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
          >
            {loading
                ? "Placing Order..."
                : paymentMethod === "COD"
                ? "Place Order (Cash on Delivery)"
                : `Place Order & Pay ₹${total}`
            }

          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By placing order you agree to our Terms & Privacy Policy
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
