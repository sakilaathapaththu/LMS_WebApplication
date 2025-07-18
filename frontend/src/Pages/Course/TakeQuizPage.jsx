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
  Fade,
  Slide,
  Zoom,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Stack,
  alpha,
  Grow,
} from "@mui/material";
import {
  PlayArrow,
  Quiz,
  Timer,
  CheckCircle,
  AssignmentTurnedIn,
  School,
  TrendingUp,
  EmojiEvents,
} from "@mui/icons-material";
import API from "../../Utils/api";
import { useParams } from "react-router-dom";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

const TakeQuizPage = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timers, setTimers] = useState({});
  const [activeQuizzes, setActiveQuizzes] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

  // Professional color palette
  const theme = {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      gradient: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
    },
    secondary: {
      main: "#f8fafc",
      light: "#ffffff",
      dark: "#e2e8f0",
    },
    accent: {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
    },
  };

  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 300);
    
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = (quiz) => {
    if (!quiz.started) return 0;
    const elapsed = quiz.timeLimit - quiz.timeLeft;
    return (elapsed / quiz.timeLimit) * 100;
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.secondary.main} 0%, ${theme.secondary.light} 50%, ${alpha(theme.primary.light, 0.1)} 100%)`,
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.primary.main.slice(1)}' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
        },
      }}
    >
      <HomePageNavbar />
      
      <Container maxWidth="lg" sx={{ py: 6, position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <Fade in={pageLoaded} timeout={800}>
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              py: 4,
              position: "relative",
            }}
          >
            <Zoom in={pageLoaded} timeout={1000}>
              <School
                sx={{
                  fontSize: 64,
                  color: theme.primary.main,
                  mb: 2,
                  filter: "drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))",
                }}
              />
            </Zoom>
            <Typography
              variant="h3"
              sx={{
                background: theme.primary.gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 800,
                mb: 2,
                textShadow: "none",
              }}
            >
              Assessment Center
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
            >
              Test your knowledge and track your progress with our comprehensive quiz system
            </Typography>
          </Box>
        </Fade>

        {/* Quiz Cards */}
        <Stack spacing={4}>
          {quizzes.map((quiz, quizIndex) => {
            const quizId = quiz.quizId;
            const disabled = quiz.submitted || !quiz.started || quiz.timeLeft <= 0;
            const progress = getProgressPercentage(quiz);

            return (
              <Grow
                key={quizId}
                in={pageLoaded}
                timeout={600 + quizIndex * 200}
              >
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.primary.main, 0.1)}`,
                    background: theme.secondary.light,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: quiz.submitted
                        ? `linear-gradient(90deg, ${theme.accent.success}, ${theme.accent.success})`
                        : quiz.started
                        ? theme.primary.gradient
                        : `linear-gradient(90deg, ${alpha(theme.primary.main, 0.2)}, ${alpha(theme.primary.light, 0.2)})`,
                    },
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 20px 40px ${alpha(theme.primary.main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Quiz Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: quiz.submitted
                              ? `linear-gradient(135deg, ${theme.accent.success}, ${alpha(theme.accent.success, 0.8)})`
                              : quiz.started
                              ? theme.primary.gradient
                              : `linear-gradient(135deg, ${alpha(theme.primary.main, 0.1)}, ${alpha(theme.primary.light, 0.1)})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {quiz.submitted ? (
                            <CheckCircle sx={{ color: "white", fontSize: 24 }} />
                          ) : quiz.started ? (
                            <Timer sx={{ color: "white", fontSize: 24 }} />
                          ) : (
                            <Quiz sx={{ color: theme.primary.main, fontSize: 24 }} />
                          )}
                        </Box>
                        <Box>
                          <Typography variant="h5" fontWeight={700} color="primary">
                            Quiz {quizIndex + 1}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {quiz.questions?.length || 0} questions
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        {quiz.submitted && (
                          <Chip
                            icon={<EmojiEvents />}
                            label="Completed"
                            color="success"
                            variant="outlined"
                            sx={{
                              borderRadius: 3,
                              fontWeight: 600,
                              backgroundColor: alpha(theme.accent.success, 0.1),
                            }}
                          />
                        )}
                        {quiz.started && !quiz.submitted && (
                          <Chip
                            icon={<Timer />}
                            label={formatTime(quiz.timeLeft)}
                            color="primary"
                            variant="outlined"
                            sx={{
                              borderRadius: 3,
                              fontWeight: 600,
                              backgroundColor: alpha(theme.primary.main, 0.1),
                              animation: quiz.timeLeft < 60 ? "pulse 1s infinite" : "none",
                              "@keyframes pulse": {
                                "0%": { transform: "scale(1)" },
                                "50%": { transform: "scale(1.05)" },
                                "100%": { transform: "scale(1)" },
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Box>

                    {/* Progress Bar */}
                    {quiz.started && !quiz.submitted && (
                      <Box sx={{ mb: 3 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: alpha(theme.primary.main, 0.1),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 4,
                              background: theme.primary.gradient,
                            },
                          }}
                        />
                      </Box>
                    )}

                    {/* Start Button */}
                    {!quiz.submitted && !quiz.started && (
                      <Slide direction="up" in={pageLoaded} timeout={800 + quizIndex * 100}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<PlayArrow />}
                          onClick={() => startQuiz(quizId, quizIndex)}
                          sx={{
                            borderRadius: 3,
                            py: 1.5,
                            px: 4,
                            background: theme.primary.gradient,
                            boxShadow: `0 8px 24px ${alpha(theme.primary.main, 0.3)}`,
                            "&:hover": {
                              background: theme.primary.gradient,
                              transform: "translateY(-2px)",
                              boxShadow: `0 12px 32px ${alpha(theme.primary.main, 0.4)}`,
                            },
                            mb: 3,
                          }}
                        >
                          Start Quiz {quizIndex + 1}
                        </Button>
                      </Slide>
                    )}

                    {/* Questions */}
                    {(quiz.started || quiz.submitted) && (
                      <Box sx={{ mt: 3 }}>
                        {quiz.questions?.map((q, i) => {
                          const key = `${quizIndex}-${i}`;
                          const userAnswer = quiz.answers.find(
                            (a) => a.questionId === q._id
                          )?.selectedAnswer;
                          const isCorrect = quiz.answers.find(
                            (a) => a.questionId === q._id
                          )?.correct;

                          return (
                            <Fade key={i} in={true} timeout={500 + i * 100}>
                              <Paper
                                elevation={0}
                                sx={{
                                  mb: 3,
                                  p: 3,
                                  borderRadius: 3,
                                  border: `1px solid ${alpha(theme.primary.main, 0.1)}`,
                                  background: theme.secondary.light,
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    boxShadow: `0 8px 24px ${alpha(theme.primary.main, 0.08)}`,
                                  },
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{ mb: 2, fontWeight: 600, color: theme.primary.dark }}
                                >
                                  Question {i + 1}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                  {q.questionText}
                                </Typography>

                                {q.type === "mcq" ? (
                                  <FormControl>
                                    <RadioGroup
                                      value={answers[key] || ""}
                                      onChange={(e) => handleChange(key, e.target.value)}
                                    >
                                      {q.options?.map((opt, j) => (
                                        <FormControlLabel
                                          key={j}
                                          value={opt}
                                          control={
                                            <Radio
                                              disabled={disabled}
                                              sx={{
                                                "&.Mui-checked": {
                                                  color: theme.primary.main,
                                                },
                                              }}
                                            />
                                          }
                                          label={opt}
                                          sx={{
                                            mb: 1,
                                            "& .MuiFormControlLabel-label": {
                                              fontSize: "0.95rem",
                                            },
                                          }}
                                        />
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                ) : (
                                  <FormControl fullWidth>
                                    <Select
                                      value={answers[key] || ""}
                                      onChange={(e) => handleChange(key, e.target.value)}
                                      displayEmpty
                                      disabled={disabled}
                                      sx={{
                                        borderRadius: 2,
                                        "& .MuiSelect-select": {
                                          py: 1.5,
                                        },
                                      }}
                                    >
                                      <MenuItem value="">Select an answer</MenuItem>
                                      {q.options?.map((opt, j) => (
                                        <MenuItem key={j} value={opt}>
                                          {opt}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                )}

                                {quiz.submitted && (
                                  <Box
                                    sx={{
                                      mt: 2,
                                      p: 2,
                                      borderRadius: 2,
                                      backgroundColor: isCorrect
                                        ? alpha(theme.accent.success, 0.1)
                                        : alpha(theme.accent.error, 0.1),
                                      border: `1px solid ${
                                        isCorrect ? theme.accent.success : theme.accent.error
                                      }`,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: isCorrect ? theme.accent.success : theme.accent.error,
                                        fontWeight: 600,
                                        mb: 1,
                                      }}
                                    >
                                      {isCorrect ? "✓ Correct Answer" : "✗ Incorrect Answer"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Your Answer: {userAnswer || "Not answered"}
                                    </Typography>
                                    {!isCorrect && (
                                      <Typography variant="body2" color="text.secondary">
                                        Correct Answer: {q.correctAnswer}
                                      </Typography>
                                    )}
                                  </Box>
                                )}
                              </Paper>
                            </Fade>
                          );
                        })}

                        {/* Submit Button */}
                        {!quiz.submitted && quiz.timeLeft > 0 && (
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={<AssignmentTurnedIn />}
                            onClick={() => handleSubmit(quizId, quizIndex)}
                            sx={{
                              borderRadius: 3,
                              py: 1.5,
                              px: 4,
                              background: theme.primary.gradient,
                              boxShadow: `0 8px 24px ${alpha(theme.primary.main, 0.3)}`,
                              "&:hover": {
                                background: theme.primary.gradient,
                                transform: "translateY(-2px)",
                                boxShadow: `0 12px 32px ${alpha(theme.primary.main, 0.4)}`,
                              },
                            }}
                          >
                            Submit Quiz {quizIndex + 1}
                          </Button>
                        )}

                        {/* Score Display */}
                        {quiz.submitted && (
                          <Box
                            sx={{
                              mt: 3,
                              p: 3,
                              borderRadius: 3,
                              background: `linear-gradient(135deg, ${alpha(theme.accent.success, 0.1)}, ${alpha(theme.accent.success, 0.05)})`,
                              border: `1px solid ${alpha(theme.accent.success, 0.2)}`,
                              textAlign: "center",
                            }}
                          >
                            <TrendingUp
                              sx={{
                                fontSize: 32,
                                color: theme.accent.success,
                                mb: 1,
                              }}
                            />
                            <Typography
                              variant="h5"
                              sx={{
                                color: theme.accent.success,
                                fontWeight: 700,
                                mb: 1,
                              }}
                            >
                              Final Score: {quiz.score} / {quiz.questions?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {quiz.score === quiz.questions?.length
                                ? "Perfect score! Excellent work!"
                                : `${Math.round((quiz.score / (quiz.questions?.length || 1)) * 100)}% - Keep practicing!`}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grow>
            );
          })}
        </Stack>

        {quizzes.length === 0 && (
          <Fade in={pageLoaded} timeout={1000}>
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                color: "text.secondary",
              }}
            >
              <Quiz sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6">No quizzes available</Typography>
              <Typography variant="body2">
                Check back later for new assessments
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default TakeQuizPage;