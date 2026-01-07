/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser
} from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: ""
  });

  /* ---------------- LOAD USERS ---------------- */
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  /* ---------------- ADD USER ---------------- */
  const handleAddUser = async e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = await addUser({
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password
    });

    setUsers([...users, newUser]);
    resetForm();
  };

  /* ---------------- EDIT USER ---------------- */
  const editUserHandler = user => {
    setEditId(user._id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: ""
    });
  };

  /* ---------------- UPDATE USER ---------------- */
  const handleUpdateUser = async e => {
    e.preventDefault();

    if (!form.name) {
      setError("Username is required");
      return;
    }

    if (form.password && form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const updated = await updateUser(editId, {
      name: form.name,
      role: form.role,
      ...(form.password && { password: form.password })
    });

    setUsers(users.map(u => (u._id === updated._id ? updated : u)));
    resetForm();
  };

  /* ---------------- DELETE USER ---------------- */
  const handleDeleteUser = async id => {
    await deleteUser(id);
    setUsers(users.filter(u => u._id !== id));
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: ""
    });
    setError("");
  };

  /* ---------------- FILTER ---------------- */
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <h2 className="text-2xl font-bold mb-6">
        👤 User Management
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT – USER LIST */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4">
          <input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    S.No
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* SERIAL NUMBER */}
                    <td className="px-4 py-2 font-medium">
                      {index + 1}
                    </td>

                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => editUserHandler(user)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT – ADD / EDIT USER */}
        <div className="bg-white rounded-xl p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {editId ? "✏️ Edit User" : "➕ Add User"}
          </h3>

          {error && (
            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>
          )}

          <form
            onSubmit={editId ? handleUpdateUser : handleAddUser}
            className="space-y-3"
          >
            <input
              name="name"
              placeholder="User Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />

            {!editId && (
              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            )}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder={editId ? "New Password (optional)" : "Password"}
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              {editId ? "Update User" : "Add User"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
