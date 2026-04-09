import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controller/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.delete("/remove/:id", authMiddleware, removeFromCart);

export default router;
