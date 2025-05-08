import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" || name === "stock_quantity" ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} margin="dense" />
      <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} margin="dense" />
      <TextField fullWidth label="Price" name="price" type="number" value={form.price} onChange={handleChange} margin="dense" />
      <TextField fullWidth label="Stock Quantity" name="stock_quantity" type="number" value={form.stock_quantity} onChange={handleChange} margin="dense" />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">Save</Button>
        <Button onClick={onCancel} sx={{ ml: 1 }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
