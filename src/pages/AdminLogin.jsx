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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <Paper sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                    Admin Login
                </Typography>

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mt: 2 }}
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
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AdminLogin;
