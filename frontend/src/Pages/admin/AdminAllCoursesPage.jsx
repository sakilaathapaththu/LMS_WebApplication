
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Tooltip
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import EditCourseModal from "../../Components/Admin/EditCourseModal";

const AdminAllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

const [selectedCourse, setSelectedCourse] = useState(null);
const [editOpen, setEditOpen] = useState(false);




  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    API.get("/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => alert("Failed to load courses"));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/courses/${id}`);
        fetchCourses(); // refresh
        alert("✅ Course deleted");
      } catch (err) {
        alert("❌ Failed to delete course");
      }
    }
  };

  const handleEdit = (course) => {
  setSelectedCourse(course);
  setEditOpen(true);
};

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>All Courses</Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card sx={{ position: "relative" }}>
                {course.coverImage && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${IMAGE_BASE_URL}/${course.coverImage.replace(/\\/g, "/")}`}
                    alt={course.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{course.description}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    {course.level} | {course.duration}
                  </Typography>

                  {/* Edit/Delete Icons */}
                  <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(course)}>
                        <Edit fontSize="small" />
                        </IconButton>

                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(course._id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
            <EditCourseModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                course={selectedCourse}
                onUpdated={fetchCourses}
                />

        </Grid>
      </Box>
    </Box>
  );
};

export default AdminAllCoursesPage;
