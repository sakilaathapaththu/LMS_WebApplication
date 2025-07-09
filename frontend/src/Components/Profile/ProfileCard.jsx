import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box
} from "@mui/material";
import { IMAGE_BASE_URL } from "../../Utils/api";

const ProfileCard = ({ user }) => {
  // More robust image path handling
  const getImagePath = () => {
    if (!user?.profileImage) return "/default-avatar.png";
    
    // Handle different image path formats
    let imagePath = user.profileImage;
    
    // If it's already a full URL, use it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Clean up the path and construct full URL
    imagePath = imagePath.replace(/\\/g, "/");
    
    // Remove leading slash if present to avoid double slashes
    if (imagePath.startsWith('/')) {
      imagePath = imagePath.substring(1);
    }
    
    return `${IMAGE_BASE_URL}/${imagePath}`;
  };

  const imagePath = getImagePath();

  // Handle potential undefined values
  const displayUser = {
    username: user?.username || 'N/A',
    fullName: user?.fullName || user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : 'N/A',
    email: user?.email || 'N/A',
    nic: user?.nic || 'N/A',
    birthday: user?.birthday || null,
    role: user?.role || 'N/A'
  };

  return (
    <Card sx={{ 
      p: 3,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
      border: '1px solid #e3f2fd',
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(25, 118, 210, 0.08)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(25, 118, 210, 0.12)',
        borderColor: '#bbdefb'
      }
    }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <Avatar
              src={imagePath}
              alt={displayUser.username}
              sx={{ 
                width: 100, 
                height: 100, 
                border: "3px solid #1976d2",
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.2)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 24px rgba(25, 118, 210, 0.3)',
                  borderColor: '#1565c0'
                }
              }}
              // Add onError handler to fallback to default avatar
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent sx={{ 
            '&:last-child': { pb: 2 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(to bottom, #1976d2, #42a5f5)',
              borderRadius: '2px'
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#1565c0',
                mb: 1,
                fontSize: '1.3rem'
              }}
            >
              {displayUser.username}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#424242',
                mb: 0.5
              }}
            >
              {displayUser.fullName}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                fontSize: '0.95rem',
                color: '#616161',
                mb: 0.5
              }}
            >
              {displayUser.email}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                fontSize: '0.95rem',
                color: '#616161',
                mb: 0.5
              }}
            >
              NIC: {displayUser.nic}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                fontSize: '0.95rem',
                color: '#616161',
                mb: 0.5
              }}
            >
              Birthday: {displayUser.birthday ? new Date(displayUser.birthday).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography 
              color="text.secondary"
              sx={{ 
                fontSize: '0.95rem',
                color: '#1976d2',
                fontWeight: 500,
                backgroundColor: '#e3f2fd',
                padding: '4px 12px',
                borderRadius: '16px',
                display: 'inline-flex',
                mt: 1
              }}
            >
              Role: {displayUser.role}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard;