import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";

const AboutUs = () => {
  return (
    <Box><HomePageNavbar />
    <Box sx={{ display: "flex" }}>
      
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>About Us</Typography>
          <Typography paragraph>
            Welcome to our Learning Management System (LMS)! Our platform is dedicated to providing high-quality online courses across a variety of disciplines. Whether you're a student looking to enhance your skills or an educator seeking to share your expertise, our LMS is here to support your learning journey.
          </Typography>
          <Typography paragraph>
            We believe in accessible, affordable, and flexible education. Our mission is to bridge the gap between knowledge seekers and quality instructors by offering a seamless, interactive, and user-friendly learning experience.
          </Typography>
          <Typography paragraph>
            Thank you for being a part of our community!
          </Typography>
        </Paper>
      </Container>
    </Box>
    </Box>
  );
};

export default AboutUs;
