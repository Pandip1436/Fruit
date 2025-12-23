/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "../pages/css/AdminDashboard.css"

function AdminHome() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const revenue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );

    setStats({
      users: users.length,
      products: products.length,
      orders: orders.length,
      revenue
    });
  }, []);

  return (
    <>
      <h2>📊 Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.orders}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.revenue}</p>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
