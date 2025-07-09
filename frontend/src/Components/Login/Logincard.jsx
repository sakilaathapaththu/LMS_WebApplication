import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';

import API from '../../Utils/api';
import { useAuth } from '../../Utils/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.25)',
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
          borderRadius: 12,
          padding: '14px 0',
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
  },
});

export default function Logincard() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const data = new FormData(event.currentTarget);

    const credentials = {
      emailOrUsername: data.get('email'),
      password: data.get('password')
    };

    try {
      const res = await API.post('/auth/login', credentials);
      const { token, user } = res.data;

      login(user, token);

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={professionalTheme}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #dbeafe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite 2s',
        }} />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '48px 32px',
                width: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 35px 80px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 4
              }}>
                <Avatar 
                  sx={{ 
                    m: 1, 
                    bgcolor: 'primary.main',
                    width: 64,
                    height: 64,
                    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.3)',
                    animation: 'bounceGentle 2s ease-in-out infinite',
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 32 }} />
                </Avatar>
                
                <Typography 
                  component="h1" 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.primary',
                    mb: 1,
                    animation: 'slideUp 0.6s ease-out 0.2s both'
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    textAlign: 'center',
                    animation: 'slideUp 0.6s ease-out 0.3s both'
                  }}
                >
                  Sign in to continue to your account
                </Typography>
              </Box>

              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                noValidate 
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address or Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    animation: 'slideUp 0.6s ease-out 0.4s both',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(59, 130, 246, 0.2)',
                      },
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    animation: 'slideUp 0.6s ease-out 0.5s both',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(59, 130, 246, 0.2)',
                      },
                    },
                  }}
                />

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 2,
                  mb: 2,
                  animation: 'slideUp 0.6s ease-out 0.6s both'
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        value="remember" 
                        color="primary"
                      />
                    }
                    label="Remember me"
                    sx={{ color: 'text.secondary' }}
                  />
                  <Link 
                    href="#" 
                    variant="body2" 
                    sx={{ 
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    animation: 'slideUp 0.6s ease-out 0.7s both'
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: '2px solid',
                          borderColor: 'white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      Signing in...
                    </Box>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <Grid container sx={{ animation: 'slideUp 0.6s ease-out 0.8s both' }}>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Don't have an account?{' '}
                      <Link 
                        component={RouterLink} 
                        to="/signup" 
                        sx={{ 
                          color: 'primary.main',
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceGentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </ThemeProvider>
  );
}