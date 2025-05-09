import React, { useEffect, useState } from "react";
import { getLowStockProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const Dashboard = () => {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getLowStockProducts()
      .then((res) => {
        setLowStockCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Manage All Products */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/manage")}>
            <CardContent>
              <Typography variant="h6">Manage All Products</Typography>
              <Typography variant="body2">
                View, edit, or delete all products in inventory
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock Products */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/low-stock")}>
            <CardContent>
              <Typography variant="h6">Low Stock Products</Typography>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h5">{lowStockCount}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Add New Product */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/add-product")}>
            <CardContent>
              <Typography variant="h6">Add New Product</Typography>
              <Typography variant="body2">
                Add a new product to the inventory
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* View All Orders */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/admin/orders")}>
            <CardContent>
              <Typography variant="h6">View All Orders</Typography>
              <Typography variant="body2">
                Check all customer orders and shipping status
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
