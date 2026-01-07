/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../services/api";

function UserOrders() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [orders, setOrders] = useState([]);

  /* ---------------- LOAD USER ORDERS FROM BACKEND ---------------- */
  useEffect(() => {
    if (!user) return;

    fetchOrders().then(data => {
      setOrders(data.filter(o => o.user === user.email));
    });
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Please login to view orders
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧾 My Orders
      </h2>

      {orders.length === 0 ? (
        /* EMPTY STATE */
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">
            No orders found
          </p>
        </div>
      ) : (
        /* ORDERS TABLE */
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold">
                  Order ID
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold">
                  Total
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    #{order._id}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    ₹{order.total}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/orders/${order._id}`}
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

export default UserOrders;
