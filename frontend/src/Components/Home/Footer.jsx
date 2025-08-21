import React from 'react';
import {
  Container, Grid, Box, Button,
  IconButton, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
  Facebook, Twitter, YouTube, Instagram,
  LocationOn, Phone, Fax, Email
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';


const Footer = () => (
  <Box 
    sx={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 50%, #e3f2fd 100%)',
      py: 8, 
      // Removed mt: 10 to eliminate white space
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #42a5f5, #2196f3, #1976d2)',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      },
      '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(180deg)' },
      },
    }}
  >
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      <Grid container spacing={5}>
        {/* About Us */}
        <Grid 
          item 
          xs={12} 
          md={3}
          sx={{
            opacity: 0,
            transform: 'translateY(30px)',
            animation: 'fadeInUp 0.8s ease-out 0.1s forwards',
            '@keyframes fadeInUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #42a5f5, #2196f3)',
                borderRadius: '2px',
              },
            }}
          >
            About Us
          </Typography>
          <Typography 
            variant="body2" 
            gutterBottom
            sx={{
              color: '#555555',
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            <strong style={{ color: '#1976d2' }}>CourseMinistry</strong> is your trusted learning companion—connecting students, instructors, and professionals across the world.
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              color: '#666666',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            Our platform offers interactive courses, expert guidance, and a supportive community to fuel your educational journey.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              mt: 2,
              backgroundColor: '#2196f3',
              color: '#ffffff',
              fontWeight: 600,
              py: 1.5,
              px: 3,
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(33, 150, 243, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: '#1976d2',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(33, 150, 243, 0.4)',
              },
            }}
          >
            Start Learning Now
          </Button>
        </Grid>

        {/* Popular Courses */}
        <Grid 
          item 
          xs={12} 
          md={3}
          sx={{
            opacity: 0,
            transform: 'translateY(30px)',
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #42a5f5, #2196f3)',
                borderRadius: '2px',
              },
            }}
          >
            Popular Courses
          </Typography>
          <Link 
            href="#" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            Full Stack Development
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            Machine Learning Basics
          </Link>
          <Link 
            href="#" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            Introduction to Cybersecurity
          </Link>
        </Grid>

        {/* Quick Links */}
        <Grid 
          item 
          xs={12} 
          md={3}
          sx={{
            opacity: 0,
            transform: 'translateY(30px)',
            animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #42a5f5, #2196f3)',
                borderRadius: '2px',
              },
            }}
          >
            Quick Links
          </Typography>

          <Link 
            component={RouterLink} 
            to="/courses" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            All Courses
          </Link>

          <Link 
            component={RouterLink} 
            to="/terms" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            Terms of Use
          </Link>

          <Link 
            component={RouterLink} 
            to="/privacy" 
            variant="body2" 
            display="block"
            sx={{
              color: '#666666',
              textDecoration: 'none',
              mb: 1.5,
              transition: 'all 0.3s ease-in-out',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#42a5f5',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover': {
                color: '#2196f3',
                transform: 'translateX(8px)',
                '&::before': {
                  backgroundColor: '#2196f3',
                  transform: 'translateY(-50%) scale(1.5)',
                },
              },
            }}
          >
            Privacy Policy
          </Link>
        </Grid>

        {/* Contact Us */}
        <Grid 
          item 
          xs={12} 
          md={3}
          sx={{
            opacity: 0,
            transform: 'translateY(30px)',
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #42a5f5, #2196f3)',
                borderRadius: '2px',
              },
            }}
          >
            Contact Us
          </Typography>
          <List dense sx={{ '& .MuiListItem-root': { py: 1 } }}>
            <ListItem
              sx={{
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <LocationOn sx={{ color: '#42a5f5', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    CourseMinistry HQ
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    Pothuhera, Kurunegala, Sri Lanka
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              sx={{
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Phone sx={{ color: '#42a5f5', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    +94 71 478 2241
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              sx={{
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Fax sx={{ color: '#42a5f5', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    +94 71 478 2241
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              sx={{
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.05)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Email sx={{ color: '#42a5f5', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" sx={{ color: '#666666' }}>
                    helloblackcodedev@gmail.com
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Social Media */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 6,
          py: 3,
          borderTop: '1px solid rgba(33, 150, 243, 0.1)',
          borderBottom: '1px solid rgba(33, 150, 243, 0.1)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 600,
            color: '#1976d2',
            mb: 3,
          }}
        >
          Connect With Us
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton 
            href="#"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#1877F2',
                backgroundColor: '#e3f2fd',
                borderColor: '#1877F2',
                transform: 'translateY(-3px) scale(1.1)',
                boxShadow: '0 8px 20px rgba(24, 119, 242, 0.3)',
              },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton 
            href="#"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#1DA1F2',
                backgroundColor: '#e3f2fd',
                borderColor: '#1DA1F2',
                transform: 'translateY(-3px) scale(1.1)',
                boxShadow: '0 8px 20px rgba(29, 161, 242, 0.3)',
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton 
            href="#"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#FF0000',
                backgroundColor: '#e3f2fd',
                borderColor: '#FF0000',
                transform: 'translateY(-3px) scale(1.1)',
                boxShadow: '0 8px 20px rgba(255, 0, 0, 0.3)',
              },
            }}
          >
            <YouTube />
          </IconButton>
          <IconButton 
            href="#"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: '2px solid #e3f2fd',
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#E4405F',
                backgroundColor: '#e3f2fd',
                borderColor: '#E4405F',
                transform: 'translateY(-3px) scale(1.1)',
                boxShadow: '0 8px 20px rgba(228, 64, 95, 0.3)',
              },
            }}
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>

      {/* Footer Bottom */}
      <Box
        sx={{
          mt: 4,
          pt: 3,
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #42a5f5, transparent)',
          },
          // Define keyframes for the BlackCode Devs animation
          '@keyframes subtleGlow': {
            '0%, 100%': {
              textShadow: '0 0 2px rgba(25, 118, 210, 0.3)',
            },
            '50%': {
              textShadow: '0 0 4px rgba(25, 118, 210, 0.5)',
            },
          },
          '@keyframes eyeCatcher': {
            '0%': {
              transform: 'scale(1)',
              backgroundColor: 'transparent',
              boxShadow: '0 0 0 rgba(25, 118, 210, 0)',
            },
            '20%': {
              transform: 'scale(1.08)',
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              boxShadow: '0 0 15px rgba(25, 118, 210, 0.4)',
            },
            '40%': {
              transform: 'scale(1)',
              backgroundColor: 'transparent',
              boxShadow: '0 0 8px rgba(25, 118, 210, 0.3)',
            },
            '60%': {
              transform: 'scale(1.05)',
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              boxShadow: '0 0 12px rgba(25, 118, 210, 0.35)',
            },
            '100%': {
              transform: 'scale(1)',
              backgroundColor: 'transparent',
              boxShadow: '0 0 0 rgba(25, 118, 210, 0)',
            },
          },
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{
            color: '#666666',
            fontSize: '0.9rem',
            '& strong': {
              color: '#1976d2',
            },
          }}
        >
          © {new Date().getFullYear()} <strong>CourseMinistry</strong> - All Rights Reserved | 
          Developed by{' '}
          <Link 
            href="https://www.blackcodedev.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              position: 'relative',
              display: 'inline-block',
              padding: '2px 6px',
              borderRadius: '4px',
              transition: 'all 0.3s ease-in-out',
              animation: 'eyeCatcher 2.5s ease-in-out 1s 1, subtleGlow 3s ease-in-out 4s infinite',
              
              // Hover effects
              '&:hover': {
                color: '#ffffff',
                backgroundColor: '#1976d2',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                textShadow: 'none',
                animation: 'none', // Stop other animations on hover
              },
            }}
          >
            BlackCode Devs
          </Link>.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;