
import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, FormControlLabel,
  Checkbox, Grid, Box, Typography, Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import API from '../../Utils/api'; // adjust path as needed
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
const defaultTheme = createTheme();

export default function Signupcard() {
  const navigate = useNavigate();
  const [preview, setPreview] = React.useState(null);

  const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const formData = new FormData();
  formData.append("firstName", data.get("firstName"));
  formData.append("lastName", data.get("lastName"));
  formData.append("username", data.get("username"));
  formData.append("email", data.get("email"));
  formData.append("password", data.get("password"));
  formData.append("confirmPassword", data.get("confirmPassword"));
  formData.append("nic", data.get("nic"));
  formData.append("birthday", data.get("birthday"));
  formData.append("role", "user");

  const fileInput = document.querySelector("#profileImage");
  if (fileInput?.files[0]) {
    formData.append("profileImage", fileInput.files[0]);
  }

  try {
    await API.post('/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert("Registration successful!");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign up</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
  <input
    accept="image/*"
    style={{ display: "none" }}
    id="profileImage"
    type="file"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    }}
  />
  <label htmlFor="profileImage">
    <Box sx={{ position: "relative", cursor: "pointer" }}>
      <Avatar
        src={preview}
        alt="Profile"
        sx={{
          width: 100,
          height: 100,
          border: "2px solid #1976d2",
          transition: "0.3s",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          bgcolor: "white",
          borderRadius: "50%",
          p: "4px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="camera"
          width={20}
          height={20}
        />
      </Box>
    </Box>
  </label>
</Grid>



              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  id="firstName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label="Last Name"
                  id="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  label="Username"
                  id="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  label="Email Address"
                  id="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  required
                  fullWidth
                  label="Re-enter Password"
                  type="password"
                  id="confirmPassword"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nic"
                  required
                  fullWidth
                  label="NIC Number"
                  id="nic"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birthday"
                  required
                  fullWidth
                  label="Birthday"
                  type="date"
                  id="birthday"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* ✅ Hidden input for role */}
              <input type="hidden" name="role" value="user" />

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive updates via email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
