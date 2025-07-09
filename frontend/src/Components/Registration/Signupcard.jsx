import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import API from "../../Utils/api"; // adjust path as needed
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

// Professional theme with white and light blue colors
const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#90caf9',
      light: '#bbdefb',
      dark: '#64b5f6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      color: '#1a202c',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#f7fafc',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#42a5f5',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#f7fafc',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
          boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.25)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.35)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const today = new Date().toISOString().split("T")[0]; // ✅ Define it here

export default function Signupcard() {
  const navigate = useNavigate();
  const [preview, setPreview] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const nic = data.get("nic");
    const birthday = data.get("birthday");
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
   
    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    // ✅ NIC Validation: 9 digits or 12 digits only
    const nicRegex = /^(\d{9}|\d{12})$/;
    if (!nicRegex.test(nic)) {
      alert("NIC number must be either 9 or 12 digits.");
      setIsLoading(false);
      return;
    }

    // ✅ Birthday Validation: must not be in the future
    if (birthday > today) {
      alert("Birthday cannot be a future date.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.get("firstName"));
    formData.append("lastName", data.get("lastName"));
    formData.append("username", data.get("username"));
    formData.append("email", data.get("email"));
    formData.append("password", data.get("password"));
    formData.append("confirmPassword", data.get("confirmPassword"));
    formData.append("nic", nic);
    formData.append("birthday", birthday);
    formData.append("role", "user");

    const fileInput = document.querySelector("#profileImage");
    if (fileInput?.files[0]) {
      formData.append("profileImage", fileInput.files[0]);
    }

    try {
      await API.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={professionalTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 50%, #bbdefb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <CssBaseline />
        <Fade in timeout={600}>
          <Container component="main" maxWidth="sm">
            <Grow in timeout={700}>
              <Paper
                elevation={24}
                sx={{
                  padding: 4,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Slide direction="down" in timeout={800}>
                    <Avatar 
                      sx={{ 
                        m: 1, 
                        bgcolor: "primary.main",
                        width: 56,
                        height: 56,
                        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                      }}
                    >
                      <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                  </Slide>
                  
                  <Slide direction="up" in timeout={900}>
                    <Typography 
                      component="h1" 
                      variant="h4" 
                      sx={{ 
                        mb: 1,
                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        fontWeight: 700,
                      }}
                    >
                      Create Account
                    </Typography>
                  </Slide>
                  
                  <Slide direction="up" in timeout={1000}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Join us today and get started
                    </Typography>
                  </Slide>

                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2, width: '100%' }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Fade in timeout={1100}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              position: "relative",
                            }}
                          >
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
                                    width: 120,
                                    height: 120,
                                    border: "3px solid #1976d2",
                                    transition: 'all 0.3s ease-in-out',
                                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.2)',
                                    backgroundColor: preview ? 'transparent' : '#f5f5f5',
                                    "&:hover": {
                                      transform: 'scale(1.05)',
                                      boxShadow: '0 12px 40px rgba(25, 118, 210, 0.3)',
                                    },
                                  }}
                                >
                                  {!preview && (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '48px',
                                        color: '#1976d2',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      +
                                    </Box>
                                  )}
                                </Avatar>
                                {/* ✅ Fixed camera icon container - Perfect circle */}
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    width: 36,
                                    height: 36,
                                    bgcolor: "primary.main",
                                    borderRadius: "50%",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                                    transition: 'all 0.3s ease-in-out',
                                    border: '2px solid #ffffff',
                                    "&:hover": {
                                      transform: 'scale(1.1)',
                                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                                    },
                                  }}
                                >
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                    alt="camera"
                                    width={18}
                                    height={18}
                                    style={{ 
                                      filter: 'invert(1)',
                                      display: 'block',
                                    }}
                                  />
                                </Box>
                              </Box>
                            </label>
                          </Box>
                        </Fade>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Fade in timeout={1200}>
                          <TextField
                            name="firstName"
                            required
                            fullWidth
                            label="First Name"
                            id="firstName"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Fade in timeout={1250}>
                          <TextField
                            name="lastName"
                            required
                            fullWidth
                            label="Last Name"
                            id="lastName"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1300}>
                          <TextField
                            name="username"
                            required
                            fullWidth
                            label="Username"
                            id="username"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1350}>
                          <TextField
                            name="email"
                            required
                            fullWidth
                            label="Email Address"
                            id="email"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1400}>
                          <TextField
                            name="password"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1450}>
                          <TextField
                            name="confirmPassword"
                            required
                            fullWidth
                            label="Re-enter Password"
                            type="password"
                            id="confirmPassword"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1500}>
                          <TextField
                            name="nic"
                            required
                            fullWidth
                            label="NIC Number"
                            id="nic"
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Fade in timeout={1550}>
                          <TextField
                            name="birthday"
                            required
                            fullWidth
                            label="Birthday"
                            type="date"
                            id="birthday"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ max: today }} // ✅ Disable future dates
                            variant="outlined"
                          />
                        </Fade>
                      </Grid>

                      {/* ✅ Hidden input for role */}
                      <input type="hidden" name="role" value="user" />

                      <Grid item xs={12}>
                        <Fade in timeout={1600}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                value="allowExtraEmails" 
                                color="primary"
                                sx={{
                                  '&.Mui-checked': {
                                    animation: 'pulse 0.3s ease-in-out',
                                  },
                                }}
                              />
                            }
                            label="I want to receive updates via email"
                          />
                        </Fade>
                      </Grid>
                    </Grid>
                    
                    <Fade in timeout={1700}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{ 
                          mt: 4, 
                          mb: 2,
                          height: 48,
                          fontSize: '1.1rem',
                          background: isLoading 
                            ? 'linear-gradient(45deg, #90caf9, #64b5f6)'
                            : 'linear-gradient(45deg, #1976d2, #42a5f5)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                          },
                        }}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </Fade>
                    
                    <Fade in timeout={1750}>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Link 
                            component={RouterLink} 
                            to="/login" 
                            variant="body2"
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              fontWeight: 500,
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                color: 'primary.dark',
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Already have an account? Login
                          </Link>
                        </Grid>
                      </Grid>
                    </Fade>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          </Container>
        </Fade>
      </Box>
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </ThemeProvider>
  );
}