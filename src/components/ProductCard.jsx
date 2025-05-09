import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Box,
} from "@mui/material";

const ProductCard = ({ products, onEdit, onDelete }) => {
    if (!products || products.length === 0)
        return <Typography>No products found.</Typography>;

    return (
        <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Card
                        sx={{
                            height: 300,
                            width: 275,
                            maxWidth: 380,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
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
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                overflow: "hidden",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, color: "#1f2937", mb: 1 }}
                            >
                                {product.name}
                            </Typography>

                            <Box sx={{ mb: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#374151", fontWeight: 600 }}
                                >
                                    Description:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#374151",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {product.description}
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                                <strong>Category:</strong> {product.category}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                                <strong>Brand:</strong> {product.brand}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                                <strong>Price:</strong> ₹{product.price}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#374151" }}>
                                <strong>Stock:</strong> {product.stock_quantity}
                            </Typography>
                        </CardContent>

                        <Divider sx={{ my: 1 }} />

                        <Box
                            sx={{
                                px: 2,
                                pb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => onEdit(product)}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: 2,
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={() => onDelete(product._id)}
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: 2,
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductCard;
