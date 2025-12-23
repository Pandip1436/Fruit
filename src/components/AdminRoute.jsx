import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
