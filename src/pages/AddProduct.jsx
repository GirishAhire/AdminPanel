import React, { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import AddProductForm from "../components/AddProductForm";
import { getLowStockProducts } from "../services/api";  // Ensure the correct path

const AddProduct = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch the low stock products count
  useEffect(() => {
    getLowStockProducts()
      .then((res) => {
        setLowStockCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Logout handler
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

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          overflowY: "auto",
          p: isSmallScreen ? 2 : 4,
        }}
      >
        <AddProductForm />
      </Box>
    </Box>
  );
};

export default AddProduct;
