/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const updateStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders(prev =>
      prev.map(o => (o._id === id ? { ...o, status } : o))
    );
  };

  const filteredOrders = orders.filter(
    o =>
      o.user.toLowerCase().includes(search.toLowerCase()) ||
      o._id.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">📦 Orders Management</h2>

        <input
          className="w-full md:w-80 px-4 py-2 bg-white rounded-lg text-gray-800 outline-none"
          placeholder="Search by order ID or user email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
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
                    <td className="px-4 py-3 text-sm">
                      {order.user}
                    </td>
                    <td className="px-4 py-3 font-bold text-green-700">
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
                        className="text-emerald-600 font-semibold hover:underline"
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
                <Row label="S.No" value={index + 1} />
                <Row label="Order ID" value={`#${order._id}`} />
                <Row label="User" value={order.user} />
                <Row
                  label="Total"
                  value={`₹${order.total}`}
                  valueClass="text-green-700 font-bold"
                />

                <div>
                  <p className="text-sm font-semibold mb-1">Status</p>
                  <StatusSelect
                    status={order.status}
                    onChange={s => updateStatus(order._id, s)}
                  />
                </div>

                <Link
                  to={`/admin/orders/${order._id}`}
                  className="block text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold"
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

/* ================= SMALL ROW COMPONENT ================= */
function Row({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-semibold text-gray-600">{label}:</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

/* ================= STATUS SELECT ================= */
function StatusSelect({ status, onChange }) {
  const base =
    "w-full px-3 py-2 rounded-lg text-sm font-semibold border focus:outline-none";

  const color =
    status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : status === "Shipped"
      ? "bg-blue-100 text-blue-700 border-blue-300"
      : status === "Delivered"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";

  return (
    <select
      value={status}
      onChange={e => onChange(e.target.value)}
      className={`${base} ${color}`}
    >
      <option>Pending</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
  );
}

export default AdminOrders;
