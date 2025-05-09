import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { getLowStockProducts } from "../services/api";
import Sidebar from "../components/Dashboard/Sidebar";
import AnalyticsPanel from "../components/Dashboard/AnalyticsPanel";

const Dashboard = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const API_BASE = import.meta.env.VITE_API_CHECKOUT_URL;

  useEffect(() => {
    getLowStockProducts()
      .then((res) => {
        setLowStockCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`${API_BASE}/monthly-stats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data.success && setAnalytics(data.stats))
      .catch(console.error)
      .finally(() => setAnalyticsLoading(false));
  }, []);

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
    <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", height: "100vh" }}>
      <Sidebar
        loading={loading}
        lowStockCount={lowStockCount}
        onLogout={handleLogout}
        cardStyle={cardStyle}
        theme={theme}
        isSmallScreen={isSmallScreen}
      />
      <Box
        sx={{
          flexGrow: 1,
          p: isSmallScreen ? 2 : 4,
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        <AnalyticsPanel analytics={analytics} loading={analyticsLoading} />
      </Box>
    </Box>
  );
};

export default Dashboard;
