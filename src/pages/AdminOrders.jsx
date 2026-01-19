/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  /* ---------------- LOAD ORDERS ---------------- */
  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(prev =>
      prev.map(o => (o._id === id ? { ...o, status } : o))
    );
  };

  /* ---------------- SEARCH ---------------- */
  const filteredOrders = orders.filter(
    o =>
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o._id.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">
        📦 Orders Management
      </h2>

      {/* SEARCH */}
      <div className="mb-6 max-w-md">
        <input
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by order ID or user email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            No orders found
          </p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">S.No</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      #{order._id}
                    </td>
                    <td className="px-4 py-3">{order.user}</td>
                    <td className="px-4 py-3 font-semibold text-green-700">
                      ₹{order.total}
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        status={order.status}
                        onChange={s => updateStatus(order._id, s)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">S.No:</span>
                  <span>{index + 1}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Order ID:</span>
                  <span>#{order._id}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold">User:</span>
                  <span>{order.user}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total:</span>
                  <span className="text-green-700 font-bold">
                    ₹{order.total}
                  </span>
                </div>

                <div>
                  <p className="font-semibold text-sm mb-1">Status</p>
                  <StatusSelect
                    status={order.status}
                    onChange={s => updateStatus(order._id, s)}
                  />
                </div>

                <Link
                  to={`/admin/orders/${order._id}`}
                  className="block text-center bg-green-600 text-white py-2 rounded-md font-medium"
                >
                  View Order
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ================= STATUS SELECT ================= */
function StatusSelect({ status, onChange }) {
  return (
    <select
      value={status}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-3 py-2 rounded-md text-sm font-medium border
        ${
          status === "Pending"
            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
            : status === "Shipped"
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : status === "Delivered"
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-red-100 text-red-700 border-red-300"
        }
      `}
    >
      <option>Pending</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
  );
}

export default AdminOrders;
