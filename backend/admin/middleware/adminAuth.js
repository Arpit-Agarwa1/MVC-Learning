import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
  try {
    const token = req.cookies.adminToken; // ✅ from cookie

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default adminAuth;
