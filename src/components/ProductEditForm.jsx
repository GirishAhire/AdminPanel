import React from "react";
import { TextField, Button, Box } from "@mui/material";

const ProductEditForm = ({ product, onChange, onSave, onCancel }) => {
    const fields = [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "brand", label: "Brand", type: "text" },
        { name: "stock_quantity", label: "Stock Quantity", type: "number" },
        { name: "price", label: "Price", type: "number" },
        { name: "image_url", label: "Image URL", type: "text" },
    ];

    return (
        <>
            {fields.map(({ name, label, type }) => (
                <TextField
                    key={name}
                    label={label}
                    type={type}
                    value={product[name]}
                    onChange={(e) => onChange(product._id, name, e.target.value)}
                    fullWidth
                    margin="dense"
                />
            ))}

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => onSave(product._id)}
                    sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => onCancel(product._id)}
                    sx={{ fontWeight: 600, textTransform: "none", borderRadius: 2 }}
                >
                    Cancel
                </Button>
            </Box>
        </>
    );
};

export default ProductEditForm;
