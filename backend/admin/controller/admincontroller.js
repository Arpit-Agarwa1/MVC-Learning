import AdminModel from "../model/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

export async function AdminLogin(req, res) {
  try {
    const { username, password } = req.body;

    const user = await AdminModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production (requires HTTPS)
      sameSite: "lax", // Adjust as needed (e.g., "strict" or "none")
    });
    // sameSite: process.env.SAMESITE,

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
}
export async function adminRecords(req, res) {
  try {
    const allRecords = await AdminModel.find();
    res.json(allRecords);
  } catch (error) {
    console.error("Error fetching records:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch records", error: error.message });
  }
}
