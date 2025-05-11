import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import {
  getLowStockProducts,
  updateProduct,
  deleteProduct,
} from "../services/api";
import EditProductDialog from "./EditProductDialog"; // ✅ updated import

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getLowStockProducts()
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected response:", res.data);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setSelectedProduct(null);
    setEditDialogOpen(false);
  };

  const handleInputChange = (field, value) => {
    setSelectedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedData = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: Number(selectedProduct.price),
      category: selectedProduct.category,
      brand: selectedProduct.brand,
      stock_quantity: Number(selectedProduct.stock_quantity),
      image_url: selectedProduct.image_url,
    };

    updateProduct(selectedProduct._id, updatedData)
      .then(() => {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === selectedProduct._id ? { ...p, ...updatedData } : p
          )
        );
        handleEditClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Manage Low Stock Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} mt={5} md={4} key={product._id}>
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
              <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1f2937", mb: 1 }}>
                  {product.name}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "#374151", fontWeight: 600 }}>
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
                  onClick={() => handleEditOpen(product)}
                  sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => handleDelete(product._id)}
                  sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Edit Dialog Popup */}
      <EditProductDialog
        open={editDialogOpen}
        onClose={handleEditClose}
        product={selectedProduct}
        onChange={handleInputChange}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default ProductList;
