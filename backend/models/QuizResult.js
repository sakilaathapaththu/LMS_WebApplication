const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  answers: [
    {
      questionId: String,
      questionText: String,       // ✅ Add this
      correctAnswer: String,      // ✅ Add this
      selectedAnswer: String,
      correct: Boolean
    }
  ],
  score: Number
}, { timestamps: true });

module.exports = mongoose.model("QuizResult", quizResultSchema);
