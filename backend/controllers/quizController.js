const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

exports.addQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Quiz must have at least one question" });
    }

    const quiz = new Quiz({ courseId, questions });
    await quiz.save();

    res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

exports.getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quiz = await Quiz.findOne({ courseId });

    if (!quiz) {
      return res.status(404).json({ message: "No quiz found for this course" });
    }

    // Do not send correct answers to users
    const questions = quiz.questions.map(q => ({
      _id: q._id,
      question: q.question,
      type: q.type,
      options: q.options
    }));

    res.json({ quizId: quiz._id, courseId: quiz.courseId, questions });
  } catch (err) {
    res.status(500).json({ message: "Error loading quiz" });
  }
};

exports.submitAnswers = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let correctCount = 0;
    const results = quiz.questions.map((q, idx) => {
      const given = answers[idx];
      const isCorrect = given === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: given,
        isCorrect
      };
    });

    res.json({ total: quiz.questions.length, correct: correctCount, results });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};
