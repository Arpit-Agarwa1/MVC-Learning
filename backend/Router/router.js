import { Router } from "express";
import {
  records,
  register,
  login,
  updateUser,
  deleteUser,
  logout,
} from "../controller/userControl.js";
// import { verifyToken } from "../middleware/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const UserRouting = Router();

UserRouting.post("/logout", logout);
UserRouting.post("/register", register); // ✅ FIXED
// UserRouting.get("/records", records);
UserRouting.post("/login", login); // ✅ ADD THIS

// UserRouting.get("/records", verifyToken, records); // 🔐 protected
UserRouting.get("/records", authMiddleware, records);

UserRouting.get("/check", authMiddleware, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

UserRouting.put("/update/:id", authMiddleware, updateUser);
UserRouting.delete("/delete/:id", authMiddleware, deleteUser);

export default UserRouting;
