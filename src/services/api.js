const BASE_URL = "http://localhost:5000/api";

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

/* USERS */
export const fetchUsers = () =>
  fetch("http://localhost:5000/api/users").then(res => res.json());

export const addUser = data =>
  fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateUser = (id, data) =>
  fetch(`http://localhost:5000/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteUser = id =>
  fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE"
  }).then(res => res.json());



/* ---------- PRODUCTS ---------- */
export const fetchProducts = () =>
  fetch(`${BASE_URL}/products`).then(res => res.json());

export const addProduct = product =>
  fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  }).then(res => res.json());

export const deleteProduct = id =>
  fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
  
  /* PRODUCTS */
export const updateProduct = (id, data) =>
  fetch(`http://localhost:5000/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteAllProducts = () =>
  fetch(`http://localhost:5000/api/products`, {
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
  fetch(`${BASE_URL}/orders`).then(res => res.json());

export const updateOrderStatus = (id, status) =>
  fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  }).then(res => res.json());

  
/* ADMIN DASHBOARD */
export const fetchAdminStats = () =>
  fetch("http://localhost:5000/api/admin/stats")
    .then(res => res.json());

/* FEATURED PRODUCTS */
export const fetchFeaturedProducts = () =>
  fetch("http://localhost:5000/api/products/featured")
    .then(res => res.json());

    