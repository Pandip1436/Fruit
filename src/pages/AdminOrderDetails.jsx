import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrders } from "../services/api";

function AdminOrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  /* ---------------- LOAD ORDER ---------------- */
  useEffect(() => {
    fetchOrders().then(allOrders => {
      const found = allOrders.find(o => o._id === orderId);
      setOrder(found);
    });
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
        <p className="text-gray-700 text-lg font-semibold">
          Order not found
        </p>
      </div>
    );
  }

  const statusColor =
    order.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : order.status === "Shipped"
      ? "bg-blue-100 text-blue-700"
      : order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">

      {/* HEADER */}
      <div className="bg-linear-to-r from-emerald-600 to-green-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <h2 className="text-2xl font-bold">🧾 Order Details</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-5">

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Info label="Order ID" value={`#${order._id}`} />
          <Info label="User" value={order.user} />
          <Info label="Date" value={order.date} />

          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor}`}
            >
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Total</p>
            <p className="font-bold text-xl text-green-700">
              ₹{order.total}
            </p>
          </div>

          {order.payment && (
            <Info label="Payment Method" value={order.payment} />
          )}
        </div>

        {/* DELIVERY ADDRESS */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">
            🏠 Delivery Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-semibold">
                {order.shippingAddress?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-semibold">
                {order.shippingAddress?.phone || "N/A"}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-gray-500 text-sm">Address</p>
              <p className="font-semibold">
                {order.shippingAddress?.address || ""}
                {order.shippingAddress?.city &&
                  `, ${order.shippingAddress.city}`}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">State</p>
              <p className="font-semibold">
                {order.shippingAddress?.state || ""}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Pincode</p>
              <p className="font-semibold">
                {order.shippingAddress?.pin || ""}
              </p>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">
            📦 Ordered Items
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-2 text-sm font-semibold">
                    Product
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-semibold">
                    Price
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-semibold">
                    Qty
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-semibold">
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-2">
                      ₹{item.price}
                    </td>
                    <td className="px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-2 font-semibold text-green-700">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BACK */}
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg font-semibold transition"
        >
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
}

/* ===== SMALL INFO COMPONENT ===== */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default AdminOrderDetails;
