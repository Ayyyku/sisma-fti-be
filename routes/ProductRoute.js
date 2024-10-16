import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import { VerifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get("/products", VerifyUser, getProducts);
router.get("/products/:id", VerifyUser, getProductById);
router.post("/products/", VerifyUser, createProduct);
router.patch("/products/:id", VerifyUser, updateProduct);
router.delete("/products/:id", VerifyUser, deleteProduct);

export default router;
