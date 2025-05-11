import React from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Paper,
    useTheme,
} from "@mui/material";
import StatCard from "./StatCard";

const getMonthYear = ({ month, year }) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
};

const AnalyticsPanel = ({ analytics = [], loading }) => {
    const theme = useTheme();
    const latest = analytics?.[0];
    const previous = analytics?.[1];

    return (
        <Paper
            elevation={4}
            sx={{
                p: 4,
                borderRadius: 4,
                width: "100%",
                background: "linear-gradient(to right, #f8fafc, #e2e8f0)", // match order card gradient
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: 6,
                },
            }}

        >
            <Typography
                variant="h5"
                fontWeight={800}
                color="primary"
                gutterBottom
                sx={{
                    letterSpacing: 0.5,
                    mb: 3,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    display: "inline-block",
                    pb: 1,
                }}
            >
                📊 Monthly Analytics Overview
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" py={5}>
                    <CircularProgress />
                </Box>
            ) : latest ? (
                <>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontSize: "1.05rem",
                        }}
                    >
                        Current Month:{" "}
                        <Box
                            component="span"
                            sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
                        >
                            {getMonthYear(latest._id)}
                        </Box>
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={4}>
                            <StatCard
                                title="Total Orders"
                                value={latest.totalOrders}
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCard
                                title="Total Revenue"
                                value={`$${latest.totalRevenue.toFixed(2)}`}
                                color="success"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <StatCard
                                title="Products Sold"
                                value={latest.totalProductsSold}
                                color="secondary"
                            />
                        </Grid>
                    </Grid>

                    {previous && (
                        <>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mt: 5,
                                    mb: 3,
                                    fontWeight: 600,
                                    color: theme.palette.text.secondary,
                                    fontSize: "1.05rem",
                                }}
                            >
                                Previous Month:{" "}
                                <Box
                                    component="span"
                                    sx={{ fontWeight: 700, color: theme.palette.grey[600] }}
                                >
                                    {getMonthYear(previous._id)}
                                </Box>
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <StatCard
                                        title="Total Orders"
                                        value={previous.totalOrders}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <StatCard
                                        title="Total Revenue"
                                        value={`$${previous.totalRevenue.toFixed(2)}`}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <StatCard
                                        title="Products Sold"
                                        value={previous.totalProductsSold}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )}
                </>
            ) : (
                <Typography color="textSecondary" sx={{ mt: 2 }}>
                    No analytics data available.
                </Typography>
            )}
        </Paper>
    );
};

export default AnalyticsPanel;
