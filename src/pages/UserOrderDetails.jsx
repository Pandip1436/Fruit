import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../pages/css/UserOrders.css";

function UserOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState("");

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(
    o => o.id.toString() === orderId && o.user === user.email
  );

  if (!order) {
    return <p className="empty-orders">Order not found</p>;
  }

  // CANCEL ORDER
  const confirmCancelOrder = () => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, status: "Cancelled" } : o
    );

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setShowConfirm(false);
    setToast("✅ Order cancelled successfully");

    setTimeout(() => {
      navigate("/orders");
    }, 1500);
  };

  return (
    <div className="order-details-page">
      {/* TOAST */}
      {toast && <div className="toast-success">{toast}</div>}

      <h2 className="page-title">🧾 Order Details</h2>

      {/* SUMMARY */}
      <div className="order-summary-card">
        <div>
          <p>Order ID</p>
          <span>#{order.id}</span>
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
      </div>

      {/* TIMELINE */}
      {order.status !== "Cancelled" && (
        <div className="order-timeline">
          <div className={`timeline-step ${order.status !== "Pending" ? "done" : "active"}`}>
            <span>🕒</span>
            <p>Order Placed</p>
          </div>

          <div className={`timeline-line ${["Shipped", "Delivered"].includes(order.status) ? "done" : ""}`} />

          <div className={`timeline-step ${order.status === "Shipped" ? "active" : order.status === "Delivered" ? "done" : ""}`}>
            <span>🚚</span>
            <p>Shipped</p>
          </div>

          <div className={`timeline-line ${order.status === "Delivered" ? "done" : ""}`} />

          <div className={`timeline-step ${order.status === "Delivered" ? "done" : ""}`}>
            <span>📦</span>
            <p>Delivered</p>
          </div>
        </div>
      )}

      {/* CANCELLED BANNER */}
      {order.status === "Cancelled" && (
        <div className="cancelled-banner">
          ❌ This order has been cancelled
        </div>
      )}

      {/* ITEMS */}
      <div className="order-items-card">
        <h3>📦 Items</h3>

        <table className="items-table">
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

      {/* ACTIONS */}
      <div className="order-actions">
        {order.status === "Pending" && (
          <button
            className="cancel-btn"
            onClick={() => setShowConfirm(true)}
          >
            ❌ Cancel Order
          </button>
        )}

        
      </div>
      <Link to="/orders" className="back-link">
          ← Back to My Orders
        </Link>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Cancel Order?</h3>
            <p>Are you sure you want to cancel this order?</p>

            <div className="confirm-actions">
              <button className="confirm-btn" onClick={confirmCancelOrder}>
                Yes, Cancel
              </button>
              <button
                className="cancel-outline-btn"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrderDetails;
