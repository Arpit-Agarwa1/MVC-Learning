import express, { response } from "express";
import UserModel from "../model/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const data = req.body;
    const userForm = new UserModel(data);
    const hashedPassword = await bcrypt.hash(userForm.password, 10); // ✅ FIXED: Await the password field
    userForm.password = hashedPassword; // ✅ FIXED: Assign the hashed password back to the userForm

    await userForm.save();
    res.json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
}

export async function records(req, res) {
  try {
    const allRecords = await UserModel.find();
    res.json(allRecords);
  } catch (error) {
    console.error("Error fetching records:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch records", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set to true in production (requires HTTPS)
      sameSite: process.env.SAMESITE,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email, phone, gender, dob, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, gender, dob, username },
      { returnDocument: "after" }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserModel.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.SAMESITE === "production" ? "none" : "lax",
      secure: false, // true in production (https)
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};
