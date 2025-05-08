import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../services/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = (pageNum = 1) => {
    getAllProducts(pageNum)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setOpen(true);
  };

  const handleSave = () => {
    updateProduct(selectedProduct._id, selectedProduct)
      .then(() => {
        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? selectedProduct : p))
        );
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Manage All Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography>Description: {product.description}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Brand: {product.brand}</Typography>
                <Typography>Price: ₹{product.price}</Typography>
                <Typography>Stock: {product.stock_quantity}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(product)}
                  style={{ marginTop: "10px", marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(product._id)}
                  style={{ marginTop: "10px" }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <TextField
                label="Name"
                value={selectedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                value={selectedProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Category"
                value={selectedProduct.category}
                onChange={(e) => handleChange("category", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Brand"
                value={selectedProduct.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Price"
                type="number"
                value={selectedProduct.price}
                onChange={(e) => handleChange("price", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Stock Quantity"
                type="number"
                value={selectedProduct.stock_quantity}
                onChange={(e) => handleChange("stock_quantity", e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Image URL"
                value={selectedProduct.image_url}
                onChange={(e) => handleChange("image_url", e.target.value)}
                fullWidth
                margin="dense"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageProducts;
