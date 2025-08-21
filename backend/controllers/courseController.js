// const Course = require("../models/Course");

// exports.addCourse = async (req, res) => {
//   try {
//     const {
//       courseId,
//       title,
//       description,
//       conductorName,
//       category,
//       level,
//       duration,
//       videoClips,
//       prerequisites,
//       enrollmentKey,
//       visible
//     } = req.body;

//     const coverImage = req.files["coverImage"]?.[0]?.path;
//     const attachments = req.files["attachments"]?.map((f) => f.path) || [];

//     const newCourse = new Course({
//       courseId,
//       title,
//       description,
//       conductorName,
//       category,
//       level,
//       duration,
//       prerequisites: prerequisites ? JSON.parse(prerequisites) : [],
//       videoClips: videoClips ? JSON.parse(videoClips) : [],
//       coverImage,
//       attachments,
//       enrollmentKey,
//       visible: visible === "true"
//     });

//     await newCourse.save();

//     res.status(201).json({ message: "Course added successfully", course: newCourse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error adding course", error: err.message });
//   }
// };
const Course = require("../models/Course");
const { uploadToVercelBlob } = require("../middleware/upload");

// Add Course (cover image + multiple attachments to Vercel Blob)
exports.addCourse = async (req, res) => {
  try {
    const {
      courseId,
      title,
      description,
      conductorName,
      category,
      level,
      duration,
      videoClips,
      prerequisites,
      enrollmentKey,
      visible,
    } = req.body;

    // ⬇️ Upload cover image if provided (multer memory buffer)
    const coverFile = req.files?.["coverImage"]?.[0] || null;
    const coverImage = coverFile
      ? await uploadToVercelBlob(coverFile, "course-covers")
      : null;

    // ⬇️ Upload each attachment (if any)
    const rawAttachments = Array.isArray(req.files?.["attachments"])
      ? req.files["attachments"]
      : [];

    const attachments = await Promise.all(
      rawAttachments.map((f) => uploadToVercelBlob(f, "course-attachments"))
    );

    const newCourse = new Course({
      courseId,
      title,
      description,
      conductorName,
      category,
      level,
      duration,
      prerequisites: prerequisites ? JSON.parse(prerequisites) : [],
      videoClips: videoClips ? JSON.parse(videoClips) : [],
      coverImage,      // public Blob URL (or null)
      attachments,     // array of Blob URLs
      enrollmentKey,
      visible: visible === "true",
    });

    await newCourse.save();

    return res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error adding course", error: err.message });
  }
};
