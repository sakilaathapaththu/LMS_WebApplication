import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Link,
  Container,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import emailjs from "emailjs-com";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";

const ContactUs = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (field, value) => {
    setFormDetails({ ...formDetails, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    const templateParams = { ...formDetails };

    emailjs.send(
      "service_iz4upso",
      "template_igzmdar",
      templateParams,
      "Saxc69ddljcENyxEM"
    ).then(() => {
      setStatus({ success: true, message: "✅ Message sent successfully!" });
      setFormDetails(formInitialDetails);
      setButtonText("Send");
    }).catch(() => {
      setStatus({ success: false, message: "❌ Failed to send message. Please try again." });
      setButtonText("Send");
    });
  };

  return (
    <Box>
      <HomePageNavbar/>
      <Box 
        sx={{ 
          py: 8, 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Get In Touch
              </Typography>
              <Typography 
                variant="h6" 
                sx={{
                  color: '#666',
                  fontWeight: 400,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={6} mt={2}>
            {/* Form */}
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} timeout={1200}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 5,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{
                      mb: 3,
                      fontWeight: 600,
                      color: '#2196F3',
                      textAlign: 'center'
                    }}
                  >
                    Send Message
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="First Name"
                          fullWidth
                          required
                          value={formDetails.firstName}
                          onChange={(e) => onFormUpdate("firstName", e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                              }
                            },
                            '& .MuiInputLabel-root': {
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#2196F3',
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Last Name"
                          fullWidth
                          required
                          value={formDetails.lastName}
                          onChange={(e) => onFormUpdate("lastName", e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                              }
                            },
                            '& .MuiInputLabel-root': {
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#2196F3',
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          type="email"
                          fullWidth
                          required
                          value={formDetails.email}
                          onChange={(e) => onFormUpdate("email", e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                              }
                            },
                            '& .MuiInputLabel-root': {
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#2196F3',
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone No."
                          type="tel"
                          fullWidth
                          value={formDetails.phone}
                          onChange={(e) => onFormUpdate("phone", e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                              }
                            },
                            '& .MuiInputLabel-root': {
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#2196F3',
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Message"
                          multiline
                          rows={6}
                          fullWidth
                          required
                          value={formDetails.message}
                          onChange={(e) => onFormUpdate("message", e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.25)',
                              }
                            },
                            '& .MuiInputLabel-root': {
                              color: '#666',
                              '&.Mui-focused': {
                                color: '#2196F3',
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          type="submit" 
                          fullWidth 
                          variant="contained"
                          sx={{
                            py: 2,
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            boxShadow: '0 8px 20px rgba(33, 150, 243, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 12px 30px rgba(33, 150, 243, 0.4)',
                              background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                            },
                            '&:active': {
                              transform: 'translateY(-1px)',
                            }
                          }}
                        >
                          {buttonText}
                        </Button>
                      </Grid>
                      {status.message && (
                        <Grid item xs={12}>
                          <Fade in={true} timeout={500}>
                            <Box
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: status.success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                border: `1px solid ${status.success ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                                textAlign: 'center',
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color: status.success ? '#4CAF50' : '#F44336',
                                  fontWeight: 500,
                                }}
                              >
                                {status.message}
                              </Typography>
                            </Box>
                          </Fade>
                        </Grid>
                      )}
                    </Grid>
                  </form>
                </Paper>
              </Slide>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={1200}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 5,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{
                      mb: 4,
                      fontWeight: 600,
                      color: '#2196F3',
                      textAlign: 'center'
                    }}
                  >
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3, p: 2, borderRadius: 2, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.05)', transform: 'translateX(10px)' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      mr: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <FaEnvelope style={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    </Box>
                    <Link 
                      href="mailto:sakila.atapattu@gmail.com" 
                      underline="hover"
                      sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#2196F3',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      sakila.atapattu@gmail.com
                    </Link>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3, p: 2, borderRadius: 2, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.05)', transform: 'translateX(10px)' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      mr: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <FaPhoneAlt style={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    </Box>
                    <Link 
                      href="tel:+94714782241" 
                      underline="hover"
                      sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#2196F3',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      +94 71 478 2241
                    </Link>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3, p: 2, borderRadius: 2, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.05)', transform: 'translateX(10px)' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      mr: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <FaMapMarkerAlt style={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    </Box>
                    <Typography 
                      sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                      }}
                    >
                      Rajagedra, Ahugoda, Pothuhera
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3, p: 2, borderRadius: 2, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.05)', transform: 'translateX(10px)' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      mr: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <FaLinkedin style={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    </Box>
                    <Link 
                      href="https://www.linkedin.com/in/sakila-athapaththu-412647215" 
                      target="_blank" 
                      rel="noreferrer"
                      underline="hover"
                      sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#2196F3',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      LinkedIn Profile
                    </Link>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2, p: 2, borderRadius: 2, transition: 'all 0.3s ease', '&:hover': { backgroundColor: 'rgba(33, 150, 243, 0.05)', transform: 'translateX(10px)' } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      mr: 2,
                      transition: 'all 0.3s ease',
                    }}>
                      <FaWhatsapp style={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    </Box>
                    <Link 
                      href="https://wa.me/714782241" 
                      target="_blank" 
                      rel="noreferrer"
                      underline="hover"
                      sx={{
                        color: '#333',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#2196F3',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      Chat on WhatsApp
                    </Link>
                  </Box>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactUs;