const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const upload = require("../middlewares/upload");
const Course = require("../models/Course");
const EnrollmentRequest = require("../models/CourseEnrollmentRequest");
const auth = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "sakila";
const sanitizeCourse = require("../utils/sanitizeCourse");

router.post(
  "/add",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "attachments", maxCount: 5 }
  ]),
  courseController.addCourse
);
// Get all visible courses
// router.get("/all", async (req, res) => {
//   try {
//     const courses = await Course.find({ visible: true });
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch courses" });
//   }
// });

router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find({ visible: true });
    const safeCourses = courses.map(course => sanitizeCourse(course));
    res.json(safeCourses);
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



router.get("/:courseId/access", auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const match = course.studentsEnrolled.find(
      en => en?.userId?.toString?.() === userId && en?.approved === true
    );

    if (!match) {
      return res.status(403).json({ message: "Not approved for this course" });
    }

    // 🔐 Only return safe fields
    res.status(200).json({
      title: course.title,
      description: course.description,
      coverImage: course.coverImage,
      category: course.category,
      conductorName: course.conductorName,
      duration: course.duration,
      level: course.level,
      videoCount: course.videoClips?.length || 0
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// router.get("/my", auth, async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     const courses = await Course.find({ visible: true });

//     const result = courses.map(course => {
//       const match = course.studentsEnrolled.find(en =>
//         en?.userId?.toString?.() === userId && en?.approved === true
//       );

//       return {
//         ...course.toObject(),
//         isApproved: !!match
//       };
//     });

//     res.json(result);
//   } catch (err) {
//     console.error("Error in /courses/my:", err);
//     res.status(500).json({ message: "Failed to fetch user courses" });
//   }
// });
router.get("/my", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const courses = await Course.find({ visible: true });

    const result = courses.map(course => {
      const isApproved = course.studentsEnrolled.some(
        en => en?.userId?.toString?.() === userId && en?.approved
      );
      return sanitizeCourse(course, { includeIsApproved: isApproved });
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /courses/my:", err);
    res.status(500).json({ message: "Failed to fetch user courses" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete course" });
  }
});

// Update course (basic info only)
router.put("/:id", async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      conductorName,
      category,
      level,
      duration,
      enrollmentKey,
      visible,
      videoClips,
      prerequisites
    } = req.body;

    const updateData = {
      courseId,
      title,
      description,
      conductorName,
      category,
      level,
      duration,
      enrollmentKey,
      visible,
      videoClips: Array.isArray(videoClips) ? videoClips : JSON.parse(videoClips),
      prerequisites: Array.isArray(prerequisites) ? prerequisites : JSON.parse(prerequisites),
    };

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "Course updated", course: updatedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update course" });
  }
});

// Secure video access route (update this block only)
router.get("/:courseId/video/:index", async (req, res) => {
  try {
    const token = req.query.token; // ✅ GET FROM QUERY STRING

    if (!token) return res.status(403).send("No token");

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const { courseId, index } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    const isApproved = course.studentsEnrolled.some(
      en => en?.userId?.toString?.() === userId && en?.approved
    );
    if (!isApproved) return res.status(403).send("Access denied");

    const rawUrl = course.videoClips?.[index];
    if (!rawUrl) return res.status(404).send("Video not found");

    const match = rawUrl.match(/\/d\/([^/]+)/);
    if (!match) return res.status(400).send("Invalid URL");

    const fileId = match[1];
    return res.redirect(`https://drive.google.com/file/d/${fileId}/preview`);
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
});




module.exports = router;
