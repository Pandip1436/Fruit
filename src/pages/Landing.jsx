import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts } from "../services/api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon,
  PhoneIcon
} from "@heroicons/react/24/solid";

function Landing({ cart, setCart, showToast }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setProducts);
  }, []);

  /* ---------------- ADD TO CART ---------------- */
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

    showToast("Added to cart", "success");
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-5 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            <SparklesIcon className="h-4 w-4" />
            100% Farm Fresh
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Fresh Fruits <br />
            <span className="text-green-600">Delivered to Your Door</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-lg">
            Hand-picked fruits with premium quality, hygienic packing
            and lightning-fast delivery.
          </p>

          {/* TRUST PILLS */}
          <div className="mt-8 flex flex-wrap gap-4 max-w-md">
            {[
              { icon: ShieldCheckIcon, text: "Quality Assured" },
              { icon: TruckIcon, text: "Fast Delivery" },
              { icon: CurrencyRupeeIcon, text: "Best Prices" },
              { icon: HeartIcon, text: "Customer Care" }
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm text-sm text-gray-600"
              >
                <item.icon className="h-5 w-5 text-green-600" />
                {item.text}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:scale-105 hover:bg-green-700 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499"
            alt="Fresh Fruits"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <Stat icon={<UsersIcon />} value="1000+" label="Happy Customers" />
          <Stat icon={<TruckIcon />} value="500+" label="Orders Delivered" />
          <Stat icon={<ShieldCheckIcon />} value="100%" label="Fresh Produce" />
          <Stat icon={<PhoneIcon />} value="24/7" label="Support" />

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 flex justify-center items-center gap-2">
          <SparklesIcon className="h-7 w-7 text-green-600" />
          Featured Fruits
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map(product => (
            <div
              key={product._id}
              className="group relative rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Accent */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-green-400 to-emerald-500" />

              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl transition group-hover:scale-105"
              />

              <div className="mt-5 text-center">
                <h3 className="font-semibold text-xl text-gray-800">
                  {product.name}
                </h3>

                <p className="mt-1 text-green-600 font-bold text-lg">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full rounded-xl bg-green-600 py-2 text-white font-medium transition hover:bg-green-700 hover:shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="inline-block px-12 py-4 bg-green-600 text-white rounded-xl hover:scale-105 hover:bg-green-700 transition shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </section>

    </div>
  );
}

/* ================= PREMIUM STAT CARD ================= */
function Stat({ icon, value, label }) {
  return (
    <div className="group relative rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-2 hover:shadow-xl">
      <div className="absolute inset-0 rounded-2xl bg-green-100 opacity-0 blur-lg transition group-hover:opacity-30" />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 shadow">
          {icon}
        </div>

        <h3 className="text-3xl font-bold text-green-600">
          {value}
        </h3>

        <p className="text-gray-600">
          {label}
        </p>
      </div>
    </div>
  );
}

export default Landing;
