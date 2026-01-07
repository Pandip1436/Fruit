import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../services/api";

const STATUS_STEPS = ["Pending", "Shipped", "Delivered"];

function UserOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [order, setOrder] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState("");

  /* ---------------- REAL-TIME FETCH ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadOrder = async () => {
      const orders = await fetchOrders();
      const found = orders.find(
        o => o._id === orderId && o.user === user.email
      );
      if (found) setOrder(found);
    };

    loadOrder();
    const interval = setInterval(loadOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId, user]);

  /* ---------------- STATUS TOAST ---------------- */
  useEffect(() => {
    if (!order) return;
    setToast(`📦 Order status: ${order.status}`);
    const t = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(t);
  }, [order?.status]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Order not found</p>
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(order.status);

  const cancelOrder = async () => {
    await updateOrderStatus(order._id, "Cancelled");
    setOrder({ ...order, status: "Cancelled" });
    setShowConfirm(false);
    setTimeout(() => navigate("/orders"), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 max-w-5xl mx-auto">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow z-50">
          {toast}
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
        🧾 Order Details
      </h2>

      {/* SUMMARY */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
        <div>
          <p className="text-gray-500">Order ID</p>
          <p className="font-semibold break-all">#{order._id}</p>
        </div>
        <div>
          <p className="text-gray-500">Date</p>
          <p className="font-semibold">{order.date}</p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
            {order.status}
          </span>
        </div>
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-bold">₹{order.total}</p>
        </div>
      </div>

      {/* ORDER PROGRESS */}
      {order.status !== "Cancelled" && (
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h3 className="font-semibold mb-4">📦 Order Progress</h3>

          {/* 📱 MOBILE – VERTICAL */}
          <div className="flex flex-col gap-4 sm:hidden">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;

              return (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                          ? "bg-green-500 text-white animate-pulse"
                          : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              );
            })}
          </div>

          {/* 💻 DESKTOP – HORIZONTAL */}
          <div className="hidden sm:flex items-center justify-between">
            {STATUS_STEPS.map((step, index) => {
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;

              return (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`w-30 h-10 rounded-full  flex items-center justify-center font-bold
                      ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                          ? "bg-green-500 text-white animate-pulse"
                          : "bg-gray-300 text-gray-600"
                      }`}
                  >
                    {/* {index + 1} */}
                  <span className="text-sm">{step}</span>

                  </div>

                  {index !== STATUS_STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded
                        ${isCompleted ? "bg-green-600" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ITEMS */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h3 className="font-semibold mb-3">📦 Items</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Qty</th>
                <th className="text-left p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item._id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">₹{item.price}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2 font-semibold">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACTION */}
      {order.status === "Pending" && (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 rounded-md"
        >
          ❌ Cancel Order
        </button>
      )}

      <Link
        to="/orders"
        className="block text-center mt-6 text-green-600 font-medium"
      >
        ← Back to My Orders
      </Link>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-72 text-center">
            <p className="mb-4">Cancel this order?</p>
            <div className="flex gap-3">
              <button
                onClick={cancelOrder}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border py-2 rounded"
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
