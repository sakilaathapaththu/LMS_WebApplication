import React, { useEffect, useState } from "react";
import API from "../../Utils/api";
import {
  Box, Typography, Paper, Grid, Button, Divider
} from "@mui/material";

const AdminEnrollments = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/enrollments/pending");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  const handleAction = async (id, action) => {
  try {
    await API.post(`/enrollments/${action}`, { requestId: id });
    alert(`Enrollment ${action}d successfully`);
    fetchRequests(); // Refresh list
  } catch (err) {
    alert("Action failed");
  }
};


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Enrollment Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography>No pending requests.</Typography>
      ) : (
        <Grid container spacing={2}>
          {requests.map((req) => (
            <Grid item xs={12} key={req._id}>
              <Paper sx={{ p: 2 }}>
                <Typography><strong>User:</strong> {req.userId?.username}</Typography>
                <Typography><strong>Course:</strong> {req.courseId?.title}</Typography>
                <Typography><strong>Email:</strong> {req.userId?.email}</Typography>

                <Divider sx={{ my: 1 }} />
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAction(req._id, "approve")}
                  sx={{ mr: 1 }}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleAction(req._id, "reject")}
                >
                  Reject
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AdminEnrollments;
