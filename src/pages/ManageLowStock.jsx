import React, { useEffect, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import ProductList from "../components/ProductList";
import {
  getLowStockProducts,
  updateProduct,
  deleteProduct,
} from "../services/api";

const ManageLowStock = () => {
  const [products, setProducts] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Fetch low stock products
    getLowStockProducts().then((res) => {
      setProducts(res.data.products || []);
      setLowStockCount(res.data.count || 0);
      setLoading(false);
    });
  }, []);

  const handleUpdate = (id, updatedData) => {
    updateProduct(id, updatedData).then(() =>
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
      )
    );
  };

  const handleDelete = (id) => {
    deleteProduct(id).then(() =>
      setProducts((prev) => prev.filter((p) => p._id !== id))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin/login";
  };

  const cardStyle = {
    p: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    width: "100%",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: 6,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : 300,
          flexShrink: 0,
          borderRight: isSmallScreen ? "none" : "1px solid #e0e0e0",
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Sidebar
          loading={loading}
          lowStockCount={lowStockCount}
          onLogout={handleLogout}
          cardStyle={cardStyle}
          theme={theme}
          isSmallScreen={isSmallScreen}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
          p: isSmallScreen ? 2 : 4,
        }}
      >
        
        <ProductList
          products={products}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
};

export default ManageLowStock;
