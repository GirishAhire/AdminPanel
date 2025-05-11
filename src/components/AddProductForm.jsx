import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Stack } from "@mui/material";
import { addProduct } from "../services/api";

const AddProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock_quantity: "",
    image_url: "",
  });

  const handleChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleAddProduct = () => {
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock_quantity: parseInt(newProduct.stock_quantity),
    };

    addProduct(productData)
      .then(() => {
        alert("Product added successfully!");
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          stock_quantity: "",
          image_url: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add product.");
      });
  };

  const textFieldStyle = {
    width: "100%",
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
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "90%",
          maxWidth: "600px",
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
          variant="h4"
          align="center"
          sx={{ mb: 3, fontWeight: 700, color: "#1f2937" }}
        >
          Add New Product
        </Typography>

        <Stack spacing={2} alignItems="center">
          <TextField
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={newProduct.description}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleChange("price", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Stock Quantity"
            type="number"
            value={newProduct.stock_quantity}
            onChange={(e) => handleChange("stock_quantity", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Category"
            value={newProduct.category}
            onChange={(e) => handleChange("category", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Brand"
            value={newProduct.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Image URL"
            value={newProduct.image_url}
            onChange={(e) => handleChange("image_url", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleAddProduct}
            sx={{
              mt: 2,
              fontWeight: 600,
              letterSpacing: 1,
              borderRadius: "10px",
              width: "100%",
              background: "linear-gradient(to right, #1976d2, #0d47a1)",
            }}
          >
            Add Product
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddProductForm;
