/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../services/api";

function UserOrders() {
  // 1. SAFE USER LOADING (Prevents crashes if localStorage is corrupted)
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem("loggedInUser");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // 2. FETCH DATA
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchOrders()
      .then((data) => {
        // Filter orders for the current user
        // Note: Ideally, the backend should filter this for security.
        const userOrders = data.filter((o) => o.user === user.email);
        setOrders(userOrders);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  // 3. HELPER: SAFE DATE FORMATTER (Fixes "Invalid Date")
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);

    // Check if date is invalid (NaN)
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 4. FILTER LOGIC
  const toggleStatus = (status) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const removeChip = (status) => {
    setStatusFilter((prev) => prev.filter((s) => s !== status));
  };

  const clearFilters = () => {
    setStatusFilter([]);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = search.toLowerCase();
      
      // Safe checks to prevent crashes if order.items is missing
      const matchesSearch =
        order._id?.toString().toLowerCase().includes(searchLower) ||
        order.items?.some((item) =>
          item?.name?.toLowerCase().includes(searchLower)
        );

      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(order.status);

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // 5. HELPER: STATUS COLORS
  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-700",
      Shipped: "bg-blue-100 text-blue-700",
      Delivered: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  // 6. RENDER: NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-700 text-lg font-semibold mb-4">
            Please login to view orders
          </p>
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // 7. RENDER: MAIN UI
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-3">My Orders</h1>
          <div className="flex bg-white rounded-lg overflow-hidden shadow-inner max-w-2xl">
            <input
              type="text"
              placeholder="Search by product or order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-indigo-700 px-6 text-sm font-semibold hover:bg-indigo-800 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER BAR */}
      <div className="md:hidden bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-[72px] z-20">
        <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
          {filteredOrders.length} Orders
        </span>
        <button
          onClick={() => setShowFilters(true)}
          className="text-indigo-600 font-semibold text-sm flex items-center gap-1"
        >
          Filters {statusFilter.length > 0 && `(${statusFilter.length})`}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Filter By Status</h3>
              {statusFilter.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="space-y-2">
              {["Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <label key={status} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition">
                  <input
                    type="checkbox"
                    className="accent-indigo-600 w-4 h-4"
                    checked={statusFilter.includes(status)}
                    onChange={() => toggleStatus(status)}
                  />
                  <span className="text-gray-600 text-sm group-hover:text-indigo-600">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          
          {/* Active Filter Chips */}
          {statusFilter.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {statusFilter.map((status) => (
                <span
                  key={status}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(status)}`}
                >
                  {status}
                  <button onClick={() => removeChip(status)} className="hover:text-black font-bold">
                    ✕
                  </button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-xs text-red-500 hover:underline ml-2">Clear All</button>
            </div>
          )}

          {/* LOADING SPINNER */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            /* EMPTY STATE */
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
              <div className="text-gray-300 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
              <p className="text-gray-500 text-sm mt-1">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            /* ORDERS LIST */
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 transition-all hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-28 h-32 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    <img
                      src={order.items?.[0]?.image || "https://placehold.co/150"}
                      alt={order.items?.[0]?.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => { e.target.src = "https://placehold.co/150?text=No+Image"; }}
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 truncate pr-4 text-base sm:text-lg">
                          {order.items?.[0]?.name || "Product Name Unavailable"}
                        </h3>
                        {order.items?.length > 1 && (
                          <span className="text-xs text-indigo-600 font-medium">
                            +{order.items.length - 1} other items
                          </span>
                        )}
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                          ID: {order._id}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        {/* ✅ FIX: Try order.date, fallback to order.createdAt */}
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Date:</span> {formatDate(order.date || order.createdAt)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">Payment:</span> {order.payment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{order.total?.toLocaleString()}</p>
                        <Link
                          to={`/orders/${order._id}`}
                          className="text-sm text-indigo-600 font-bold hover:text-indigo-800 mt-1 inline-flex items-center gap-1"
                        >
                          View Details <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SLIDE-OVER MENU */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button 
                onClick={() => setShowFilters(false)} 
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Order Status</p>
              {["Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <label key={status} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 active:bg-indigo-50 transition">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                  <span className="font-medium text-gray-700">{status}</span>
                </label>
              ))}
            </div>

            <div className="mt-auto pt-6 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 py-3 text-red-600 font-semibold border border-red-200 rounded-xl hover:bg-red-50 transition"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrders;