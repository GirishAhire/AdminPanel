import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageLowStock from "./pages/ManageLowStock";
import AddProduct from "./pages/AddProduct";
import OrdersPage from "./pages/OrdersPage"; // ✅ Import the new OrdersPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<ManageProducts />} />
        <Route path="/low-stock" element={<ManageLowStock />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<OrdersPage />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
};

export default App;
