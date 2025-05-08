import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCT_URL,
});

export const getAllProducts = (page = 1) => API.get(`/?page=${page}`);
export const getLowStockProducts = () => API.get("/low-stock");
export const addProduct = (data) => API.post("/", data);
export const updateProduct = (id, data) => API.put(`/${id}`, data);
export const deleteProduct = (id) => API.delete(`/${id}`);
