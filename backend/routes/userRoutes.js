const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Course = require("../models/Course"); // ✅ FIXED
const EnrollmentRequest = require("../models/CourseEnrollmentRequest");
// ✅ Update profile
router.put("/me", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, birthday, nic, username, password } = req.body;

    const updateData = { firstName, lastName, email, birthday, nic, username };

    if (req.file) {
      updateData.profileImage = `uploads/${req.file.filename}`;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, updateData, { new: true });

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// ✅ Delete profile
router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Get a user's enrollment requests with course info
router.get("/:userId/enrollments", async (req, res) => {
  try {
    const [pending, courses] = await Promise.all([
      EnrollmentRequest.find({ userId: req.params.userId }).populate("courseId"),
      Course.find({ "studentsEnrolled.userId": req.params.userId })
    ]);

    const approved = courses.map(course => {
      const enrolled = course.studentsEnrolled.find(en => en.userId.toString() === req.params.userId);
      return {
        courseId: course._id,
        courseTitle: course.title,
        approved: enrolled.approved,
        status: "approved"
      };
    });

    const formattedPending = pending.map(p => ({
      courseId: p.courseId._id,
      courseTitle: p.courseId.title,
      approved: false,
      status: "pending",
      requestId: p._id
    }));

    res.json([...approved, ...formattedPending]);
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    res.status(500).json({ message: "Failed to fetch enrollments" });
  }
});


// Update enrollment approval status
router.put("/:userId/enrollments/:courseId", async (req, res) => {
  const { approved } = req.body;
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = course.studentsEnrolled.find(
      en => en.userId.toString() === req.params.userId
    );
    if (student) {
      student.approved = approved;
      await course.save();
    }

    await EnrollmentRequest.findOneAndUpdate(
      { userId: req.params.userId, courseId: req.params.courseId },
      { approved },
      { new: true }
    );

    res.json({ message: "Enrollment updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update enrollment" });
  }
});



module.exports = router;
