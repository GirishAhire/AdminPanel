import React, { useEffect, useState } from "react";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import {
  Typography,
  Grid,
  Pagination,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} from "../services/api";
import ProductCard from "../components/ProductCard";
import EditProductDialog from "../components/EditProductDialog";
import Sidebar from "../components/Dashboard/Sidebar";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getAllProducts(page)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  useEffect(() => {
    getLowStockProducts()
      .then((res) => {
        setLowStockCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

  const handleChange = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  const handleSave = () => {
    updateProduct(selectedProduct._id, selectedProduct)
      .then(() => {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === selectedProduct._id ? selectedProduct : p
          )
        );
        setOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/admin/login";
  };

  const cardStyle = {
    p: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    width: "100%",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: 6,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : 300,
          flexShrink: 0,
          borderRight: isSmallScreen ? "none" : "1px solid #e0e0e0",
          overflowY: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Sidebar
          loading={loading}
          lowStockCount={lowStockCount}
          onLogout={handleLogout}
          cardStyle={cardStyle}
          theme={theme}
          isSmallScreen={isSmallScreen}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: isSmallScreen ? 2 : 4,
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >

        <Typography
          variant="h5"
          fontWeight={800}
          color="primary"
          gutterBottom
          sx={{
            letterSpacing: 0.5,
            mb: 3,
            pb: 1,
            borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Inventory2Icon color="primary" sx={{ mr: 1 }} />
          Manage All Products
        </Typography>


        <ProductCard
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>

        <EditProductDialog
          open={open}
          onClose={() => setOpen(false)}
          product={selectedProduct}
          onChange={handleChange}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
};

export default ManageProducts;
