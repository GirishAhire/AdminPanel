import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import {
  getLowStockProducts,
  updateProduct,
  deleteProduct,
} from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editStates, setEditStates] = useState({});

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

  const handleEditToggle = (id) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleUpdate = (id) => {
    const product = products.find((p) => p._id === id);
    const updatedData = {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      category: product.category,
      brand: product.brand,
      stock_quantity: Number(product.stock_quantity),
      image_url: product.image_url,
    };

    updateProduct(id, updatedData)
      .then(() => {
        handleEditToggle(id);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Manage Low Stock Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                {editStates[product._id] ? (
                  <>
                    <TextField
                      label="Name"
                      value={product.name}
                      onChange={(e) =>
                        handleInputChange(product._id, "name", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Description"
                      value={product.description}
                      onChange={(e) =>
                        handleInputChange(product._id, "description", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Category"
                      value={product.category}
                      onChange={(e) =>
                        handleInputChange(product._id, "category", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Brand"
                      value={product.brand}
                      onChange={(e) =>
                        handleInputChange(product._id, "brand", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Stock Quantity"
                      type="number"
                      value={product.stock_quantity}
                      onChange={(e) =>
                        handleInputChange(product._id, "stock_quantity", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Price"
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleInputChange(product._id, "price", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Image URL"
                      value={product.image_url}
                      onChange={(e) =>
                        handleInputChange(product._id, "image_url", e.target.value)
                      }
                      fullWidth
                      margin="dense"
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                    <Typography variant="body2">Category: {product.category}</Typography>
                    <Typography variant="body2">Brand: {product.brand}</Typography>
                    <Typography variant="body2">Stock: {product.stock_quantity}</Typography>
                    <Typography variant="body2">Price: ${product.price}</Typography>
                    <Typography variant="body2">
                      Image:{" "}
                      <a href={product.image_url} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </Typography>
                  </>
                )}

                <div style={{ marginTop: "10px" }}>
                  {editStates[product._id] ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(product._id)}
                        style={{ marginRight: "10px" }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditToggle(product._id)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => handleEditToggle(product._id)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
