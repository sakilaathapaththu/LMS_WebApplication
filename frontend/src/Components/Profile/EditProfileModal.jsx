import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import API from "../../Utils/api";

const EditProfileModal = ({ open, onClose, user, onProfileUpdated }) => {
  const [form, setForm] = useState({ ...user, password: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });
      if (image) formData.append("profileImage", image);

      await API.put("/users/me", formData);
      alert("Profile updated");
      onProfileUpdated(); // reload context/localStorage
      onClose();
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ background: "#fff", p: 4, mt: 5, mx: "auto", maxWidth: 500 }}>
        <Typography variant="h6">Edit Profile</Typography>
        <TextField fullWidth name="firstName" label="First Name" value={form.firstName} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="email" label="Email" value={form.email} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="username" label="Username" value={form.username} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="nic" label="NIC" value={form.nic} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="birthday" type="date" label="Birthday" InputLabelProps={{ shrink: true }} value={form.birthday} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth name="password" label="New Password" type="password" value={form.password} onChange={handleChange} sx={{ mt: 2 }} />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ marginTop: "16px" }} />
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>Save Changes</Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
