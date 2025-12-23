/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/UserOrders.css"

function UserOrders() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(
      order => order.user === user.email
    );
    setOrders(userOrders);
  }, [user.email]);

  if (!user) {
    return <p>Please login to view orders</p>;
  }

  return (
    <div className="user-orders-page">
      <h2>🧾 My Orders</h2>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>₹{order.total}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/orders/${order.id}`}
                    className="view-btn"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserOrders;
