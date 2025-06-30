const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const upload = require("../middlewares/upload");
const Course = require("../models/Course");
const EnrollmentRequest = require("../models/CourseEnrollmentRequest");
const auth = require("../middlewares/authMiddleware");

router.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "attachments", maxCount: 5 }
  ]),
  courseController.addCourse
);
// Get all visible courses
router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find({ visible: true });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

router.post("/enroll", auth, async (req, res) => {
  const { courseId, enrollmentKey } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  if (enrollmentKey !== course.enrollmentKey)
    return res.status(400).json({ message: "Invalid enrollment key" });

  const existing = await EnrollmentRequest.findOne({ userId: req.user.userId, courseId });
  if (existing) return res.status(400).json({ message: "Already requested/enrolled" });

  const request = new EnrollmentRequest({ userId: req.user.userId, courseId, enrollmentKey });
  await request.save();

  res.status(200).json({ message: "Enrollment request submitted. Awaiting admin approval." });
});

// Access course content (only if approved)
// Access course content (only if approved)
router.get("/:courseId/access", auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const match = course.studentsEnrolled.find(en =>
      en?.userId?.toString?.() === userId && en?.approved === true
    );

    if (!match) {
      return res.status(403).json({ message: "Not approved for this course" });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const courses = await Course.find({ visible: true });

    const result = courses.map(course => {
      const match = course.studentsEnrolled.find(en =>
        en?.userId?.toString?.() === userId && en?.approved === true
      );

      return {
        ...course.toObject(),
        isApproved: !!match
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /courses/my:", err);
    res.status(500).json({ message: "Failed to fetch user courses" });
  }
});




module.exports = router;
