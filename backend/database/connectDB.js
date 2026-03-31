import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
