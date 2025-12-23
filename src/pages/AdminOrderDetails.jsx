import { useParams, Link } from "react-router-dom";
import "../pages/css/AdminDashboard.css";

function AdminOrderDetails() {
  const { orderId } = useParams();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id.toString() === orderId);

  if (!order) {
    return <p className="empty-state">Order not found</p>;
  }

  return (
    <div className="admin-order-details">
      <h2 className="page-title">🧾 Order Details</h2>

      {/* ORDER SUMMARY */}
      <div className="admin-order-summary">
        <div>
          <p>Order ID</p>
          <span>#{order.id}</span>
        </div>

        <div>
          <p>User</p>
          <span>{order.user}</span>
        </div>

        <div>
          <p>Date</p>
          <span>{order.date}</span>
        </div>

        <div>
          <p>Status</p>
          <span className={`status-badge ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        <div>
          <p>Total</p>
          <span className="order-total">₹{order.total}</span>
        </div>

        {order.payment && (
          <div>
            <p>Payment</p>
            <span>{order.payment}</span>
          </div>
        )}
      </div>

      {/* ITEMS */}
      <div className="admin-items-card">
        <h3>📦 Ordered Items</h3>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BACK */}
      <Link to="/admin/orders" className="back-btn">
        ← Back to Orders
      </Link>
    </div>
  );
}

export default AdminOrderDetails;
