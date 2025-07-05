import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip, CircularProgress } from "@mui/material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";

const MyEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses/my")
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to fetch enrolled courses"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (courses.length === 0) {
    return <Typography>No enrolled courses found.</Typography>;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>My Enrolled Courses</Typography>
      {courses.map(course => (
        <Paper key={course._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{course.title}</Typography>
          <Typography variant="body2">{course.description.slice(0, 100)}...</Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Chip label={`Instructor: ${course.conductorName}`} />
            <Chip label={`Level: ${course.level}`} />
            <Chip label={`Duration: ${course.duration}`} />
            <Chip
              label={course.isApproved ? "✅ Approved" : "⏳ Pending Approval"}
              color={course.isApproved ? "success" : "warning"}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default MyEnrolledCourses;
