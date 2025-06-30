const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    conductorName: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration: { type: String, required: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    videoClips: [{ type: String }],
    coverImage: { type: String },
    attachments: [{ type: String }],
    enrollmentKey: { type: String, required: true },
    studentsEnrolled: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        approved: { type: Boolean, default: false }
      }
    ],
    visible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
