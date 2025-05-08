import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageLowStock from "./pages/ManageLowStock";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage" element={<ManageProducts />} />
        <Route path="/low-stock" element={<ManageLowStock />} />
        <Route path="/add-product" element={<AddProduct />} /> {/* Add the route */}
      </Routes>
    </Router>
  );
};

export default App;
