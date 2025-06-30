import React, { useState } from "react";
import {
  Container, Typography, TextField, Button, Box, FormControlLabel, Checkbox
} from "@mui/material";
import API from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";

const AddCoursePage = () => {
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    conductorName: "",
    category: "",
    level: "",
    duration: "",
    enrollmentKey: "",
    prerequisites: "",
    videoClips: "",
    visible: true
  });

  const [coverImage, setCoverImage] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // ✅ Clean arrays properly
      const cleanedPrerequisites = form.prerequisites
        .split(",")
        .map(item => item.trim())
        .filter(Boolean); // remove empty

      const cleanedVideoClips = form.videoClips
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

      // ✅ Append values
      formData.append("courseId", form.courseId);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("conductorName", form.conductorName);
      formData.append("category", form.category);
      formData.append("level", capitalize(form.level)); // ✅ Fix enum casing
      formData.append("duration", form.duration);
      formData.append("enrollmentKey", form.enrollmentKey);
      formData.append("visible", form.visible.toString());

      formData.append("videoClips", JSON.stringify(cleanedVideoClips));
      formData.append("prerequisites", JSON.stringify(cleanedPrerequisites));

      if (coverImage) formData.append("coverImage", coverImage);
      attachments.forEach(file => formData.append("attachments", file));

      await API.post("/courses/add", formData);
      alert("✅ Course added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add course. Check console for details.");
    }
  };

  // Helper to ensure "Beginner", not "beginner"
  const capitalize = (val) => {
    if (!val) return "";
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <AdminSidebar />
      <Typography variant="h4" gutterBottom>Add New Course</Typography>

      <TextField fullWidth label="Course ID" name="courseId" value={form.courseId} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Course Title" name="title" value={form.title} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth multiline rows={3} label="Description" name="description" value={form.description} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Conductor Name" name="conductorName" value={form.conductorName} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField
        fullWidth
        label="Level"
        name="level"
        placeholder="Beginner / Intermediate / Advanced"
        value={form.level}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField fullWidth label="Duration" name="duration" value={form.duration} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Enrollment Key" name="enrollmentKey" value={form.enrollmentKey} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Video Clip URLs (comma-separated)" name="videoClips" value={form.videoClips} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Prerequisite Course IDs (comma-separated)" name="prerequisites" value={form.prerequisites} onChange={handleChange} sx={{ mt: 2 }} />
      <FormControlLabel
        control={<Checkbox checked={form.visible} onChange={handleChange} name="visible" />}
        label="Visible to Users"
      />

      <Box sx={{ mt: 2 }}>
        <Typography>Cover Image</Typography>
        <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography>Attachments (PDF, etc.)</Typography>
        <input type="file" multiple onChange={(e) => setAttachments(Array.from(e.target.files))} />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Submit Course
      </Button>
    </Container>
  );
};

export default AddCoursePage;
