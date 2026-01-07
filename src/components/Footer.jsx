import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            🍎 FRUITS SHOP
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            The customer is at the heart of our business model,
            which includes fresh fruits and quality service.
          </p>

          <div className="flex gap-4 text-lg">
            <i className="fab fa-facebook-f hover:text-white cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
            <i className="fab fa-pinterest-p hover:text-white cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-white cursor-pointer"></i>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            QUICK LINKS
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* HELP & INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            HELP & INFO
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/cart" className="hover:text-white">Track Your Order</Link></li>
            <li><Link to="/cart" className="hover:text-white">Returns & Exchanges</Link></li>
            <li><Link to="/cart" className="hover:text-white">Shipping & Delivery</Link></li>
            <li><Link to="/cart" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            CONTACT US
          </h3>

          <p className="text-sm mb-2">
            Do you have any questions?
          </p>

          <p className="text-sm text-green-400 mb-2 break-all">
            support@myfruitsshop.com
          </p>

          <p className="text-sm">
            📞 +91 80565 64775
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} My Fruits Shop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
