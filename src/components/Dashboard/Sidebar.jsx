import React from "react";
import {
    Card, CardContent, Typography, CircularProgress,
    Box, Stack, Button, Divider, Paper, useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningIcon from "@mui/icons-material/Warning";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ loading, lowStockCount, onLogout, cardStyle, isSmallScreen }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const sidebarStyle = {
        width: isSmallScreen ? "100%" : 280,
        background: theme.palette.mode === "light"
            ? "linear-gradient(to bottom, #f5f5f5, #e0e0e0)"
            : "#1c1c1c",
        p: 3,
        borderRadius: 0,
        height: "100%",
        minHeight: isSmallScreen ? "auto" : "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: `1px solid ${theme.palette.divider}`,
    };

    const cardHoverStyle = {
        ...cardStyle,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 6,
            backgroundColor: theme.palette.action.hover,
        },
    };

    const cardContentStyle = {
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
    };

    return (
        <Paper elevation={4} sx={sidebarStyle}>
            <Box>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color="primary"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/admin/dashboard")} // change this route if needed
                    >
                        Admin Panel
                    </Typography>

                    <Divider sx={{ mt: 1, borderColor: "primary.main" }} />
                </Box>

                <Stack spacing={2}>
                    <Card sx={cardHoverStyle} onClick={() => navigate("/manage")}>
                        <CardContent sx={cardContentStyle}>
                            <Inventory2Icon color="primary" fontSize="large" />
                            <Box>
                                <Typography variant="h6">Manage Products</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Edit or remove items
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={cardHoverStyle} onClick={() => navigate("/low-stock")}>
                        <CardContent sx={cardContentStyle}>
                            <WarningIcon color="error" fontSize="large" />
                            <Box>
                                <Typography variant="h6">Low Stock Products</Typography>
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <Typography variant="h4" color="error" fontWeight={700}>
                                        {lowStockCount}
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={cardHoverStyle} onClick={() => navigate("/add-product")}>
                        <CardContent sx={cardContentStyle}>
                            <AddCircleIcon color="success" fontSize="large" />
                            <Box>
                                <Typography variant="h6">Add Product</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Add something new
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={cardHoverStyle} onClick={() => navigate("/admin/orders")}>
                        <CardContent sx={cardContentStyle}>
                            <ListAltIcon color="info" fontSize="large" />
                            <Box>
                                <Typography variant="h6">Orders</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Check customer orders
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    onClick={onLogout}
                    fullWidth
                    startIcon={<LogoutIcon />}
                    sx={{
                        fontWeight: 600,
                        py: 1.2,
                        fontSize: "1rem",
                        background: "linear-gradient(to right, #ff4e50, #f44336)",
                        boxShadow: "0 4px 10px rgba(244,67,54,0.3)",
                        color: "#fff",
                        borderRadius: 2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            background: "linear-gradient(to right, #f44336, #d32f2f)",
                            boxShadow: "0 6px 15px rgba(211,47,47,0.4)",
                        },
                    }}
                >
                    Logout
                </Button>
            </Box>

        </Paper>
    );
};

export default Sidebar;
