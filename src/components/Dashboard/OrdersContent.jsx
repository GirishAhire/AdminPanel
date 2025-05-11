import React, { useEffect, useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Snackbar,
    Alert,
    Divider,
} from "@mui/material";
import axios from "axios";

const OrdersContent = () => {
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
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f9f9f9", overflowY: "auto" }}>
            <Typography
                variant="h5"
                fontWeight={800}
                color="info"
                gutterBottom
                sx={{
                    letterSpacing: 0.5,
                    mb: 3,
                    pb: 1,
                    borderBottom: (theme) => `2px solid ${theme.palette.info.main}`,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ListAltIcon color="info" sx={{ mr: 1 }} />
                All Orders
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} mt={5} md={4} key={order._id}>
                            <Card
                                sx={{
                                    minHeight: 430,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    width: 375,
                                    maxWidth: 430,
                                    boxShadow: 3,
                                    borderRadius: 4,
                                    background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
                                    transition: "0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.01)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1f2937", mb: 1 }}>
                                        Order ID: {order._id}
                                    </Typography>

                                    <Typography variant="subtitle2" gutterBottom sx={{ color: "#374151" }}>
                                        Placed on: {new Date(order.createdAt).toLocaleString()}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                                        <strong>Customer:</strong> {order.shippingAddress.fullName}
                                        <br />
                                        <strong>Phone:</strong> {order.shippingAddress.phone}
                                        <br />
                                        <strong>Address:</strong> {order.shippingAddress.addressLine1},{" "}
                                        {order.shippingAddress.addressLine2}, {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                                    </Typography>

                                    <Typography variant="body2" sx={{ mt: 2, color: "#374151", fontWeight: 600 }}>
                                        <strong>Items:</strong>
                                    </Typography>
                                    {order.items.map((item) => (
                                        <Typography key={item._id} variant="body2" sx={{ color: "#374151" }}>
                                            - {item.productName} x {item.quantity} (₹{item.price})
                                        </Typography>
                                    ))}

                                    <Typography sx={{ mt: 1, color: "#374151" }}>
                                        <strong>Total:</strong> ${order.totalAmount}
                                    </Typography>
                                    <Typography sx={{ color: "#374151" }}>
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
                                        </Select>
                                    </FormControl>
                                </CardContent>

                                <Divider sx={{ my: 1 }} />
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
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OrdersContent;
