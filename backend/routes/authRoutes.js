const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);

// ✅ ADD THIS
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      nic: user.nic,
      birthday: user.birthday,
      profileImage: user.profileImage
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
});

module.exports = router;
