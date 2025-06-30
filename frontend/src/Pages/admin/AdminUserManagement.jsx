
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Collapse, IconButton
} from "@mui/material";
import { Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import API from "../../Utils/api";
import AdminSidebar from "../../Components/Admin/AdminSidebar";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/users/all");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await API.delete(`/users/${id}`);
      fetchUsers();
    }
  };

  const toggleExpand = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setEnrollments([]);
      return;
    }
    const res = await API.get(`/users/${userId}/enrollments`);
    setEnrollments(res.data);
    setExpandedUser(userId);
  };

  const handleApprovalChange = async (userId, courseId, approved) => {
    if (!courseId) {
      alert("❌ Cannot update enrollment: courseId is missing");
      return;
    }

    try {
      await API.put(`/users/${userId}/enrollments/${courseId}`, { approved });
      alert("✅ Enrollment status updated");

      if (expandedUser === userId) {
        const res = await API.get(`/users/${userId}/enrollments`);
        setEnrollments(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update enrollment");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <React.Fragment key={user._id}>
                <TableRow>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.nic}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => toggleExpand(user._id)}>
                      {expandedUser === user._id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={5} sx={{ p: 0 }}>
                    <Collapse in={expandedUser === user._id} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1">Enrollments:</Typography>
                        {enrollments.length === 0 ? (
                          <Typography>No enrollments found</Typography>
                        ) : (
                          enrollments.map(en => {
                            const courseId = typeof en.courseId === "object" ? en.courseId._id : en.courseId;
                            const courseTitle = typeof en.courseId === "object" ? en.courseId.title : en.courseTitle;

                            return (
                              <Box key={courseId} sx={{ mt: 1 }}>
                                <Typography>{courseTitle || "Untitled Course"}</Typography>
                                <Typography variant="caption">
                                  Status: {en.approved ? "Approved" : "Pending"}
                                </Typography>
                                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    onClick={() =>
                                      handleApprovalChange(user._id, courseId, true)
                                    }
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                      handleApprovalChange(user._id, courseId, false)
                                    }
                                  >
                                    Reject
                                  </Button>
                                </Box>
                              </Box>
                            );
                          })
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminUserManagement;
