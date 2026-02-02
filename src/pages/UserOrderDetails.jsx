/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../services/api";

const STATUS_TEXT = {
  Pending: "On the way",
  Shipped: "On the way",
  Delivered: "Delivered",
  Cancelled: "Cancelled"
};

const TRACK_STEPS = ["Order Placed", "On the way", "Delivered"];

function UserOrderDetails() {
  const { orderId } = useParams();

  // 1. SAFE USER LOADING
  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("loggedInUser");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmCancel, setConfirmCancel] = useState(false);

  // 2. DATA FETCHING
  useEffect(() => {
    if (!user?.email || !orderId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchOrders()
      .then(data => {
        const found = data.find(
          o => o._id === orderId && o.user === user.email
        );
        if (found) {
          setOrder(found);
        }
      })
      .catch(err => console.error("Error fetching order:", err))
      .finally(() => setLoading(false));
  }, [orderId, user?.email]);

  // 3. HELPERS
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700",
      Shipped: "bg-blue-100 text-blue-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const currentStep =
    order?.status === "Delivered" ? 2 :
    order?.status === "Shipped" ? 1 : 0;

  const handleCancelOrder = async () => {
    try {
      await updateOrderStatus(order._id, "Cancelled");
      setOrder(prev => ({ ...prev, status: "Cancelled" }));
      setConfirmCancel(false);
    } catch (err) {
      alert("Failed to cancel order. Please try again.");
    }
  };

  // 4. RENDER STATES
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <p className="text-gray-600 text-lg font-medium">Order not found.</p>
        <Link to="/orders" className="mt-4 text-indigo-600 font-bold hover:underline">
          Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      {/* HEADER BREADCRUMB */}
      <div className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm opacity-90">
            <Link to="/orders" className="font-semibold hover:underline">My Orders</Link> 
            <span className="mx-2">›</span> Order Details
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* PRODUCT CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row gap-5">
            <img
              src={order.items?.[0]?.image || "https://placehold.co/150"}
              alt=""
              className="w-full sm:w-32 h-32 object-contain bg-gray-50 rounded-lg border border-gray-100 p-2"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">
                {order.items?.[0]?.name || "Product Name"}
              </h2>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">ID: {order._id}</p>
              <p className="text-2xl font-black text-gray-900 mt-3">₹{order.total?.toLocaleString()}</p>
            </div>
            <div className="sm:text-right">
             <p> <span className={`inline-block rounded-full px-4 py-1 text-xs font-bold ${getStatusColor(order.status)}`}>
                {STATUS_TEXT[order.status]}
              </span></p>
              <p className="text-xs text-gray-400 mt-2">{formatDate(order.date || order.createdAt)}</p>
              {order.status === "Delivered" && (
                <button className="text-xs text-indigo-600 font-bold mt-3 block w-full sm:w-auto hover:bg-indigo-50 px-2 py-1 rounded">
                  ★ Rate & Review
                </button>
              )}
            </div>
          </div>

          {/* TRACKING VISUALIZER */}
          {order.status !== "Cancelled" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-6">Order Status</h3>
              <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {TRACK_STEPS.map((step, index) => (
                  <div key={step} className="relative">
                    <div className={`absolute -left-8 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 transition-colors duration-500 ${
                      index <= currentStep ? "bg-green-500" : "bg-gray-300"
                    }`} />
                    <div>
                      <p className={`text-sm font-bold ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>
                        {step}
                      </p>
                      {index <= currentStep && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Completed on {formatDate(order.date || order.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ITEMIZED BILL */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Items Summary</h3>
            <div className="divide-y">
              {order.items?.map(item => (
                <div key={item._id} className="flex justify-between py-3 text-sm">
                  <div className="pr-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-gray-900 py-3 whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CANCEL BUTTON */}
          {order.status === "Pending" && (
            <button
              onClick={() => setConfirmCancel(true)}
              className="w-full sm:w-auto bg-white border-2 border-red-500 text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-50 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* SHIPPING INFO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              📍 Delivery Address
            </h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p className="font-bold text-gray-900">{order.shippingAddress?.name || "N/A"}</p>
              <p>{order.shippingAddress?.address || ""}</p>
              <p>{order.shippingAddress?.city}{order.shippingAddress?.state ? `, ${order.shippingAddress.state}` : ""} - {order.shippingAddress?.pin}</p>
              <p className="pt-2 font-medium text-gray-900">📞 {order.shippingAddress?.phone || "N/A"}</p>
            </div>
          </div>

          {/* PAYMENT INFO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              💳 Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="font-medium">{order.payment || "Online"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-bold uppercase text-[10px]">Paid</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold text-gray-800">Total Amount</span>
                <span className="font-black text-gray-900 text-lg">₹{order.total?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CANCEL MODAL */}
      {confirmCancel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              ⚠️
            </div>
            <h4 className="text-xl font-bold mb-2">Cancel Order?</h4>
            <p className="text-gray-500 text-sm mb-6">
              This action cannot be undone. Are you sure you want to cancel this order?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancel(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                No, Keep
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrderDetails;