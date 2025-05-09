import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Divider,
} from "@mui/material";

const ProductCard = ({ products, onEdit, onDelete }) => {
    if (!products || products.length === 0)
        return <Typography>No products found.</Typography>;

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} key={product._id}>
                    <Card
                        sx={{
                            minHeight: 220,
                            boxShadow: 3,
                            borderRadius: 4,
                            overflow: "hidden",
                            background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
                            transition: "0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.01)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                            alignItems="stretch"
                            sx={{ height: "100%" }}
                        >
                            {/* Product Details */}
                            <Grid item xs={12} sm={9}>
                                <CardContent
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        p: 3,
                                        height: 200,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700, color: "#1f2937", mb: 1 }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#374151",
                                            mb: 0.5,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <strong>Description:</strong> {product.description}
                                    </Typography>
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
                            </Grid>

                            {/* Vertical Divider for larger screens */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ display: { xs: "none", sm: "block" }, my: 2 }}
                            />

                            {/* Actions */}
                            <Grid
                                item
                                xs={12}
                                sm={3}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                    p: 2,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onEdit(product)}
                                    sx={{
                                        width: "100%",
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
                                    onClick={() => onDelete(product._id)}
                                    sx={{
                                        width: "100%",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        borderRadius: 2,
                                    }}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductCard;
