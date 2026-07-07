import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Disclaimer from "./pages/Disclaimer"
import ReturnPolicy from "./pages/ReturnPolicy"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import OrderSuccess from "./pages/OrderSuccess";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import AdminDashboard from "./admin/AdminDashboard.jsx"
import AddProducts from "./admin/AddProducts.jsx"
import AdminOrders from "./admin/AdminOrders.jsx"
import AdminProducts from "./admin/AdminProducts.jsx"
import AdminUsers from "./admin/AdminUsers";
import EditProduct from "./admin/EditProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/add-product" element={<AddProducts />}/>
        <Route path="/admin/products" element={<AdminProducts />}/>
        <Route path="/admin/edit-product/:id" element={<EditProduct />}/>
        <Route path="/admin/orders" element={<AdminOrders />}/>
        <Route path="/admin/users" element={<AdminUsers />}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
