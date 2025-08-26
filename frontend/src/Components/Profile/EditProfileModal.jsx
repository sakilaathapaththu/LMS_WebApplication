import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, Paper, Divider, Avatar, IconButton } from "@mui/material";
import { Edit, Person, Email, Badge, DateRange, Lock, Upload } from "@mui/icons-material";
import API from "../../Utils/api";

const EditProfileModal = ({ open, onClose, user, onProfileUpdated }) => {
  const [form, setForm] = useState({ ...user, password: "" });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    maxHeight: '90vh',
    overflow: 'auto',
    outline: 'none',
    // Hide scrollbar
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };

  const textFieldStyle = {
    mt: 2.5,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
      },
      '&.Mui-focused': {
        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.25)',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#546e7a',
      '&.Mui-focused': {
        color: '#2196f3',
      },
    },
  };

  const buttonStyle = {
    mt: 4,
    py: 1.5,
    borderRadius: 2,
    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
      boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0px)',
    },
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Paper 
          elevation={24}
          sx={{ 
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(33, 150, 243, 0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              bgcolor: '#2196f3', 
              mr: 2,
              background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
            }}>
              <Edit />
            </Avatar>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#1565c0',
                fontWeight: 600,
                letterSpacing: '-0.5px',
              }}
            >
              Edit Profile
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: 'rgba(33, 150, 243, 0.1)' }} />

          {/* Profile Image Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={previewImage || user?.profileImage}
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                border: '3px solid #e3f2fd',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
              }}
            >
              <Person sx={{ fontSize: 40, color: '#2196f3' }} />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#546e7a', mb: 1 }}>
                Profile Picture
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <IconButton
                  component="span"
                  sx={{
                    bgcolor: '#e3f2fd',
                    color: '#2196f3',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    '&:hover': {
                      bgcolor: '#bbdefb',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Upload sx={{ mr: 1 }} />
                  <Typography variant="body2">Upload</Typography>
                </IconButton>
              </label>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              sx={textFieldStyle}
              InputProps={{
                startAdornment: <Person sx={{ color: '#90caf9', mr: 1 }} />,
              }}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              sx={textFieldStyle}
              InputProps={{
                startAdornment: <Person sx={{ color: '#90caf9', mr: 1 }} />,
              }}
            />
          </Box>

          <TextField
            fullWidth
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            disabled
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Email sx={{ color: '#90caf9', mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            disabled
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Person sx={{ color: '#90caf9', mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            name="nic"
            label="NIC"
            value={form.nic}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Badge sx={{ color: '#90caf9', mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            name="birthday"
            type="date"
            label="Birthday"
            InputLabelProps={{ shrink: true }}
            value={form.birthday}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <DateRange sx={{ color: '#90caf9', mr: 1 }} />,
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="New Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Lock sx={{ color: '#90caf9', mr: 1 }} />,
            }}
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                borderColor: '#90caf9',
                color: '#2196f3',
                '&:hover': {
                  borderColor: '#2196f3',
                  bgcolor: 'rgba(33, 150, 243, 0.04)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
                  boxShadow: '0 8px 25px rgba(33, 150, 243, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;