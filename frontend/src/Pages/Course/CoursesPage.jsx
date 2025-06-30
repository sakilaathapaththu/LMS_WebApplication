
import React, { useEffect, useState } from "react";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import {
  Card, CardContent, CardMedia, Typography, Button, Grid, Box, Chip, Avatar, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/AuthContext";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";
import { 
  PlayArrow, 
  Schedule, 
  TrendingUp, 
  Person, 
  Visibility,
  StarBorder,
  BookmarkBorder
} from "@mui/icons-material";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = user ? "/courses/my" : "/courses/all";
    API.get(endpoint)
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error loading courses", err));
  }, [user]);

  const handleEnrollClick = (courseId) => {
    if (!user) {
      alert("You must be logged in to enroll.");
      navigate("/login");
    } else {
      navigate(`/courses/${courseId}/enroll`);
    }
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#2196F3';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '🎯';
      default: return '📚';
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg,rgb(107, 214, 231) 0%,rgb(87, 167, 183) 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <HomePageNavbar/>
      
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 6, 
        px: 3,
        position: 'relative',
        zIndex: 1
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          {user ? 'My Learning Journey' : 'Discover Amazing Courses'}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 600,
            mx: 'auto',
            mb: 4
          }}
        >
          {user ? 'Continue your learning adventure' : 'Unlock your potential with our curated selection of courses'}
        </Typography>
      </Box>

      {/* Courses Grid */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 6 }}>
        <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 } }}>
          {courses.map(course => (
            <Grid item xs={12} sm={6} lg={4} key={course._id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
                  '& .course-image': {
                    transform: 'scale(1.1)',
                  },
                  '& .course-overlay': {
                    opacity: 1,
                  }
                }
              }}>
                {/* Course Image with Overlay */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  {course.coverImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${IMAGE_BASE_URL}/${course.coverImage.replace(/\\/g, "/")}`}
                      alt={course.title}
                      className="course-image"
                      sx={{
                        transition: 'transform 0.4s ease',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <Box 
                    className="course-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconButton 
                      sx={{ 
                        color: 'white', 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 32 }} />
                    </IconButton>
                  </Box>

                  {/* Level Badge */}
                  <Chip
                    label={`${getLevelIcon(course.level)} ${course.level}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: getLevelColor(course.level),
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />

                  {/* Bookmark Icon */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      width: 36,
                      height: 36,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
                    }}
                  >
                    <BookmarkBorder sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>

                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  p: 3
                }}>
                  {/* Course Title */}
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: '#1a1a1a',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {course.title}
                  </Typography>

                  {/* Course Description */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {course.description.slice(0, 120)}...
                  </Typography>

                  {/* Course Meta Information */}
                  <Box sx={{ mb: 3 }}>
                    {/* Instructor */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#667eea' }}>
                        <Person sx={{ fontSize: 14 }} />
                      </Avatar>
                      <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                        {course.conductorName}
                      </Typography>
                    </Box>

                    {/* Duration */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ fontSize: 16, mr: 1, color: '#667eea' }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {course.duration}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Button */}
                  {user && course.isApproved ? (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/courses/${course._id}/view`)}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #5a6fd8, #6a42c4)',
                          boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<TrendingUp />}
                      onClick={() => handleEnrollClick(course._id)}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #45a049, #3d8b40)',
                          boxShadow: '0 12px 32px rgba(76, 175, 80, 0.4)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Enroll Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {courses.length === 0 && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            px: 3
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontWeight: 600
              }}
            >
              No courses found
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                maxWidth: 400,
                mx: 'auto'
              }}
            >
              {user ? 'You haven\'t enrolled in any courses yet.' : 'Check back soon for new courses!'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CoursesPage;