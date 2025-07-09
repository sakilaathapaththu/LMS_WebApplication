const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

// Create a quiz (Admin)

router.post("/create", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { courseId, questions, timeLimit } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Quiz must have at least one question" });
    }

    const quiz = new Quiz({ courseId, questions, timeLimit });
    await quiz.save();

    res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    res.status(500).json({ message: "Failed to create quiz", error: err.message });
  }
});


router.get("/course/:courseId", auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });

    if (!quizzes.length) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    res.json(quizzes.map(q => ({
      quizId: q._id,
      courseId: q.courseId,
      timeLimit: q.timeLimit, // ✅ added here
      questions: q.questions.map(qq => ({
        _id: qq._id,
        questionText: qq.questionText,
        options: qq.options,
        type: qq.type
      }))
    })));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
});


// Submit quiz (User)
router.post("/submit/:courseId", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // ✅ Check if this quiz is already submitted
    const already = await QuizResult.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId,
      quizId
    });

    if (already) {
      return res.status(400).json({ message: "You have already submitted this quiz." });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    // const results = quiz.questions.map((q, i) => {
    //   const userAns = answers[i]?.selectedAnswer || "";
    //   const correct = q.correctAnswer === userAns;
    //   if (correct) score++;
    //   return {
    //     questionId: q._id.toString(),
    //     selectedAnswer: userAns,
    //     correct
    //   };
    // });
    const results = quiz.questions.map((q, i) => {
  const userAns = answers[i]?.selectedAnswer || "";
  const correct = q.correctAnswer === userAns;
  if (correct) score++;
  return {
    questionId: q._id.toString(),
    selectedAnswer: userAns,
    correct,
    correctAnswer: q.correctAnswer,
    questionText: q.questionText
  };
});


    const resultDoc = new QuizResult({
      quizId,
      userId: req.user.userId,
      courseId: req.params.courseId,
      answers: results,
      score
    });

    await resultDoc.save();
    res.json({ message: "Quiz submitted", score, total: quiz.questions.length, results });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit quiz", error: err.message });
  }
});


// quizzes.route.js
router.get("/result/:courseId", auth, async (req, res) => {
  try {
    const results = await QuizResult.find({
      userId: req.user.userId,
      courseId: req.params.courseId
    });

    res.json(results); // array of { quizId, score, answers }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch results" });
  }
});

// ✅ Admin-only: Get all quiz results grouped by user and course
router.get("/admin/all-results", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const results = await QuizResult.find({})
      .populate("userId", "firstName lastName email")
      .populate("courseId", "title")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    console.error("Failed to fetch all quiz results:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
