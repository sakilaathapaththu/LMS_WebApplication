import React from "react";
import Box from "@mui/material/Box";
import Logincard from "../Components/Login/Logincard.jsx";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar.jsx";

export default function loginpage() {
  return (
    <Box>
      <HomePageNavbar />
      <Logincard />
    </Box>
  );
}
