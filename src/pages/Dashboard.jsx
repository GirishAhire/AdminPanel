import React, { useEffect, useState } from "react";
import { getLowStockProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Dashboard = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getLowStockProducts()
      .then((res) => {
        setLowStockCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cardStyle = {
    p: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    width: "100%",
    maxWidth: 500,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: 6,
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant={isSmallScreen ? "h5" : "h3"} fontWeight={600}>
          Admin Dashboard
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: 4,
          alignItems: isSmallScreen ? "center" : "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side: Dashboard Title */}


        {/* Right Side: Cards */}
        <Paper
          elevation={4}
          sx={{
            p: isSmallScreen ? 2 : 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 520,
          }}
        >
          <Stack spacing={3}>
            <Card sx={cardStyle} onClick={() => navigate("/manage")}>
              <CardContent>
                <Typography variant="h6">Manage All Products</Typography>
                <Typography variant="body2">
                  View, edit, or delete all products in inventory.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => navigate("/low-stock")}>
              <CardContent>
                <Typography variant="h6">Low Stock Products</Typography>
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="h4" color="error">
                    {lowStockCount}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => navigate("/add-product")}>
              <CardContent>
                <Typography variant="h6">Add New Product</Typography>
                <Typography variant="body2">
                  Add a new product to the inventory.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={cardStyle} onClick={() => navigate("/admin/orders")}>
              <CardContent>
                <Typography variant="h6">View All Orders</Typography>
                <Typography variant="body2">
                  Check all customer orders and shipping status.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
