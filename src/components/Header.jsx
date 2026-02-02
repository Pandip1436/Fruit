/* eslint-disable react-hooks/set-state-in-effect */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function Header({ cartCount }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  useEffect(() => {
    const close = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-green-500 shadow-sm">
      <nav className="mx-auto max-w-8xl px-7">
        <div className="flex h-18 items-center justify-between">

          {/* LOGO (LEFT) */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            🍎 <span>Fruits Shop</span>
          </Link>

          {/* CENTER MENU (DESKTOP) */}
          <div className="hidden md:flex items-center font-bold  gap-10">
            {["/", "/products", "/about", "/contact", "/feedback"].map((path, i) => {
              const labels = ["Home", "Products", "About", "Contact","Feedback"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `text-xm font-medium transition ${
                      isActive
                        ? "text-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`
                  }
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">

            {/* ADMIN */}
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin/productlist")}
                className="hidden md:block rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
              >
                Admin
              </button>
            )}

            {/* CART */}
            <NavLink to="/cart" className="relative rounded-full  hover:bg-gray-100">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* PROFILE */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="rounded-full border p-2 hover:bg-gray-100"
                >
                  👤
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-44 rounded-lg bg-white shadow-lg border">
                    <p className="px-4 py-2 text-sm font-semibold text-gray-700">
                      Hi, {user.name}
                    </p>

                  
                      <NavLink
                        to="/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Orders
                      </NavLink>
                    

                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-yellow-600"
              >
                Login
              </NavLink>
            )}

            {/* HAMBURGER (MOBILE) */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col gap-4 px-6 py-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/feedback" onClick={() => setMenuOpen(false)}>Feedback</NavLink>

            {user?.role === "admin" && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/productlist");
                }}
                className="rounded-md bg-yellow-500 px-4 py-2 text-white"
              >
                Admin Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  cartCount: PropTypes.number.isRequired
};

export default Header;
