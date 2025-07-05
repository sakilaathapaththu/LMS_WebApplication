const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["mcq", "dropdown"], required: true },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  timeLimit: { type: Number, default: 300 }, // time in seconds (e.g. 5 minutes)
  questions: [questionSchema]
}, { timestamps: true });


module.exports = mongoose.model("Quiz", quizSchema);
