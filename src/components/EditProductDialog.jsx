import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
} from "@mui/material";

const EditProductDialog = ({ open, onClose, product, onChange, onSave }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
        sx: {
            borderRadius: 3,
            p: 1,
        }
    }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#1f2937", pb: 0.5 }}>
            Edit Product Details
        </DialogTitle>

        <DialogContent dividers>
            {product && (
                <Box component="form" noValidate autoComplete="off">
                    {["name", "description", "category", "brand", "image_url"].map((field) => (
                        <TextField
                            key={field}
                            label={field.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                            value={product[field]}
                            onChange={(e) => onChange(field, e.target.value)}
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 1 }}
                        />
                    ))}

                    <TextField
                        label="Price (₹)"
                        type="number"
                        value={product.price}
                        onChange={(e) => onChange("price", e.target.value)}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        label="Stock Quantity"
                        type="number"
                        value={product.stock_quantity}
                        onChange={(e) => onChange("stock_quantity", e.target.value)}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
            )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} color="secondary" variant="outlined" sx={{ borderRadius: 2 }}>
                Cancel
            </Button>
            <Button onClick={onSave} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

export default EditProductDialog;
