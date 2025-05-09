import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const StatCard = ({ title, value, color = "primary" }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor:
                    theme.palette.mode === "light" ? "#ffffff" : "#2a2a2a",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: theme.shadows[2],
                "&:hover": {
                    transform: "translateY(-5px) scale(1.03)",
                    boxShadow: theme.shadows[6],
                    backgroundColor:
                        theme.palette.mode === "light" ? "#f0f8ff" : "#333",
                },
            }}
        >
            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 600,
                    color: theme.palette[color]?.main || theme.palette.text.primary,
                    letterSpacing: 0.5,
                    mb: 1,
                    fontSize: "0.95rem",
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: theme.palette.text.primary,
                }}
            >
                {value}
            </Typography>
        </Paper>
    );
};

export default StatCard;
