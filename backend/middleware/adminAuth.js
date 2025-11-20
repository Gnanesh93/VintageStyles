import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ success: false, message: "Not Authorized! Login again" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ success: false, message: "Not Authorized! Admin only" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("adminAuth error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default adminAuth;
