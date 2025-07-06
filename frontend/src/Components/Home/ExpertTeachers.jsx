
import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Divider,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Facebook, Instagram, LinkedIn, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import profile01 from "../../Assets/images/profile.jpg";
import sakila from "../../Assets/images/sakila.jpeg";

// Enhanced team data with more professional information
const teamMembers = [
  {
    name: 'Sakila Athapaththu',
    title: 'Co-Director',
    subtitle: 'Leadership & Strategy',
    image: sakila,
    description: 'Experienced educational leader with expertise in curriculum development and strategic planning.',
    social: {
      facebook: 'https://facebook.com/sakilaathapaththu',
      instagram: 'https://instagram.com/sakilaathapaththu',
      linkedin: 'https://linkedin.com/in/sakila-athapaththu-412647215',
    }
  },
  {
    name: 'Thamidu Sulakshana',
    title: 'Director',
    subtitle: 'Academic Operations',
    image: profile01,
    description: 'Dedicated to maintaining high academic standards and operational efficiency.',
    social: {
      facebook: 'https://facebook.com/thamidu.sulakshana',
      instagram: 'https://instagram.com/thamidu.sulakshana',
      linkedin: 'https://linkedin.com/in/thamidu-sulakshana',
    }
  },
  {
    name: 'Praveen Liyanage',
    title: 'Director',
    subtitle: 'Executive Leadership',
    image: profile01,
    description: 'Visionary leader focused on educational excellence and organizational development.',
    social: {
      facebook: 'https://facebook.com/praveen.liyanage',
      instagram: 'https://instagram.com/praveen.liyanage',
      linkedin: 'https://linkedin.com/in/praveen-liyanage',
    }
  },
  {
    name: 'Thilina Sadamal',
    title: 'Director',
    subtitle: 'Innovation & Development',
    image: profile01,
    description: 'Passionate about educational innovation and sustainable growth initiatives.',
    social: {
      facebook: 'https://facebook.com/thilina.sadamal',
      instagram: 'https://instagram.com/thilina.sadamal',
      linkedin: 'https://linkedin.com/in/thilina-sadamal',
    }
  },
];

const ProfessionalTeamCard = ({ name, title, subtitle, image, description, social }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: `2px solid #e3f2fd`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateY(0) scale(1)',
        '&:hover': {
          transform: 'translateY(-12px) scale(1.03)',
          boxShadow: '0 20px 40px rgba(33, 150, 243, 0.15)',
          borderColor: '#2196f3',
          '& .card-image': {
            transform: 'scale(1.08)',
          },
          '& .card-content': {
            transform: 'translateY(-4px)',
          },
          '& .social-button': {
            transform: 'translateY(-3px) scale(1.15)',
          },
          '& .director-chip': {
            transform: 'scale(1.08)',
            backgroundColor: '#1976d2',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          },
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #42a5f5, #2196f3, #1976d2)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s ease-in-out',
        },
        '&:hover:before': {
          transform: 'scaleX(1)',
        },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: 280,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        }}
      >
        <Box
          component="img"
          alt={`${name} - ${title}`}
          src={image}
          className="card-image"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease-in-out',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(33, 150, 243, 0.1) 0%, transparent 50%)',
          }}
        />
      </Box>

      {/* Content Section */}
      <CardContent
        className="card-content"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          backgroundColor: '#ffffff',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 1.5,
            transition: 'color 0.3s ease-in-out',
          }}
        >
          {name}
        </Typography>

        <Box sx={{ mb: 1.5 }}>
          <Chip
            label={title}
            size="small"
            className="director-chip"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              backgroundColor: '#2196f3',
              color: '#ffffff',
              border: `1px solid #2196f3`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          />
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#1976d2',
            mb: 1.5,
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: 0,
              height: '2px',
              backgroundColor: '#2196f3',
              transition: 'width 0.3s ease-in-out',
            },
          }}
        >
          {subtitle}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#666666',
            lineHeight: 1.7,
            mb: 2.5,
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        <Divider 
          sx={{ 
            mb: 2.5,
            background: 'linear-gradient(90deg, #bbdefb, #2196f3, #bbdefb)',
            height: '1px',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s ease-in-out 0.1s',
          }} 
        />

        {/* Social Media Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <IconButton
            aria-label={`${name} Facebook profile`}
            component="a"
            href={social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            className="social-button"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: `2px solid #e3f2fd`,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                color: '#1877F2',
                backgroundColor: '#e3f2fd',
                borderColor: '#1877F2',
                boxShadow: '0 6px 16px rgba(24, 119, 242, 0.2)',
              },
            }}
          >
            <Facebook fontSize="small" />
          </IconButton>

          <IconButton
            aria-label={`${name} LinkedIn profile`}
            component="a"
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            className="social-button"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: `2px solid #e3f2fd`,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                color: '#0A66C2',
                backgroundColor: '#e3f2fd',
                borderColor: '#0A66C2',
                boxShadow: '0 6px 16px rgba(10, 102, 194, 0.2)',
              },
            }}
          >
            <LinkedIn fontSize="small" />
          </IconButton>

          <IconButton
            aria-label={`${name} Instagram profile`}
            component="a"
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            className="social-button"
            sx={{
              color: '#666666',
              backgroundColor: '#ffffff',
              border: `2px solid #e3f2fd`,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                color: '#E4405F',
                backgroundColor: '#e3f2fd',
                borderColor: '#E4405F',
                boxShadow: '0 6px 16px rgba(228, 64, 95, 0.2)',
              },
            }}
          >
            <Instagram fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const ExpertTeam = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 50%, #e3f2fd 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3rem' },
            }}
          >
            Meet Our Expert Team
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.8,
              fontWeight: 400,
              color: '#555555',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Our dedicated leadership team brings together years of experience in education, 
            innovation, and strategic development to drive excellence in everything we do.
          </Typography>
        </Box>

        {/* Team Grid */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {teamMembers.map((member, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              lg={3} 
              key={index}
              sx={{
                opacity: 0,
                transform: 'translateY(30px)',
                animation: `fadeInUp 0.8s ease-out ${index * 0.15}s forwards`,
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
              <ProfessionalTeamCard {...member} />
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 8, md: 10 },
          }}
        >
          <Card
            elevation={0}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              p: 4,
              backgroundColor: '#ffffff',
              border: `2px solid #e3f2fd`,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(33, 150, 243, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#1976d2',
                mb: 2,
              }}
            >
              Ready to Work With Our Expert Team?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                lineHeight: 1.7,
                fontStyle: 'italic',
                mb: 3,
              }}
            >
              Connect with us on social media or reach out to learn more about our educational programs 
              and how we can help you achieve your goals.
            </Typography>
            
            {/* Contact Us Button */}
            <Button
              component={Link}
              to="/contactus"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#2196f3',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                py: 1.5,
                px: 4,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(33, 150, 243, 0.4)',
                  '& .MuiSvgIcon-root': {
                    transform: 'translateX(4px)',
                  },
                },
                '& .MuiSvgIcon-root': {
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              Contact Us
            </Button>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default ExpertTeam;