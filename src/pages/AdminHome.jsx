/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { fetchAdminStats } from "../services/api";

function AdminHome() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchAdminStats().then(setStats);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        📊 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-bold">
        {/* USERS */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.users}
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Total Products
          </h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.products}
          </p>
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Total Orders
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.orders}
          </p>
        </div>

        {/* REVENUE */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            ₹{stats.revenue}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
