import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Bars3Icon,
  Squares2X2Icon,
  CubeIcon,
  PlusCircleIcon,
  UsersIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";

function AdminDashboard() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
     ${
       isActive
         ? "bg-green-600 text-white shadow"
         : "text-gray-700 hover:bg-green-50"
     }`;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed md:static z-40 h-full w-64 bg-white shadow-xl transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
            🛠 Admin Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="/admin" end className={linkClass} onClick={() => setOpen(false)}>
            <Squares2X2Icon className="h-5 w-5" />
            Dashboard
          </NavLink>

          <NavLink to="productlist" className={linkClass} onClick={() => setOpen(false)}>
            <CubeIcon className="h-5 w-5" />
            Product List
          </NavLink>

          <NavLink to="add" className={linkClass} onClick={() => setOpen(false)}>
            <PlusCircleIcon className="h-5 w-5" />
            Add Product
          </NavLink>

          <NavLink to="/admin/users" className={linkClass} onClick={() => setOpen(false)}>
            <UsersIcon className="h-5 w-5" />
            Users
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass} onClick={() => setOpen(false)}>
            <ShoppingBagIcon className="h-5 w-5" />
            Orders
          </NavLink>

          <NavLink to="/admin/feedback" className={linkClass} onClick={() => setOpen(false)}>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            Feedback
          </NavLink>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR (MOBILE) */}
        <header className="flex items-center gap-4 bg-white shadow px-6 py-4 md:hidden">
          <button onClick={() => setOpen(!open)}>
            <Bars3Icon className="h-7 w-7 text-gray-700" />
          </button>
          <h1 className="font-semibold text-lg text-gray-800">
            Admin Panel
          </h1>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
         <Outlet />
        </main>


      </div>
    </div>
  );
}

export default AdminDashboard;
