import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
} from "../controller/productcontroller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// single image upload
router.post(
  "/add",
  () => console.log("Pass 0"),
  upload.single("image"),
  createProduct
);
router.get("/products", getProducts);
// get single product
router.get("/:id", getSingleProduct);

export default router;
