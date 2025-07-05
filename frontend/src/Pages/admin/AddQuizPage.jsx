import React, { useEffect, useState } from "react";
import {
  Container, Typography, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, Paper
} from "@mui/material";
import API from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";

const AddQuizPage = () => {
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([
    { questionText: "", type: "mcq", options: ["", ""], correctAnswer: "" }
  ]);
  const [timeLimit, setTimeLimit] = useState(600); // default: 600 seconds (10 min)


  useEffect(() => {
    API.get("/courses/all")
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  }, []);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", type: "mcq", options: ["", ""], correctAnswer: "" }]);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push("");
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      await API.post("/quizzes/create", { courseId, timeLimit, questions });
      alert("✅ Quiz added!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create quiz");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Add Quiz to Course</Typography>

        {/* Course Selector */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Course</InputLabel>
          <Select value={courseId} label="Select Course" onChange={(e) => setCourseId(e.target.value)}>
            {courses.map(course => (
              <MenuItem key={course._id} value={course._id}>{course.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Time Limit (in seconds)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          sx={{ mb: 4 }}
        />

        {/* Questions Form */}
        {questions.map((q, i) => (
          <Paper key={i} sx={{ mb: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>Question {i + 1}</Typography>
            <TextField
              fullWidth label="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(i, "questionText", e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={q.type}
                label="Type"
                onChange={(e) => handleQuestionChange(i, "type", e.target.value)}
              >
                <MenuItem value="mcq">Multiple Choice (MCQ)</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ mt: 1 }}>Options:</Typography>
            {q.options.map((opt, idx) => (
              <TextField
                key={idx}
                fullWidth
                label={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(i, idx, e.target.value)}
                sx={{ mb: 1 }}
              />
            ))}
            <Button size="small" onClick={() => addOption(i)}>+ Add Option</Button>

            <TextField
              fullWidth
              label="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(i, "correctAnswer", e.target.value)}
              sx={{ mt: 2 }}
            />
          </Paper>
        ))}

        <Button variant="outlined" onClick={addQuestion} sx={{ mr: 2 }}>
          + Add Another Question
        </Button>

        <Button variant="contained" onClick={handleSubmit}>Submit Quiz</Button>
      </Container>
    </Box>
  );
};

export default AddQuizPage;
