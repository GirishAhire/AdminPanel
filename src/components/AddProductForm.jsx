// AddProductForm.jsx
import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
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
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#f0f4f8",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#e8f0fe",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
        borderColor: "#1976d2",
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
      color: "#374151",
      fontFamily: "Poppins, sans-serif",
    },
    "& .MuiOutlinedInput-input": {
      fontFamily: "Poppins, sans-serif",
    },
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        width: "100%",
        maxWidth: 700,
        background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1f2937",
          fontFamily: "Poppins, sans-serif",
          mb: 3,
        }}
      >
        Add New Product
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={newProduct.description}
            onChange={(e) => handleChange("description", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleChange("price", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            value={newProduct.stock_quantity}
            onChange={(e) =>
              handleChange("stock_quantity", e.target.value)
            }
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            value={newProduct.category}
            onChange={(e) => handleChange("category", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Brand"
            value={newProduct.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            value={newProduct.image_url}
            onChange={(e) => handleChange("image_url", e.target.value)}
            variant="outlined"
            sx={textFieldStyle}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddProduct}
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "Poppins, sans-serif",
              borderRadius: 2,
              py: 1.5,
              background: "linear-gradient(to right, #1976d2, #0d47a1)",
              "&:hover": {
                background: "linear-gradient(to right, #1565c0, #0b3c91)",
              },
            }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddProductForm;
