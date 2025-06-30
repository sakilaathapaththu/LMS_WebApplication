import React, { useEffect, useState } from "react";
import {
  Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox
} from "@mui/material";
import API from "../../Utils/api";

const EditCourseModal = ({ open, onClose, course, onUpdated }) => {
  const [form, setForm] = useState({ ...course });

  useEffect(() => {
    if (course) {
      setForm({
        ...course,
        videoClips: course.videoClips?.join(", "),
        prerequisites: course.prerequisites?.join(", ")
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...form,
        videoClips: form.videoClips.split(",").map(v => v.trim()).filter(Boolean),
        prerequisites: form.prerequisites.split(",").map(p => p.trim()).filter(Boolean),
      };

      await API.put(`/courses/${form._id}`, updatedData);
      alert("✅ Course updated!");
      onUpdated();
      onClose();
    } catch (err) {
      alert("❌ Failed to update course");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 2,
          bgcolor: "#fff",
          mt: 5,
          mx: "auto",
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>Edit Course</Typography>

        <TextField fullWidth label="Course ID" name="courseId" value={form.courseId} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Conductor" name="conductorName" value={form.conductorName} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Level" name="level" value={form.level} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Duration" name="duration" value={form.duration} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Enrollment Key" name="enrollmentKey" value={form.enrollmentKey} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Video Clips (comma-separated URLs)" name="videoClips" value={form.videoClips} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Prerequisite Course IDs (comma-separated)" name="prerequisites" value={form.prerequisites} onChange={handleChange} sx={{ mt: 2 }} />

        <FormControlLabel
          control={<Checkbox checked={form.visible} onChange={handleChange} name="visible" />}
          label="Visible"
        />

        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditCourseModal;
