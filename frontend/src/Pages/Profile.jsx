import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useAuth } from "../Utils/AuthContext";
import ProfileCard from "../Components/Profile/ProfileCard";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box><HomePageNavbar/>
    <Container maxWidth="sm">
          
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <ProfileCard user={user} />
      </Box>
    </Container>
    </Box>
  );
};

export default Profile;
