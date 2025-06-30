import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box
} from "@mui/material";
import { IMAGE_BASE_URL } from "../../Utils/api";

const ProfileCard = ({ user }) => {
  const imagePath = user?.profileImage
    ? `${IMAGE_BASE_URL}/${user.profileImage.replace(/\\/g, "/")}`
    : "/default-avatar.png";

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <Avatar
              src={imagePath}
              alt={user.username}
              sx={{ width: 100, height: 100, border: "2px solid #1976d2" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h6">{user.username}</Typography>
            <Typography color="text.secondary">
              {user.fullName} {user.lastName}
            </Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Typography color="text.secondary">NIC: {user.nic}</Typography>
            <Typography color="text.secondary">
              Birthday: {new Date(user.birthday).toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary">Role: {user.role}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard;
