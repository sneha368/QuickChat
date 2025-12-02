//middleware to protect route
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export const protectRoute=async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "jwt must be provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ success: false, message: "jwt must be provided" });
  }
};