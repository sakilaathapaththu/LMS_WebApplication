import React, { useEffect, useState } from "react";
import {
  Box, Typography, Avatar, Paper, CircularProgress,
  Button, IconButton, Modal, TextField
} from "@mui/material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { Edit, Delete } from "@mui/icons-material";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setAdmin(res.data);
    } catch (err) {
      console.error("Failed to fetch admin profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your admin account?")) {
      try {
        await API.delete(`/users/${admin._id}`);
        alert("✅ Account deleted. Please logout or redirect.");
        // Optionally redirect or logout here
      } catch (err) {
        alert("❌ Failed to delete account");
      }
    }
  };

  const handleEditOpen = () => {
    setForm(admin);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      await API.put("/users/me", formData);
      setEditOpen(false);
      fetchAdminProfile();
      alert("✅ Profile updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <AdminSidebar />
        <Box sx={{ p: 4, flexGrow: 1, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!admin) {
    return (
      <Box sx={{ display: "flex" }}>
        <AdminSidebar />
        <Box sx={{ p: 4, flexGrow: 1 }}>
          <Typography variant="h6">Failed to load admin profile</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>Admin Profile</Typography>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src={admin.profileImage ? `${IMAGE_BASE_URL}/${admin.profileImage}` : ""}
              alt={admin.username}
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Typography variant="h6">{admin.username}</Typography>
          </Box>
          <Typography><strong>Email:</strong> {admin.email}</Typography>
          <Typography><strong>NIC:</strong> {admin.nic}</Typography>
          <Typography><strong>Full Name:</strong> {admin.firstName} {admin.lastName}</Typography>
          <Typography><strong>Birthday:</strong> {admin.birthday}</Typography>
          <Typography><strong>Role:</strong> {admin.role}</Typography>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="outlined" startIcon={<Edit />} onClick={handleEditOpen}>
              Edit
            </Button>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Paper>

        {/* Edit Modal */}
        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            width: "90%",
            maxWidth: 500,
            maxHeight: "90vh",
            overflowY: "auto",
            p: 4,
            borderRadius: 2
            }}
        >
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <TextField fullWidth label="First Name" name="firstName" value={form.firstName || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Last Name" name="lastName" value={form.lastName || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Username" name="username" value={form.username || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Email" name="email" value={form.email || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="NIC" name="nic" value={form.nic || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Birthday" name="birthday" value={form.birthday || ""} onChange={handleEditChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="New Password" name="password" value={form.password || ""} onChange={handleEditChange} sx={{ mt: 2 }} type="password" />
            <Box sx={{ mt: 2 }}>
            <Typography>Profile Image</Typography>
            <input type="file" onChange={(e) => setProfileImageFile(e.target.files[0])} />
            </Box>
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleEditSubmit}>Save Changes</Button>
        </Box>
        </Modal>

      </Box>
    </Box>
  );
};

export default AdminProfile;
