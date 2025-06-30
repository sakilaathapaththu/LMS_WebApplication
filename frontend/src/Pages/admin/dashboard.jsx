import React, { useEffect, useState } from "react";
import { useAuth } from "../../Utils/AuthContext";
import API from "../../Utils/api";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (user?.role === "admin") {
      API.get("/enrollments/count")
        .then(res => setPendingCount(res.data.pendingCount))
        .catch(err => console.error("Failed to fetch count", err));
    }
  }, [user]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="h6">Welcome, {user?.username}</Typography>

      <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
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

      <Button variant="outlined" color="error" sx={{ mt: 4 }} onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
