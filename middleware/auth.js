// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const secret = process.env.JWT_SECRET || "DEV_SECRET_KEY";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = decoded; // ذخیره اطلاعات کاربر در request
    next();
  });
};
