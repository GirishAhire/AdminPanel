// src/pages/AdminLogin.jsx

import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_USER}/login`,
                { email, password }
            );

            const { token, role } = res.data;

            if (role !== "admin") {
                setError("Access denied: You are not an admin.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems:"center", mt: 12, px: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 4,
                    background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
                    transition: "0.3s ease-in-out",
                    boxShadow: 3,
                    "&:hover": {
                        transform: "scale(1.01)",
                        boxShadow: 6,
                    },
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    fontWeight={700}
                    color="#1f2937"
                    align="center"
                >
                    Admin Login
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            mt: 3,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f8fafc",
                                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "#e3f2fd",
                                },
                                "&.Mui-focused": {
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.2)",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                fontWeight: 600,
                                color: "#374151",
                            },
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            mt: 2,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                                backgroundColor: "#f8fafc",
                                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "#e3f2fd",
                                },
                                "&.Mui-focused": {
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.2)",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                fontWeight: 600,
                                color: "#374151",
                            },
                        }}
                        required
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: 3,
                            fontWeight: 600,
                            borderRadius: "10px",
                            letterSpacing: 1,
                            background: "linear-gradient(to right, #1976d2, #0d47a1)",
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AdminLogin;
