import { Link } from "react-router-dom";
import "../pages/css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h2 className="footer-logo">🍎 FRUITS SHOP</h2>
          <p className="footer-text">
            The customer is at the heart of our business model,
            which includes fresh fruits and quality service.
          </p>

          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest-p"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>QUICK LINKS</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* HELP & INFO */}
        <div className="footer-col">
          <h3>HELP & INFO</h3>
          <Link to="/cart">Track Your Order</Link>
          <Link to="/cart">Returns & Exchanges</Link>
          <Link to="/cart">Shipping & Delivery</Link>
          <Link to="/cart">FAQst</Link>
          
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>CONTACT US</h3>
          <p>Do you have any questions?</p>
          <p className="contact-email">support@myfruitsshop.com</p>

          <p className="contact-phone">
            📞 +91 80565 64775
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} My Fruits Shop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
