
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Toast from "./components/Toast";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminHome from "./pages/AdminHome";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import UserOrders from "./pages/UserOrders";
import UserOrderDetails from "./pages/UserOrderDetails";
import Landing from "./pages/Landing";
import { fetchProducts } from "../src/services/api";
import Feedback from "./pages/Feedback";


function App() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });
   const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 LOAD FROM LOCALSTORAGE

useEffect(() => {
  fetchProducts().then(data => setProducts(data));
}, []);


  // SAVE to localStorage on every update
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  

  // 🔹 TOAST HANDLER
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type }), 3000);
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      <Toast message={toast.message} type={toast.type} />

      <Routes>
        <Route
           path="/admin"
           element={  <AdminRoute><AdminDashboard /></AdminRoute> }>

            <Route index element={<AdminHome/>} />

            <Route
          path="productlist"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              showToast={showToast}
            />
          }
        />
        <Route
          path="add"
          element={
            <AddProduct
              products={products}
              setProducts={setProducts}
              showToast={showToast}
            />
            }
         />
         <Route path="users" element={<AdminUsers/>} />
         <Route path="orders" element={<AdminOrders/>} />
         <Route path="orders/:orderId" element={<AdminOrderDetails/>} />
            

        </Route>

        <Route
              path="/"
              element={
                <Landing
                  cart={cart}
                  setCart={setCart}
                  showToast={showToast}
                />
              }
        />


        
         <Route
              path="/products" 
             element={
                      <Products
                         products={products}
                         cart={cart}
                         setCart={setCart}
                         showToast={showToast}
                     />
                   }
         />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} showToast={showToast} />}
            />

            <Route
              path="/cart/checkout"
              element={<Checkout cart={cart} setCart={setCart} showToast={showToast} />}
            />
            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/feedback" element={<Feedback />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            
            <Route
              path="/orders"
              element={
                // <UserRoute>
                  <UserOrders/>
                // </UserRoute>
              }
            />

            <Route
              path="/orders/:orderId"
              element={
                // <UserRoute>
                  <UserOrderDetails/>
                // {/* </UserRoute> */}
              }
            />
            
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
