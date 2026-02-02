/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts } from "../services/api";
import { motion } from "framer-motion";

import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";

function Landing({ cart, setCart, showToast }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setProducts);
  }, []);

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
    <div className="bg-linear-to-b from-green-50 via-white to-green-100 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 mb-6 rounded-full bg-green-100 px-5 py-1.5 text-sm font-semibold text-green-700 shadow">
            <SparklesIcon className="h-4 w-4" />
            100% Farm Fresh Fruits
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Healthy Living <br />
            <span className="bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Starts With Fresh Fruits
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl">
            Hand-picked fruits with premium quality, hygienic packing and fast delivery.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            {[ShieldCheckIcon, TruckIcon, CurrencyRupeeIcon, HeartIcon].map((Icon, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow text-sm text-gray-700"
              >
                <Icon className="h-5 w-5 text-green-600" />
                Trusted
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
            <Link
              to="/products"
              className="px-10 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:scale-105 hover:bg-green-700 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="px-10 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499"
            alt="Fresh Fruits"
            className="rounded-4xl shadow-2xl"
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

      {/* ================= ABOUT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">About Our Store</h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Fruit Shop is built with one simple promise — to bring you the freshest fruits directly from trusted farmers to your doorstep.

We believe that good health starts with good food. That’s why every fruit we deliver is carefully hand-picked, quality checked, and hygienically packed before reaching your home. From juicy apples and sweet mangoes to seasonal local produce, we ensure that every order meets our high standards of freshness and taste.
        </p>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-green-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Farm Direct", text: "Sourced directly from farmers." },
              { title: "Hygienic Packing", text: "Clean & safe packaging." },
              { title: "Fast Delivery", text: "Quick doorstep delivery." }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition"
              >
                <CheckBadgeIcon className="h-12 w-12 text-green-600 mx-auto mb-5" />
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <h2 className="text-4xl font-bold text-center mb-16">
          Featured Fruits
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {products.map(product => (
            <div
              key={product._id}
              className="group relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-green-400 to-emerald-500" />

              <div className="relative h-40 sm:h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="mt-1 text-green-600 font-bold">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-xl bg-green-600 py-2 text-white hover:bg-green-700 transition text-sm md:hidden"
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

      {/* ================= MAP LOCATION ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Visit Our Fruit Shop 🍎
            </h2>
            <p className="text-gray-600 mb-4">
              157-F, Sivakasi to Srivilliputhur Main Road,<br />
              Opposite Malli Police Station,<br />
              Malli – 626141, Tamil Nadu, India
            </p>

            <div className="flex items-center gap-3 mb-2">
              <PhoneIcon className="h-5 w-5 text-green-600" />
              <span>+91 80565 64775</span>
            </div>

            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-green-600" />
              <span>fruitshop@gmail.com</span>
            </div>
          </div>

          <div className="w-full h-90 rounded-4xl overflow-hidden shadow-xl border">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps?q=Malli%20Police%20Station&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-green-600 text-white rounded-xl hover:scale-105 hover:bg-green-700 transition shadow-lg"
          >
            View Contact Details
          </Link>
        </div>
      </section>

    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl hover:-translate-y-2 transition">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-green-600 mt-3">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

export default Landing;
