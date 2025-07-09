const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

// module.exports = auth;
const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);

    // ✅ Strict check: ensure this token matches the one saved in DB
    if (!user || user.currentToken !== token) {
      return res.status(401).json({ message: "Session expired or logged in elsewhere" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;