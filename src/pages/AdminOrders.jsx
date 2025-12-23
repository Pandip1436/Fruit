/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/AdminDashboard.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = orders.map(o =>
      o.id === id ? { ...o, status } : o
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const filteredOrders = orders.filter(
    o =>
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toString().includes(search)
  );

  return (
    <div className="admin-orders-page">
      <h2 className="page-title">📦 Orders Management</h2>

      {/* SEARCH */}
      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Search by order ID or user email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user}</td>
                  <td className="price">₹{order.total}</td>

                  <td>
                    <select
                      className={`status-select ${order.status.toLowerCase()}`}
                      value={order.status}
                      onChange={e =>
                        updateStatus(order.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
