
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper
} from "@mui/material";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";
import API from "../../Utils/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    if (user?.role === "admin") {
      // Get pending enrollments
      API.get("/enrollments/count")
        .then((res) => setPendingCount(res.data.pendingCount))
        .catch((err) => console.error("Failed to fetch pending count", err));

      // Get total students
      API.get("/users/count")
        .then((res) => setStudentCount(res.data.total))
        .catch((err) => console.error("Failed to fetch student count", err));

      // Get total enrollments
      API.get("/enrollments/enrollments/counted")
        .then((res) => setEnrollmentCount(res.data.total || 0)) // fallback if only pendingCount is returned
        .catch((err) => console.error("Failed to fetch enrollment count", err));
    }
  }, [user]);

  const handleNavigation = (path) => {
    if (path === "logout") {
      logout();
    } else {
      navigate(path);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h6">Welcome, {user?.username}</Typography>

        {/* Dashboard Cards */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {/* Total Students Card */}
            <Paper elevation={3} sx={{ p: 3, minWidth: 260, flex: 1 }}>
              <Typography variant="subtitle1">Total Students</Typography>
              <Typography variant="h4">{studentCount}</Typography>
            </Paper>

            {/* Course Enrollment Card */}
            <Paper elevation={3} sx={{ p: 3, minWidth: 260, flex: 1 }}>
              <Typography variant="subtitle1">Course Enrollment</Typography>
              <Typography variant="h4">{enrollmentCount}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Box>
                  <Typography variant="body2">Fully Paid</Typography>
                  <Typography>0</Typography> {/* mock */}
                </Box>
                <Box>
                  <Typography variant="body2">Partially Paid</Typography>
                  <Typography>{enrollmentCount}</Typography> {/* assume all */}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Existing Panel: Pending Requests */}
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6">Pending Enrollment Requests</Typography>
          <Typography variant="h3" color="primary">{pendingCount}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/admin/enrollments")}
          >
            View Requests
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
