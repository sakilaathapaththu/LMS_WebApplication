import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Divider, 
  Fade, 
  Slide,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Avatar,
  Chip
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  School as SchoolIcon,
  Person as PersonIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useAuth } from "../Utils/AuthContext";
import ProfileCard from "../Components/Profile/ProfileCard";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api";
import EditProfileModal from "../Components/Profile/EditProfileModal";
import MyEnrolledCourses from "../Components/Profile/MyEnrolledCourses";

const Profile = () => {
  const { user, logout } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  if (!user) return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      color: 'white'
    }}>
      <Box sx={{ 
        width: 60, 
        height: 60, 
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        mb: 2
      }} />
      <Typography variant="h6">Loading your profile...</Typography>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );

  const handleDelete = async () => {
    if (window.confirm("⚠️ This action cannot be undone. Are you absolutely sure you want to delete your account?")) {
      setLoading(true);
      try {
        await API.delete(`/users/${user.id || user._id}`);
        setSnackbar({ open: true, message: 'Account deleted successfully', severity: 'success' });
        setTimeout(() => {
          logout();
          navigate("/");
        }, 2000);
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to delete account. Please try again.', severity: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleProfileUpdated = async () => {
    try {
      const res = await API.get("/auth/me");
      localStorage.setItem("user", JSON.stringify(res.data));
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      // Instead of window.location.reload(), you might want to update the context
      window.location.reload();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
      position: 'relative',
      pb: 4
    }}>
      <HomePageNavbar />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* Welcome Header */}
        <Fade in={true} timeout={800}>
          <Box sx={{ 
            mt: 4, 
            mb: 4,
            textAlign: 'center',
            color: '#1e40af'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'rgba(59, 130, 246, 0.2)',
                fontSize: '2rem',
                mr: 2,
                color: '#1e40af'
              }}>
                <PersonIcon sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Box sx={{ textAlign: 'left' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 0.5,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    color: '#1e40af'
                  }}
                >
                  Welcome back, {user.name || user.username}!
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    opacity: 0.8,
                    fontSize: '1.1rem',
                    color: '#3b82f6'
                  }}
                >
                  Manage your learning journey
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Profile Overview Card */}
        <Slide direction="up" in={true} timeout={1000}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ color: '#3b82f6', mr: 1 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1e40af',
                  fontWeight: 600
                }}
              >
                Profile Information
              </Typography>
            </Box>
            <ProfileCard user={user} />
          </Paper>
        </Slide>

        {/* Quick Actions */}
        <Slide direction="up" in={true} timeout={1200}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1e40af',
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <EditIcon sx={{ mr: 1, color: '#3b82f6' }} />
              Quick Actions
            </Typography>
            
            <Box sx={{ 
              display: "flex", 
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              <Tooltip title="Update your profile information">
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  onClick={() => setEditOpen(true)}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.3s ease-in-out',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.6)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Edit Profile
                </Button>
              </Tooltip>
              
              <Tooltip title="Permanently delete your account">
                <Button 
                  variant="outlined" 
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  disabled={loading}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    borderWidth: '2px',
                    borderColor: '#ef4444',
                    color: '#ef4444',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: 'rgba(239, 68, 68, 0.04)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)'
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                >
                  {loading ? 'Deleting...' : 'Delete Account'}
                </Button>
              </Tooltip>
            </Box>

            {/* Safety Notice */}
            <Alert 
              severity="info" 
              sx={{ 
                mt: 3,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#3b82f6'
                }
              }}
            >
              <Typography variant="body2">
                <strong>Account Safety:</strong> Deleting your account will permanently remove all your data, including course progress and certificates. This action cannot be undone.
              </Typography>
            </Alert>
          </Paper>
        </Slide>

        {/* Learning Progress */}
        <Slide direction="up" in={true} timeout={1400}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon sx={{ color: '#3b82f6', mr: 1 }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1e40af',
                  fontWeight: 600
                }}
              >
                My Learning Journey
              </Typography>
              <Chip 
                label="Active" 
                size="small" 
                sx={{ 
                  ml: 2,
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontWeight: 600
                }} 
              />
            </Box>
            <MyEnrolledCourses />
          </Paper>
        </Slide>

      </Container>
      
      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;