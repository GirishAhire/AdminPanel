import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageLowStock from "./pages/ManageLowStock";
import AddProduct from "./pages/AddProduct";
import OrdersPage from "./pages/OrdersPage";
import AdminLogin from "./pages/AdminLogin"; // ✅ Add this import

// ✅ ProtectedRoute component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Admin Login route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Protected admin routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/manage" element={<ProtectedRoute element={<ManageProducts />} />} />
        <Route path="/low-stock" element={<ProtectedRoute element={<ManageLowStock />} />} />
        <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute element={<OrdersPage />} />} />

        {/* Optional: catch-all route */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
