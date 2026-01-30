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

  
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  }, []);

  const [order, setOrder] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetchOrders().then(data => {
      const found = data.find(
        o => o._id === orderId && o.user === user.email
      );
      if (found) setOrder(found);
    });
  }, [orderId, user?.email]); 

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <p className="text-gray-700 font-semibold">
          Loading order details...
        </p>
      </div>
    );
  }

  const currentStep =
    order.status === "Delivered" ? 2 :
    order.status === "Shipped" ? 1 : 0;

  const cancelOrder = async () => {
    await updateOrderStatus(order._id, "Cancelled");
    setOrder(prev => ({ ...prev, status: "Cancelled" }));
    setConfirmCancel(false);
  };

  const statusColor = status => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <p className="text-xs sm:text-sm">
            <Link to="/orders" className="font-semibold hover:underline">
              My Orders
            </Link>{" "}
            › Order Details
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">

          {/* PRODUCT */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
            <img
              src={order.items?.[0]?.image || "/placeholder.png"}
              alt=""
              className="w-full sm:w-28 h-32 sm:h-28 object-contain bg-gray-50 rounded-lg"
            />

            <div className="flex-1">
              <h2 className="text-sm sm:text-base font-bold">
                {order.items?.[0]?.name || "Product"}
              </h2>

              <p className="text-xs text-gray-500 mt-1 break-all">
                Order ID: {order._id}
              </p>

              <p className="text-lg font-bold mt-2">
                ₹{order.total}
              </p>
            </div>

            <div className="sm:text-right">
              <p
                className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(order.status)}`}
              >
                {STATUS_TEXT[order.status]}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {order.date}
              </p>

              {order.status === "Delivered" && (
                <p className="text-xs text-indigo-600 mt-2 cursor-pointer hover:underline">
                  ★ Rate & Review
                </p>
              )}
            </div>
          </div>

          {/* TRACKING */}
          {order.status !== "Cancelled" && (
            <div className="bg-white rounded-xl shadow p-4 sm:p-5">
              <h3 className="font-semibold mb-3">Order Tracking</h3>

              <div className="space-y-5">
                {TRACK_STEPS.map((step, index) => (
                  <div key={step} className="flex gap-3 items-start">
                    <div
                      className={`w-3 h-3 rounded-full mt-1
                        ${
                          index <= currentStep
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium
                          ${
                            index <= currentStep
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                      >
                        {step}
                      </p>
                      {index <= currentStep && (
                        <p className="text-xs text-gray-400">
                          {order.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ITEMS */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-5">
            <h3 className="font-semibold mb-3">Items</h3>

            {order.items?.map(item => (
              <div
                key={item._id}
                className="flex justify-between gap-3 border-b py-2 text-sm last:border-b-0"
              >
                <span className="truncate">{item.name}</span>
                <span className="font-medium whitespace-nowrap">
                  ₹{item.price} × {item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* CANCEL */}
          {order.status === "Pending" && (
            <button
              onClick={() => setConfirmCancel(true)}
              className="w-full sm:w-auto border border-red-500 text-red-600 px-5 py-2 text-sm rounded-lg hover:bg-red-50"
            >
              Cancel Order
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* ADDRESS */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-5">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p className="text-sm font-medium">
              {order.shippingAddress?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.address || ""}
              {order.shippingAddress?.city &&
                `, ${order.shippingAddress.city}`}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.state || ""}{" "}
              {order.shippingAddress?.pin || ""}
            </p>
            <p className="text-sm text-gray-600">
              Phone: {order.shippingAddress?.phone || "N/A"}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-xl shadow p-4 sm:p-5">
            <h3 className="font-semibold mb-2">Payment Details</h3>
            <p className="text-sm text-gray-600">
              Method: {order.payment || "Online"}
            </p>
            <p className="text-sm font-semibold mt-1">
              Amount Paid: ₹{order.total}
            </p>
            <p className="text-xs text-gray-400 mt-2 break-all">
              Payment ID: {order.paymentId || "Cash on Delivery"}
            </p>
          </div>
        </div>
      </div>

      {/* CONFIRM CANCEL MODAL */}
      {confirmCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-sm text-center shadow-lg">
            <p className="mb-4 text-sm font-medium">
              Are you sure you want to cancel this order?
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelOrder}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmCancel(false)}
                className="flex-1 border py-2 rounded-lg"
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
