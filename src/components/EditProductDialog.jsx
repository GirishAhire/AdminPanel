import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

const EditProductDialog = ({ open, onClose, product, onChange, onSave }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
            {product && (
                <>
                    {["name", "description", "category", "brand", "image_url"].map((field) => (
                        <TextField
                            key={field}
                            label={field.replace("_", " ").toUpperCase()}
                            value={product[field]}
                            onChange={(e) => onChange(field, e.target.value)}
                            fullWidth
                            margin="dense"
                        />
                    ))}
                    <TextField
                        label="Price"
                        type="number"
                        value={product.price}
                        onChange={(e) => onChange("price", e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Stock Quantity"
                        type="number"
                        value={product.stock_quantity}
                        onChange={(e) => onChange("stock_quantity", e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                </>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button onClick={onSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
    </Dialog>
);

export default EditProductDialog;
