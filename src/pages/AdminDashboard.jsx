import { NavLink, Outlet } from "react-router-dom";
import "../pages/css/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2>🛠 Admin</h2>
        <NavLink to="/admin" end className="admin-link">
          📊 Dashboard
        </NavLink>

        <NavLink to="productlist" className="admin-link">
          📦 Product List
        </NavLink>

        <NavLink to="add" className="admin-link">
          ➕ Add Product
        </NavLink>

        <NavLink to="/admin/users" className="admin-link">
           👤 Users
        </NavLink>

        <NavLink to="/admin/orders" className="admin-link">
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
