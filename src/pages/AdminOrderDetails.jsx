import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOrders } from "../services/api";

function AdminOrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  /* ---------------- LOAD ORDER FROM BACKEND ---------------- */
  useEffect(() => {
    fetchOrders().then(allOrders => {
      const found = allOrders.find(o => o._id === orderId);
      setOrder(found);
    });
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-6xl mx-auto">

      <h2 className="text-2xl font-bold mb-6">
        🧾 Order Details
      </h2>

      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <p className="text-gray-500 text-sm">Order ID</p>
          <p className="font-semibold">#{order._id}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">User</p>
          <p className="font-semibold">{order.user}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="font-semibold">{order.date}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <span
            className={`inline-block px-31 py-1 rounded-full text-sm font-medium 
              ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700 "
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {order.status}
          </span>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="font-bold text-lg text-green-700">
            ₹{order.total}
          </p>
        </div>

        {order.payment && (
          <div>
            <p className="text-gray-500 text-sm">Payment</p>
            <p className="font-semibold">{order.payment}</p>
          </div>
        )}
      </div>

      {/* ITEMS */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          📦 Ordered Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
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
              {order.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {item.name}
                  </td>
                  <td className="px-4 py-2">
                    ₹{item.price}
                  </td>
                  <td className="px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 font-semibold">
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
        className="inline-block bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-md font-medium transition"
      >
        ← Back to Orders
      </Link>
    </div>
  );
}

export default AdminOrderDetails;
