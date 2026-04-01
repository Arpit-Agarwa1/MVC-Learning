import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controller/cartController.js";

const router = express.Router();

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.delete("/remove/:id", removeFromCart);

export default router;
