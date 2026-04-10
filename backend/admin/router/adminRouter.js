import { Router } from "express";

import { AdminLogin, adminRecords } from "../controller/admincontroller.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRoute = Router();

adminRoute.post("/adminlogin", AdminLogin);
adminRoute.get("/checkadmin", adminAuth, (req, res) => {
  res.json({ message: "Admin authenticated", user: req.user });
});
adminRoute.get("/records", adminAuth, adminRecords);

export default adminRoute;
