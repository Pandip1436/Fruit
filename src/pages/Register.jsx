import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/css/Auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // default role
  });

  const [toast, setToast] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === form.email)) {
      setToast("⚠️ Email already exists");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    setToast("✅ Registration successful");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="auth-page">
      {toast && <div className="toast-success">{toast}</div>}

      <div className="auth-card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          {/* ROLE */}
          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button>Register</button>
        </form>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
