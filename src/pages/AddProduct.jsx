import React, { useState } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { addProduct } from "../services/api"; // Assuming addProduct function is in api.js

const AddProduct = () => {
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
    // Convert numeric fields
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock_quantity: parseInt(newProduct.stock_quantity),
    };

    addProduct(productData)
      .then(() => {
        // Reset form after adding product
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

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => handleChange("name", e.target.value)}
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
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            value={newProduct.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Brand"
            value={newProduct.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            value={newProduct.stock_quantity}
            onChange={(e) => handleChange("stock_quantity", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            value={newProduct.image_url}
            onChange={(e) => handleChange("image_url", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProduct;
