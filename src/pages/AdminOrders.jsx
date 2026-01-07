/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  /* ---------------- LOAD ORDERS FROM BACKEND ---------------- */
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
    <div className="min-h-screen bg-gray-50 p-6">
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

      {/* TABLE */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            No orders found
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  User
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* SERIAL NUMBER */}
                  <td className="px-4 py-3 font-medium">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    #{order._id}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {order.user}
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-700">
                    ₹{order.total}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={e =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-md text-sm font-medium border focus:outline-none
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : order.status === "Delivered"
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
      )}
    </div>
  );
}

export default AdminOrders;
