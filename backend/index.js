import express from "express";
import cors from "cors";

import connectDB from "./database/connectDB.js";
import userRouter from "./Router/router.js";

import cookieParser from "cookie-parser";
import productRouter from "./Router/productrouter.js";
import cartRouter from "./Router/cartRoute.js";
import authRoutes from "./Router/authRoutes.js";
import env from "dotenv";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // 🔥 THIS LINE IS MUST
  credentials: true, // 🔥 THIS LINE IS MUST
}; //frontend port

app.use(cors(corsOptions));
await connectDB();
app.use(cookieParser());

//products

// serve images
app.use("/uploads", express.static("uploads"));

app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRoutes);

//
app.use(cookieParser());
app.use("/user", userRouter);
app.listen(PORT, () => console.log(`Server is running on port`, PORT));
