import React, { useEffect, useState } from "react";
import { getLowStockProducts, updateProduct, deleteProduct } from "../services/api";
import ProductList from "../components/ProductList";

const ManageLowStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getLowStockProducts().then((res) => setProducts(res.data.products));
  }, []);

  const handleUpdate = (id, updatedData) => {
    updateProduct(id, updatedData).then(() =>
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
      )
    );
  };

  const handleDelete = (id) => {
    deleteProduct(id).then(() =>
      setProducts((prev) => prev.filter((p) => p._id !== id))
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Low Stock Products</h2>
      <ProductList products={products} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default ManageLowStock;
