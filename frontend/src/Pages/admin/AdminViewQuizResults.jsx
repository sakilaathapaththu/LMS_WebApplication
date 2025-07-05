import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";

import API from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import Papa from "papaparse";

const AdminAllQuizResults = () => {
  const [results, setResults] = useState([]);
  const [filterCourse, setFilterCourse] = useState("");
  const [filterEmail, setFilterEmail] = useState("");

  useEffect(() => {
    API.get("/quizzes/admin/all-results")
      .then((res) => setResults(res.data))
      .catch(() => alert("❌ Failed to load quiz results"));
  }, []);

  const exportToCSV = () => {
    const flatData = results.flatMap((res) =>
      res.answers.map((a, index) => ({
        "User Name": `${res.userId?.firstName || ""} ${
          res.userId?.lastName || ""
        }`,
        Email: res.userId?.email || "",
        "Course Title": res.courseId?.title || "",
        "Question #": index + 1,
        "Selected Answer": a.selectedAnswer,
        Correct: a.correct ? "✅ Correct" : "❌ Incorrect",
        Score: res.score,
        "Total Questions": res.answers.length,
      }))
    );

    const csv = Papa.unparse(flatData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "quiz_results.csv");
    link.click();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          📊 All Quiz Submissions
        </Typography>
        <Button variant="outlined" onClick={exportToCSV} sx={{ mb: 3 }}>
          📄 Export to CSV
        </Button>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <TextField
              label="Filter by Email"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value.toLowerCase())}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Filter by Course"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value.toLowerCase())}
            />
          </FormControl>
        </Box>

        {results
          .filter(
            (res) =>
              res.userId?.email?.toLowerCase().includes(filterEmail) &&
              res.courseId?.title?.toLowerCase().includes(filterCourse)
          )
          .map((res, idx) => (
            <Paper key={idx} sx={{ mb: 4, p: 3 }}>
              <Typography variant="h6">
                🧑 {res.userId?.firstName} {res.userId?.lastName} (
                {res.userId?.email})
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                📘 Course: {res.courseId?.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                🧪 Score: {res.score} / {res.answers.length}
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Selected Answer</TableCell>
                    <TableCell>Correct Answer</TableCell>
                    <TableCell>Correct</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {res.answers.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>Q{i + 1}</TableCell>
                      <TableCell>{a.questionText}</TableCell>
                      <TableCell>{a.selectedAnswer}</TableCell>
                      <TableCell>{a.correctAnswer}</TableCell>
                      <TableCell>
                        {a.correct ? "✅ Correct" : "❌ Incorrect"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          ))}
      </Container>
    </Box>
  );
};

export default AdminAllQuizResults;
