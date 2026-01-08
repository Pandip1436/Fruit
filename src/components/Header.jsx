/* eslint-disable react-hooks/set-state-in-effect */
import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "../pages/css/Header.css";

function Header({ cartCount }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo">🍎 Fruits Shop</Link>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* MENU */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-item" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/products" className="nav-item" onClick={() => setMenuOpen(false)}>
          Products
        </NavLink>

        <NavLink to="/about" className="nav-item" onClick={() => setMenuOpen(false)}>
          About
        </NavLink>

        <NavLink to="/contact" className="nav-item" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

        {user?.role === "admin" && (
          <button
            className="admin-btn"
            onClick={() => {
              navigate("/admin/productlist");
              setMenuOpen(false);
            }}
          >
            🛠 Admin Dashboard
          </button>
        )}

        <NavLink to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>

        {/* PROFILE */}
        {user ? (
          <div className="profile-wrapper" ref={dropdownRef}>
            <div
              className="profile-icon"
              onClick={() => setOpen(!open)}
            >
              👤
            </div>

            {open && (
              <div className="profile-dropdown">
                <p className="profile-name">Hi, {user.name}</p>

                {user.role === "user" && (
                  <NavLink to="/orders" className="nav-item1">
                    My Orders
                  </NavLink>
                )}

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="nav-item">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  cartCount: PropTypes.number.isRequired
};

export default Header;
