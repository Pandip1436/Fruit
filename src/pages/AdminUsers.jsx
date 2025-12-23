/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "../pages/css/AdminDashboard.css"


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [editEmail, setEditEmail] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: ""
  });

  // LOAD USERS
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  // HANDLE INPUT
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ADD USER
  const addUser = e => {
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

    const exists = users.find(u => u.email === form.email);
    if (exists) {
      setError("Email already exists");
      return;
    }

    const updatedUsers = [
      ...users,
      {
        name: form.name,
        email: form.email,
        role: form.role,
        password: form.password
      }
    ];

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resetForm();
  };

  // EDIT USER (LOAD DATA)
  const editUser = user => {
    setEditEmail(user.email);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: ""
    });
  };

  // UPDATE USER
  const updateUser = e => {
    e.preventDefault();

    if (!form.name) {
      setError("Username is required");
      return;
    }

    if (form.password) {
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    const updatedUsers = users.map(user =>
      user.email === editEmail
        ? {
            ...user,
            name: form.name,
            role: form.role,
            password: form.password ? form.password : user.password
          }
        : user
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    resetForm();
  };

  // DELETE USER
  const deleteUser = email => {
    const updated = users.filter(u => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const resetForm = () => {
    setEditEmail(null);
    setForm({
      name: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: ""
    });
    setError("");
  };

  // SEARCH FILTER
  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>👤 User Management</h2>

      <div className="user-layout">
        {/* LEFT – USER LIST */}
        <div className="user-list-panel">
          <input
            className="admin-search"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </button>
                    {user.role !== "admin" && (
                      <button
                        className="danger-btn"
                        onClick={() => deleteUser(user.email)}
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

        {/* RIGHT – ADD / EDIT USER */}
        <div className="add-user-panel">
          <h3>{editEmail ? "Edit User" : "Add User"}</h3>

          {error && <p className="error">{error}</p>}

          <form onSubmit={editEmail ? updateUser : addUser}>
            <input
              name="name"
              placeholder="User Name"
              value={form.name}
              onChange={handleChange}
            />

            {!editEmail && (
              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
            )}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder={editEmail ? "New Password (optional)" : "Password"}
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit">
              {editEmail ? "Update User" : "Add User"}
            </button>

            {editEmail && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
