import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFeaturedProducts } from "../services/api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

    showToast("🛒 Added to cart", "success");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-linear-to-b from-green-50 to-white overflow-hidden">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Fresh Fruits <br />
            <span className="text-green-600">Delivered to Your Door</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-lg">
            Hand-picked farm-fresh fruits with premium quality, hygienic packing
            and lightning-fast delivery.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              to="/products"
              className="px-7 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:scale-105 hover:bg-green-700 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="px-7 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499"
            alt="Fruits"
            className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-white py-16 shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
          {[
            ["1000+", "Happy Customers"],
            ["500+", "Orders Delivered"],
            ["100%", "Fresh Produce"],
            ["24/7", "Support"]
          ].map(([value, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <h3 className="text-4xl font-bold text-green-600">{value}</h3>
              <p className="text-gray-600 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-gray-800 mb-14"
        >
          🍓 Featured Fruits
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl"
              />

              <div className="mt-4">
                <h3 className="font-semibold text-xl text-gray-800">
                  {product.name}
                </h3>
                <p className="text-green-600 font-bold mt-1 text-lg">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-green-600 text-white rounded-xl hover:scale-105 hover:bg-green-700 transition shadow-lg"
          >
            View All Products
          </Link>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-green-600 py-20 text-center text-white"
      >
        <h2 className="text-4xl font-extrabold">
          Eat Healthy. Live Better.
        </h2>
        <p className="mt-5 text-lg">
          Start your fresh journey with My Fruits Shop today 🍎
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 px-10 py-4 bg-white text-green-600 font-semibold rounded-xl hover:scale-110 transition"
        >
          Get Started
        </Link>
      </motion.section>
    </div>
  );
}

export default Landing;
