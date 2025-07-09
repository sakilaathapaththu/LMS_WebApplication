const Course = require("../models/Course");

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
      visible
    } = req.body;

    const coverImage = req.files["coverImage"]?.[0]?.path;
    const attachments = req.files["attachments"]?.map((f) => f.path) || [];

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
      coverImage,
      attachments,
      enrollmentKey,
      visible: visible === "true"
    });

    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding course", error: err.message });
  }
};
