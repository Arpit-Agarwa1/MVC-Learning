import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
} from "../controller/productcontroller.js";
import upload from "../middleware/upload.js";
import { get } from "http";

const router = express.Router();

// single image upload
router.post("/add", upload.single("image"), createProduct);
router.get("/products", getProducts);
// get single product
router.get("/:id", getSingleProduct);

export default router;
