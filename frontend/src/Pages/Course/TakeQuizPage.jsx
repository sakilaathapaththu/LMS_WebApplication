import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  MenuItem,
  Select,
  Button,
  Paper,
} from "@mui/material";
import API from "../../Utils/api";
import { useParams } from "react-router-dom";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

const TakeQuizPage = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timers, setTimers] = useState({});
  const [activeQuizzes, setActiveQuizzes] = useState({});

  useEffect(() => {
    API.get(`/quizzes/course/${courseId}`)
      .then(async (quizRes) => {
        const quizzes = Array.isArray(quizRes.data) ? quizRes.data : [];

        const resultRes = await API.get(`/quizzes/result/${courseId}`);
        const resultArray = Array.isArray(resultRes.data) ? resultRes.data : [];

        const now = Date.now();
        const quizWithStatus = quizzes.map((quiz) => {
          const userResult = resultArray.find((r) => r.quizId === quiz.quizId);
          const storedStart = localStorage.getItem(`quiz-start-${quiz.quizId}`);

          let started = false;
          let timeLeft = quiz.timeLimit;

          if (!userResult && storedStart) {
            const elapsed = Math.floor((now - Number(storedStart)) / 1000);
            timeLeft = Math.max(quiz.timeLimit - elapsed, 0);
            started = true;
          }

          return {
            ...quiz,
            submitted: !!userResult,
            answers: userResult?.answers || [],
            score: userResult?.score || null,
            timeLeft,
            started,
          };
        });

        setQuizzes(quizWithStatus);

        // ✅ Restart intervals for quizzes that were already started
        quizWithStatus.forEach((quiz, index) => {
          if (quiz.started && !quiz.submitted) {
            const storedStart = localStorage.getItem(
              `quiz-start-${quiz.quizId}`
            );
            if (storedStart) {
              const interval = setInterval(() => {
                setQuizzes((prev) => {
                  const updated = [...prev];
                  const elapsed = Math.floor(
                    (Date.now() - Number(storedStart)) / 1000
                  );
                  const remaining = quiz.timeLimit - elapsed;

                  updated[index].timeLeft = Math.max(remaining, 0);

                  if (remaining <= 0) {
                    clearInterval(interval);
                    handleSubmit(quiz.quizId, index);
                  }

                  return updated;
                });
              }, 1000);

              setTimers((prev) => ({ ...prev, [quiz.quizId]: interval }));
            }
          }
        });
      })
      .catch(() => alert("❌ Failed to load quizzes or results"));
  }, [courseId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause: Clear all timers
        Object.values(timers).forEach(clearInterval);
      } else {
        // Resume: Recalculate and restart each quiz timer
        quizzes.forEach((quiz, index) => {
          if (quiz.started && !quiz.submitted) {
            const storedStart = localStorage.getItem(
              `quiz-start-${quiz.quizId}`
            );
            if (storedStart) {
              const interval = setInterval(() => {
                setQuizzes((prev) => {
                  const updated = [...prev];
                  const elapsed = Math.floor(
                    (Date.now() - Number(storedStart)) / 1000
                  );
                  const remaining = quiz.timeLimit - elapsed;

                  updated[index].timeLeft = Math.max(remaining, 0);

                  if (remaining <= 0) {
                    clearInterval(interval);
                    handleSubmit(quiz.quizId, index);
                  }

                  return updated;
                });
              }, 1000);

              setTimers((prev) => ({ ...prev, [quiz.quizId]: interval }));
            }
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quizzes, timers]);

  const startQuiz = (quizId, quizIndex) => {
    const updated = [...quizzes];
    updated[quizIndex].started = true;

    const startTimestamp = Date.now();
    localStorage.setItem(`quiz-start-${quizId}`, startTimestamp.toString()); // ✅ store timestamp

    setQuizzes(updated);

    const interval = setInterval(() => {
      setQuizzes((prev) => {
        const updated = [...prev];
        const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
        const remaining = updated[quizIndex].timeLimit - elapsed;

        updated[quizIndex].timeLeft = Math.max(remaining, 0);

        // Auto-submit if time is up
        if (remaining <= 0) {
          clearInterval(interval);
          handleSubmit(quizId, quizIndex);
        }

        return updated;
      });
    }, 1000);

    setTimers((prev) => ({ ...prev, [quizId]: interval }));
  };

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (quizId, quizIndex) => {
    const quiz = quizzes[quizIndex];

    // ✅ Prevent undefined crash
    if (!quiz || !quiz.questions) {
      console.warn("Quiz or questions not available for submission.");
      return;
    }

    const structuredAnswers = quiz.questions.map((q, i) => ({
      questionId: q._id,
      selectedAnswer: answers[`${quizIndex}-${i}`] || "",
    }));

    try {
      const res = await API.post(`/quizzes/submit/${courseId}`, {
        quizId,
        answers: structuredAnswers,
      });

      const updated = [...quizzes];
      updated[quizIndex] = {
        ...updated[quizIndex],
        submitted: true,
        score: res.data.score,
        started: false,
        answers: res.data.results,
        questions: updated[quizIndex].questions.map((q, i) => ({
          ...q,
          correctAnswer: res.data.results[i]?.correctAnswer,
        })),
      };
      setQuizzes(updated);
      clearInterval(timers[quizId]);
    } catch (err) {
      alert(err?.response?.data?.message || "❌ Failed to submit quiz");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f7f9fc", minHeight: "100vh" }}>
      <HomePageNavbar />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          📘 Quiz
        </Typography>

        {quizzes.map((quiz, quizIndex) => {
          const quizId = quiz.quizId;
          const disabled =
            quiz.submitted || !quiz.started || quiz.timeLeft <= 0;

          return (
            <Box key={quizId} sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                📝 Quiz {quizIndex + 1}{" "}
                {quiz.submitted
                  ? "✔️ Completed"
                  : quiz.started
                  ? `⏱️ ${quiz.timeLeft}s`
                  : ""}
              </Typography>

              {!quiz.submitted && !quiz.started && (
                <Button
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => startQuiz(quizId, quizIndex)}
                >
                  ▶️ Start Quiz {quizIndex + 1}
                </Button>
              )}

              {quiz.started || quiz.submitted ? (
                <>
                  {quiz.questions.map((q, i) => {
                    const key = `${quizIndex}-${i}`;
                    const userAnswer = quiz.answers.find(
                      (a) => a.questionId === q._id
                    )?.selectedAnswer;
                    const isCorrect = quiz.answers.find(
                      (a) => a.questionId === q._id
                    )?.correct;

                    return (
                      <Paper key={i} sx={{ mb: 3, p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Q{i + 1}. {q.questionText}
                        </Typography>

                        {q.type === "mcq" ? (
                          <FormControl>
                            <RadioGroup
                              value={answers[key] || ""}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                            >
                              {q.options.map((opt, j) => (
                                <FormControlLabel
                                  key={j}
                                  value={opt}
                                  control={<Radio disabled={disabled} />}
                                  label={opt}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              value={answers[key] || ""}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              displayEmpty
                              disabled={disabled}
                            >
                              <MenuItem value="">Select an answer</MenuItem>
                              {q.options.map((opt, j) => (
                                <MenuItem key={j} value={opt}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}

                        {quiz.submitted && (
                          <Typography
                            sx={{ mt: 1 }}
                            color={isCorrect ? "green" : "error"}
                          >
                            {isCorrect
                              ? "✅ Correct"
                              : `❌ Incorrect (Correct: ${q.correctAnswer})`}
                            <br />
                            Your Answer: {userAnswer}
                          </Typography>
                        )}
                      </Paper>
                    );
                  })}

                  {!quiz.submitted && quiz.timeLeft > 0 && (
                    <Button
                      variant="contained"
                      onClick={() => handleSubmit(quizId, quizIndex)}
                      sx={{ mt: 2 }}
                    >
                      Submit Quiz {quizIndex + 1}
                    </Button>
                  )}

                  {quiz.submitted && (
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      🏁 Your Score: {quiz.score} / {quiz.questions.length}
                    </Typography>
                  )}
                </>
              ) : null}
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default TakeQuizPage;
