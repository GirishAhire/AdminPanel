import React, { useEffect, useState } from "react";
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
  Divider,
  Button,
  Grid,
} from "@mui/material";
import { getLowStockProducts } from "../services/api";

const Dashboard = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const navigate = useNavigate();
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnalytics(data.stats);
        }
      })
      .catch((err) => console.error("Failed to load analytics", err))
      .finally(() => setAnalyticsLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
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

  const getMonthYear = ({ month, year }) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const latest = analytics[0];
  const previous = analytics[1];

  return (
    <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", height: "100vh" }}>
      {/* Sidebar */}
      <Paper
        elevation={4}
        sx={{
          width: isSmallScreen ? "100%" : 300,
          p: 3,
          borderRadius: 0,
          borderRight: isSmallScreen ? "none" : `1px solid ${theme.palette.divider}`,
          height: isSmallScreen ? "auto" : "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h5" fontWeight={700} color="primary">
              Admin Dashboard
            </Typography>
            <Divider sx={{ mt: 1, borderColor: "primary.main" }} />
          </Box>

          <Stack spacing={2}>
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
                  <Typography variant="h4" color="error" fontWeight={700}>
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
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: isSmallScreen ? 2 : 4,
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            📊 Analytics Panel
          </Typography>

          {analyticsLoading ? (
            <CircularProgress />
          ) : latest ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Current Month: <strong>{getMonthYear(latest._id)}</strong>
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Total Orders</Typography>
                      <Typography variant="h4" color="primary" fontWeight={700}>
                        {latest.totalOrders}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2 }}>
                    <CardContent> 
                      <Typography variant="h6">Total Revenue</Typography>
                      <Typography variant="h4" color="green" fontWeight={700}>
                        ${latest.totalRevenue.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card sx={{ p: 2 }}>
                    <CardContent>
                      <Typography variant="h6">Products Sold</Typography>
                      <Typography variant="h4" color="purple" fontWeight={700}>
                        {latest.totalProductsSold}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {previous && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                    Previous Month: <strong>{getMonthYear(previous._id)}</strong>
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6">Total Orders</Typography>
                          <Typography variant="h4" fontWeight={700}>
                            {previous.totalOrders}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6">Total Revenue</Typography>
                          <Typography variant="h4" fontWeight={700}>
                            ₹{previous.totalRevenue.toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6">Products Sold</Typography>
                          <Typography variant="h4" fontWeight={700}>
                            {previous.totalProductsSold}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <Typography>No analytics data available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
