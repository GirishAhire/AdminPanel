import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import { getLowStockProducts } from "../services/api";
import OrdersContent from "../components/Dashboard/OrdersContent";

const OrdersPage = () => {
    const [lowStockCount, setLowStockCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        getLowStockProducts()
            .then((res) => setLowStockCount(res.data.count || 0))
            .finally(() => setLoading(false));
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

            {/* Main Orders Content */}
            <OrdersContent />
        </Box>
    );
};

export default OrdersPage;
