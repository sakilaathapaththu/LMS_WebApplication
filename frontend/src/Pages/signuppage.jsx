import { Box } from "@mui/material";
import React from "react";
import Signup from "../Components/Registration/Signupcard.jsx";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar.jsx";
export default function signuppage() {
  return (
    <Box>
      <HomePageNavbar />
      <Signup />
    </Box>
  );
}
