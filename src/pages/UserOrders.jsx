/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../services/api";

function UserOrders() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchOrders().then(data => {
      setOrders(data.filter(o => o.user === user.email));
    });
  }, [user]);

  const toggleStatus = status => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const removeChip = status => {
    setStatusFilter(prev => prev.filter(s => s !== status));
  };

  const clearFilters = () => {
    setStatusFilter([]);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some(item =>
          item?.name?.toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(order.status);

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <p className="text-gray-700 text-lg font-semibold">
          Please login to view orders
        </p>
      </div>
    );
  }

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
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-3">My Orders</h1>

          <div className="flex bg-white rounded-lg overflow-hidden shadow">
            <input
              type="text"
              placeholder="Search by product or order ID"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-indigo-600 px-4 sm:px-6 text-sm font-semibold">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY FILTER BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-white shadow px-4 py-2 flex justify-between items-center">
        <span className="font-semibold text-sm">
          Filters {statusFilter.length > 0 && `(${statusFilter.length})`}
        </span>
        <button
          onClick={() => setShowFilters(true)}
          className="text-indigo-600 font-semibold text-sm"
        >
          Open
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">

        {/* FILTER CHIPS */}
        {statusFilter.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2 transition-all duration-300">
            {statusFilter.map(status => (
              <span
                key={status}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColor(status)} transition transform hover:scale-105`}
              >
                {status}
                <button
                  onClick={() => removeChip(status)}
                  className="text-xs font-bold"
                >
                  ✕
                </button>
              </span>
            ))}

            <button
              onClick={clearFilters}
              className="text-sm text-red-600 font-semibold ml-2 hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        {/* PREMIUM DESKTOP FILTERS (STICKY) */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg p-5 mb-5 md:float-left md:w-1/4 md:mr-6 md:sticky md:top-20 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            {statusFilter.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-3 uppercase font-bold tracking-wide">
            Order Status
          </p>

          <div className="grid grid-cols-2 gap-2">
            {["Pending", "Shipped", "Delivered", "Cancelled"].map(status => {
              const active = statusFilter.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`px-3 py-2 rounded-full text-sm font-medium border transition-all duration-300 transform
                    ${
                      active
                        ? "bg-indigo-600 text-white border-indigo-600 shadow scale-105"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:scale-105"
                    }
                  `}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {statusFilter.length > 0 && (
            <div className="mt-4 text-sm text-gray-600 transition-all duration-300">
              Showing{" "}
              <span className="font-semibold">
                {statusFilter.length}
              </span>{" "}
              filter{statusFilter.length > 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* ORDERS LIST */}
        <div className="md:ml-[27%] space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-xl shadow">
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row gap-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={order.items?.[0]?.image || "/placeholder.png"}
                  alt=""
                  className="w-full sm:w-24 h-32 sm:h-24 object-contain bg-gray-50 rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-bold mb-1">
                    {order.items?.[0]?.name || "Product"}
                  </h3>

                  <p className="text-xs text-gray-500 mb-1 break-all">
                    Order ID: {order._id}
                  </p>

                  <p className="text-xs text-gray-500">
                    Payment: {order.payment}
                  </p>

                 <p> <Link
                    to={`/orders/${order._id}`}
                    className="inline-block mt-3 text-sm text-indigo-600 font-medium hover:underline"
                  >
                    View Details →
                  </Link></p>
                </div>

                <div className="sm:text-right">
                  <p className="font-bold text-lg mb-2">
                    ₹{order.total}
                  </p>

                  <p><span
                    className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${statusColor(order.status)}`}
                  >
                    {order.status}
                  </span></p>

                  <p className="text-xs text-gray-400 mt-1">
                    {order.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MOBILE SLIDE FILTER PANEL (ANIMATED FIXED) */}
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          showFilters ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="flex-1 "
          onClick={() => setShowFilters(false)}
        />

        <div
          className={`w-72 bg-white p-5 shadow-xl transform transition-transform duration-300 ${
            showFilters ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h3 className="font-semibold text-lg mb-4">Filters</h3>

          {["Pending", "Shipped", "Delivered", "Cancelled"].map(status => (
            <label
              key={status}
              className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={statusFilter.includes(status)}
                onChange={() => toggleStatus(status)}
                className="accent-indigo-600"
              />
              <span className="text-gray-700">{status}</span>
            </label>
          ))}

          <div className="mt-5 flex gap-3">
            <button
              onClick={clearFilters}
              className="flex-1 border border-red-500 text-red-600 py-2 rounded-lg"
            >
              Clear
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrders;
