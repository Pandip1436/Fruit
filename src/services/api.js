// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_URL;


/* ---------- AUTH ---------- */
export const registerUser = data =>
  fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const loginUser = data =>
  fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

/* ---------- USERS ---------- */
export const fetchUsers = () =>
  fetch(`${BASE_URL}/users`)
    .then(res => res.json());

export const addUser = data =>
  fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateUser = (id, data) =>
  fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteUser = id =>
  fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE"
  }).then(res => res.json());

/* ---------- PRODUCTS ---------- */
export const fetchProducts = () =>
  fetch(`${BASE_URL}/products`)
    .then(res => res.json());

export const addProduct = product =>
  fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  }).then(res => res.json());

export const updateProduct = (id, data) =>
  fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteProduct = id =>
  fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  }).then(res => res.json());

export const deleteAllProducts = () =>
  fetch(`${BASE_URL}/products`, {
    method: "DELETE"
  }).then(res => res.json());

/* ---------- ORDERS ---------- */
export const placeOrder = order =>
  fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  }).then(res => res.json());

export const fetchOrders = () =>
  fetch(`${BASE_URL}/orders`)
    .then(res => res.json());

export const updateOrderStatus = (id, status) =>
  fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  }).then(res => res.json());

  

/* ---------- ADMIN ---------- */
export const fetchAdminStats = () =>
  fetch(`${BASE_URL}/admin/stats`)
    .then(res => res.json());

/* ---------- FEATURED PRODUCTS ---------- */
export const fetchFeaturedProducts = () =>
  fetch(`${BASE_URL}/products/featured`)
    .then(res => res.json());

    // const BASE_URL = "http://localhost:5000/api/feedback";

export const submitFeedback = data =>
  fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const fetchFeedbacks = () =>
  fetch(`${BASE_URL}/feedback`).then(res => res.json());

export const fetchAdminFeedbacks = () =>
  fetch(`${BASE_URL}/feedback/admin`).then(res => res.json());

export const approveFeedback = id =>
  fetch(`${BASE_URL}/feedback/${id}/approve`, { method: "PUT" });

export const deleteFeedback = id =>
  fetch(`${BASE_URL}/feedback/${id}`, { method: "DELETE" });
