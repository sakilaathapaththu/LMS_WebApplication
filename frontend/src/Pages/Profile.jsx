import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
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
  const navigate = useNavigate();

  if (!user) return <Typography>Loading...</Typography>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await API.delete(`/users/${user.id || user._id}`);
        alert("Account deleted");
        logout();
        navigate("/");
      } catch (err) {
        alert("Failed to delete account");
      }
    }
  };

  const handleProfileUpdated = async () => {
    const res = await API.get("/auth/me");
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.reload(); // or update global state
  };

  return (
    <Box>
      <HomePageNavbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <ProfileCard user={user} />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => setEditOpen(true)}>Edit Profile</Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete Account</Button>
          </Box>
        </Box>
        <MyEnrolledCourses />
      </Container>
      

      
        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          user={user}
          onProfileUpdated={handleProfileUpdated}
        />
    </Box>
  );
};

export default Profile;
