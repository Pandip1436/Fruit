import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/css/Auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );

    if (!user) {
      setToast("❌ Invalid email or password");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setToast("✅ Login successful");

    setTimeout(() => {
      setToast("");
      navigate("/");
      window.location.reload();
    }, 1500);
    
  };

  return (
    <div className="auth-page">
      {toast && <div className="toast-success">{toast}</div>}

      <div className="auth-card">
        <h2>🍎 My Fruits Shop</h2>
        <p>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
