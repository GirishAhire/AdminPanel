import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_CHECKOUT_URL}/admin`)
            .then((res) => {
                setOrders(res.data.orders || []);
                setLoading(false);
            })
            .catch(() => {
                setSnackbar({ open: true, message: "Failed to load orders", severity: "error" });
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        axios
            .patch(`${import.meta.env.VITE_API_CHECKOUT_URL}/update-shipping-status`, {
                orderId,
                shippingStatus: newStatus,
            })
            .then(() => {
                setOrders((prev) =>
                    prev.map((order) =>
                        order._id === orderId ? { ...order, shippingStatus: newStatus } : order
                    )
                );
                setSnackbar({ open: true, message: "Shipping status updated", severity: "success" });
            })
            .catch(() =>
                setSnackbar({ open: true, message: "Failed to update status", severity: "error" })
            );
    };

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                All Orders
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {orders.map((order) => (
                        <Grid item xs={12} md={6} key={order._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">Order ID: {order._id}</Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Placed on: {new Date(order.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Customer:</strong> {order.shippingAddress.fullName}
                                        <br />
                                        <strong>Phone:</strong> {order.shippingAddress.phone}
                                        <br />
                                        <strong>Address:</strong> {order.shippingAddress.addressLine1},{" "}
                                        {order.shippingAddress.addressLine2}, {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                                    </Typography>

                                    <Typography sx={{ mt: 2 }} variant="body2">
                                        <strong>Items:</strong>
                                    </Typography>
                                    {order.items.map((item) => (
                                        <Typography key={item._id} variant="body2">
                                            - {item.productName} x {item.quantity} (${item.price})
                                        </Typography>
                                    ))}

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Total:</strong> ${order.totalAmount}
                                    </Typography>
                                    <Typography>
                                        <strong>Payment:</strong> {order.paymentStatus}
                                    </Typography>

                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel>Shipping Status</InputLabel>
                                        <Select
                                            value={order.shippingStatus}
                                            label="Shipping Status"
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Shipped">Shipped</MenuItem>
                                            <MenuItem value="Delivered">Delivered</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default OrdersPage;
