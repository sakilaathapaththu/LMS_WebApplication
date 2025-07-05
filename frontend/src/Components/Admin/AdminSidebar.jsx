import React from "react";
import {
  Drawer, List, ListItem, ListItemText,
  Typography, Divider, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";

const drawerWidth = 240;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path) => {
    if (path === "logout") {
      logout();
    } else {
      navigate(path);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" align="center">Admin Panel</Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/admin/profile")}>
          <ListItemText primary="Admin Profile" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/admin/users")}>
          <ListItemText primary="Register Users" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/courses/add")}>
          <ListItemText primary="Add Course" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/admin/courses")}>
          <ListItemText primary="All Courses" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/admin/addquiz")}>
          <ListItemText primary="Add Quiz" />
        </ListItem>

        <ListItem button onClick={() => handleNavigation("/admin/all-quiz-results")}>
          <ListItemText primary="Quiz Results" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("logout")}>
          <ListItemText primary="Logout" />
        </ListItem>
        
        
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
