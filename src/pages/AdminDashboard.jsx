import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "../pages/css/AdminDashboard.css";

function AdminDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* MOBILE TOP BAR */}
      <header className="admin-topbar">
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <h2>🛠 Admin Panel</h2>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">🛠 Admin</h2>

        <NavLink to="/admin" end className="admin-link" onClick={() => setOpen(false)}>
          📊 Dashboard
        </NavLink>

        <NavLink to="productlist" className="admin-link" onClick={() => setOpen(false)}>
          📦 Product List
        </NavLink>

        <NavLink to="add" className="admin-link" onClick={() => setOpen(false)}>
          ➕ Add Product
        </NavLink>

        <NavLink to="/admin/users" className="admin-link" onClick={() => setOpen(false)}>
          👤 Users
        </NavLink>

        <NavLink to="/admin/orders" className="admin-link" onClick={() => setOpen(false)}>
          📦 Orders
        </NavLink>
      </aside>

      {/* CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
