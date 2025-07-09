import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Chip, CircularProgress, Container, Avatar, Divider } from "@mui/material";
import { School, Person, Schedule, TrendingUp, CheckCircle, AccessTime, MenuBook } from "@mui/icons-material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";

const MyEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/courses/my")
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to fetch enrolled courses"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress 
          size={60}
          sx={{ 
            color: '#2196f3',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        <Typography variant="h6" sx={{ color: '#546e7a', fontWeight: 500 }}>
          Loading your courses...
        </Typography>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 100%)',
        borderRadius: 3,
        border: '1px solid rgba(33, 150, 243, 0.1)',
      }}>
        <Avatar sx={{ 
          width: 80, 
          height: 80, 
          bgcolor: '#e3f2fd', 
          mx: 'auto', 
          mb: 2,
          color: '#2196f3'
        }}>
          <MenuBook sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h5" sx={{ color: '#1565c0', fontWeight: 600, mb: 1 }}>
          No enrolled courses found.
        </Typography>
        <Typography variant="body1" sx={{ color: '#546e7a' }}>
          Start your learning journey by enrolling in a course!
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 6 }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 5,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
        p: 4,
        borderRadius: 3,
        border: '1px solid rgba(33, 150, 243, 0.1)',
        boxShadow: '0 4px 20px rgba(33, 150, 243, 0.08)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            bgcolor: '#2196f3', 
            mr: 2,
            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
            boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
          }}>
            <School />
          </Avatar>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#1565c0',
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            My Enrolled Courses
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#546e7a', ml: 7 }}>
          Track your learning progress and continue your educational journey
        </Typography>
      </Box>

      {/* Horizontal Courses Layout */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 4,
        mb: 6
      }}>
        {courses.map(course => (
          <Paper 
            key={course._id}
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)',
              border: '1px solid rgba(33, 150, 243, 0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 40px rgba(33, 150, 243, 0.15)',
                border: '1px solid rgba(33, 150, 243, 0.2)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
              },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: { xs: 'flex-start', md: 'center' }
            }}>
              
              {/* Course Content Section */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#1565c0',
                    fontWeight: 600,
                    mb: 2,
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </Typography>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#546e7a',
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  {course.description.slice(0, 200)}...
                </Typography>

                {/* Course Info Section */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexWrap: 'wrap'
                }}>
                  <Chip 
                    icon={<Person sx={{ fontSize: 18 }} />}
                    label={`Instructor: ${course.conductorName}`}
                    variant="outlined"
                    sx={{
                      borderColor: '#90caf9',
                      color: '#1976d2',
                      bgcolor: 'rgba(33, 150, 243, 0.04)',
                      height: '36px',
                      fontSize: '0.875rem',
                      '&:hover': {
                        bgcolor: 'rgba(33, 150, 243, 0.08)',
                      },
                      '& .MuiChip-icon': {
                        color: '#2196f3',
                      },
                    }}
                  />
                  
                  <Chip 
                    icon={<TrendingUp sx={{ fontSize: 18 }} />}
                    label={`Level: ${course.level}`}
                    variant="outlined"
                    sx={{
                      borderColor: '#90caf9',
                      color: '#1976d2',
                      bgcolor: 'rgba(33, 150, 243, 0.04)',
                      height: '36px',
                      fontSize: '0.875rem',
                      '&:hover': {
                        bgcolor: 'rgba(33, 150, 243, 0.08)',
                      },
                      '& .MuiChip-icon': {
                        color: '#2196f3',
                      },
                    }}
                  />
                  
                  <Chip 
                    icon={<Schedule sx={{ fontSize: 18 }} />}
                    label={`Duration: ${course.duration}`}
                    variant="outlined"
                    sx={{
                      borderColor: '#90caf9',
                      color: '#1976d2',
                      bgcolor: 'rgba(33, 150, 243, 0.04)',
                      height: '36px',
                      fontSize: '0.875rem',
                      '&:hover': {
                        bgcolor: 'rgba(33, 150, 243, 0.08)',
                      },
                      '& .MuiChip-icon': {
                        color: '#2196f3',
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Status Section */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: 2,
                minWidth: { xs: '100%', md: '200px' }
              }}>
                <Divider 
                  orientation={{ xs: 'horizontal', md: 'vertical' }} 
                  sx={{ 
                    borderColor: 'rgba(33, 150, 243, 0.1)',
                    display: { xs: 'block', md: 'none' },
                    width: '100%',
                    my: 1
                  }} 
                />
                
                <Chip
                  icon={course.isApproved ? <CheckCircle sx={{ fontSize: 20 }} /> : <AccessTime sx={{ fontSize: 20 }} />}
                  label={course.isApproved ? "✅ Approved" : "⏳ Pending Approval"}
                  variant="filled"
                  sx={{
                    bgcolor: course.isApproved ? '#e8f5e8' : '#fff3e0',
                    color: course.isApproved ? '#2e7d32' : '#f57c00',
                    border: `1px solid ${course.isApproved ? '#c8e6c9' : '#ffcc02'}`,
                    fontWeight: 600,
                    height: '40px',
                    fontSize: '0.875rem',
                    px: 2,
                    '& .MuiChip-icon': {
                      color: course.isApproved ? '#2e7d32' : '#f57c00',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Course Count Footer with more spacing */}
      <Box sx={{ 
        mt: 8, 
        mb: 4,
        p: 3, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 100%)',
        borderRadius: 3,
        border: '1px solid rgba(33, 150, 243, 0.1)',
        boxShadow: '0 2px 10px rgba(33, 150, 243, 0.05)',
      }}>
        <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 500 }}>
          You are enrolled in {courses.length} course{courses.length !== 1 ? 's' : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: '#546e7a', mt: 1 }}>
          Keep up the great work on your learning journey!
        </Typography>
      </Box>
    </Container>
  );
};

export default MyEnrolledCourses;