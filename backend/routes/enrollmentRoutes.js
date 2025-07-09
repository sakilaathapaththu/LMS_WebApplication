const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const EnrollmentRequest = require("../models/CourseEnrollmentRequest");
const Course = require("../models/Course");


// Approve enrollment with debug logging
router.post("/approve", auth, async (req, res) => {
  const { requestId } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const request = await EnrollmentRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const course = await Course.findById(request.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const alreadyEnrolled = course.studentsEnrolled.some(
      s => s.userId && s.userId.toString() === request.userId.toString()
    );


    if (!alreadyEnrolled) {
      course.studentsEnrolled.push({
        userId: request.userId,
        approved: true
      });
      await course.save();
    }

    await EnrollmentRequest.findByIdAndDelete(requestId);

    res.json({ message: "Enrollment approved" });
  } catch (err) {
    console.error("🔴 Approval failed:", err);
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
});



// Reject enrollment
router.post("/reject", auth, async (req, res) => {
  const { requestId } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await EnrollmentRequest.findByIdAndDelete(requestId);

    res.json({ message: "Enrollment rejected" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
});

// Get pending requests count
router.get("/count", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const count = await EnrollmentRequest.countDocuments();
    res.json({ pendingCount: count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch count" });
  }
});
// GET all pending enrollment requests
router.get("/pending", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const requests = await EnrollmentRequest.find({ status: "pending" })
      .populate("userId", "username email")
      .populate("courseId", "title");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to load requests" });
  }
});


router.get("/enrollments/counted", async (req, res) => {
  try {
    const pendingCount = await EnrollmentRequest.countDocuments();

    // Count total enrolled students from all courses
    const courses = await Course.find({}, "studentsEnrolled");
    let totalEnrolled = 0;

    for (const course of courses) {
      totalEnrolled += course.studentsEnrolled.length;
    }

    res.json({
      pendingCount,
      total: totalEnrolled
    });
  } catch (err) {
    console.error("Failed to count enrollments:", err);
    res.status(500).json({ message: "Failed to count enrollments" });
  }
});



module.exports = router;
