import React, { useEffect, useState } from "react";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import {
  Card, CardContent, CardMedia, Typography, Button, Grid, Box, Chip, Avatar, IconButton,
  Fade, Slide, Zoom, Grow
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
  BookmarkBorder,
  School,
  EmojiEvents,
  AutoAwesome
} from "@mui/icons-material";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = user ? "/courses/my" : "/courses/all";
    API.get(endpoint)
      .then(res => {
        setCourses(res.data);
        setFilteredCourses(res.data);
        setTimeout(() => setLoaded(true), 300);
      })
      .catch(err => console.error("Error loading courses", err));
  }, [user]);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      (course.category && course.category.toLowerCase().includes(lowerQuery))
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

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
      case 'beginner': return 'linear-gradient(135deg, #2e7d32, #4caf50)';
      case 'intermediate': return 'linear-gradient(135deg, #f57c00, #ff9800)';
      case 'advanced': return 'linear-gradient(135deg, #c62828, #f44336)';
      default: return 'linear-gradient(135deg, #1976d2, #42a5f5)';
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '🌟';
      case 'intermediate': return '🚀';
      case 'advanced': return '💎';
      default: return '📚';
    }
  };
// helpers (top of file)
const getCoverSrc = (course) => {
  const fallback = "/course-placeholder.jpg"; // add a placeholder in /public
  let p = course?.coverImage;
  if (!p) return fallback;

  p = String(p).trim();

  // If backend already returns a full URL (Vercel Blob/S3/etc.)
  if (/^https?:\/\//i.test(p)) return p;

  // Normalize slashes
  p = p.replace(/\\/g, "/").replace(/^\/+/, "");

  // Avoid “uploads/uploads/..”
  // If p already starts with 'uploads/', don't add another 'uploads'
  const needsBase = !/^uploads\//i.test(p);
  const path = needsBase ? p : p; // keep as-is if it already contains uploads/

  // IMAGE_BASE_URL should be like: http://localhost:5000
  return `${IMAGE_BASE_URL}/${path}`;
};

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 25%, #bbdefb 50%, #90caf9 75%, #64b5f6 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(25, 118, 210, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, rgba(33, 150, 243, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none'
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.03) 50%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.03) 50%, transparent 51%)
        `,
        backgroundSize: '20px 20px',
        animation: 'shimmer 15s linear infinite',
        pointerEvents: 'none'
      },
      '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-20px) rotate(5deg)' }
      },
      '@keyframes shimmer': {
        '0%': { backgroundPosition: '0 0' },
        '100%': { backgroundPosition: '40px 40px' }
      }
    }}>
      <HomePageNavbar />

      {/* Hero Section */}
      <Fade in={true} timeout={1000}>
        <Box sx={{
          textAlign: 'center',
          py: { xs: 6, md: 8 },
          px: 3,
          position: 'relative',
          zIndex: 1,
          mt:10
         
        }}>
          <Slide in={true} direction="down" timeout={1200}>
            <Box sx={{ position: 'relative' }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  letterSpacing: '-0.02em',
                  position: 'relative',
                  textShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 60,
                    height: 4,
                    background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                    borderRadius: 2,
                    animation: 'pulse 2s ease-in-out infinite'
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.6, transform: 'translateX(-50%) scaleX(1)' },
                    '50%': { opacity: 1, transform: 'translateX(-50%) scaleX(1.2)' }
                  }
                }}
              >
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                  <School sx={{ fontSize: 'inherit', color: '#1976d2' }} />
                  SmartLearn
                </Box>
              </Typography>
            </Box>
          </Slide>
         
        </Box>
      </Fade>

      {/* Professional Search Section */}
      <Fade in={loaded} timeout={800}>
        <Box sx={{ 
          px: { xs: 2, md: 4 }, 
          mb: 6, 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <Box sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            position: 'relative'
          }}>
            <Box sx={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 4,
              border: '2px solid rgba(25, 118, 210, 0.1)',
              boxShadow: '0 10px 40px rgba(25, 118, 210, 0.08)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                border: '2px solid rgba(25, 118, 210, 0.2)',
                boxShadow: '0 15px 50px rgba(25, 118, 210, 0.12)'
              },
              '&:focus-within': {
                border: '2px solid #1976d2',
                boxShadow: '0 15px 50px rgba(25, 118, 210, 0.15)'
              }
            }}>
              <input
                type="text"
                placeholder="Search courses, categories, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  borderRadius: '14px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#333',
                  fontFamily: 'inherit'
                }}
              />
              <Box sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#1976d2',
                opacity: 0.7
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Professional Courses Grid */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 } }}>
          {filteredCourses.map((course, index) => (
            <Grow
              key={course._id}
              in={loaded}
              timeout={1000 + index * 200}
            >
              <Grid item xs={12} sm={6} lg={4}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 5,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 20px 60px rgba(25, 118, 210, 0.08)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #1976d2, #42a5f5, #64b5f6)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s ease'
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 40px 80px rgba(25, 118, 210, 0.15)',
                    '&::before': {
                      transform: 'scaleX(1)'
                    },
                    '& .course-image': {
                      transform: 'scale(1.1) rotate(2deg)',
                    },
                    '& .course-overlay': {
                      opacity: 1,
                    },
                    '& .course-stats': {
                      transform: 'translateY(0)',
                      opacity: 1
                    }
                  }
                }}>
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    {course.coverImage && (
                      // <CardMedia
                      //   component="img"
                      //   height="240"
                      //   image={`${IMAGE_BASE_URL}/${course.coverImage.replace(/\\/g, "/")}`}
                      //   alt={course.title}
                      //   className="course-image"
                      //   sx={{
                      //     transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      //     objectFit: 'cover',
                      //     filter: 'brightness(1.1) contrast(1.1)'
                      //   }}
                      // />
                      <CardMedia
                        component="img"
                        height="240"
                        image={getCoverSrc(course)}
                        alt={course.title}
                        className="course-image"
                        
                        sx={{
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          objectFit: 'cover',
                          filter: 'brightness(1.1) contrast(1.1)'
                        }}
                      />

                    )}
                    <Box
                      className="course-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.85), rgba(66, 165, 245, 0.85))',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2
                      }}
                    >
                      
                    </Box>
                    
                    <Chip
                      label={`${getLevelIcon(course.level)} ${course.level}`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: getLevelColor(course.level),
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        px: 1.5,
                        height: 36,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                        border: '2px solid rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                        '& .MuiChip-label': {
                          px: 1,
                          fontWeight: 800,
                          letterSpacing: '0.5px'
                        }
                      }}
                    />
                    
                    

                    <Box 
                      className="course-stats"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
                        color: 'white',
                        p: 2,
                        transform: 'translateY(100%)',
                        opacity: 0,
                        transition: 'all 0.4s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmojiEvents sx={{ fontSize: 16 }} />
                        <Typography variant="caption">Premium</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AutoAwesome sx={{ fontSize: 16 }} />
                        <Typography variant="caption">Certificate</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 251, 255, 0.95))',
                    borderTop: '1px solid rgba(25, 118, 210, 0.08)'
                  }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: '#1565c0',
                        lineHeight: 1.3,
                        fontSize: '1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#1976d2'
                        }
                      }}
                    >
                      {course.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#546e7a',
                        mb: 3,
                        lineHeight: 1.6,
                        flexGrow: 1,
                        fontSize: '0.95rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {course.description.slice(0, 120)}...
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        p: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        border: '1px solid rgba(25, 118, 210, 0.12)',
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.05)'
                      }}>
                        <Avatar sx={{ 
                          width: 36, 
                          height: 36, 
                          mr: 2, 
                          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                        }}>
                          <Person sx={{ fontSize: 20 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ 
                            color: '#1565c0', 
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            mb: 0.5
                          }}>
                            {course.conductorName}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: '#666',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            Expert Instructor
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 3,
                        border: '1px solid rgba(76, 175, 80, 0.12)',
                        boxShadow: '0 2px 8px rgba(76, 175, 80, 0.05)'
                      }}>
                        <Box sx={{
                          width: 36,
                          height: 36,
                          mr: 2,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                        }}>
                          <Schedule sx={{ 
                            fontSize: 20, 
                            color: 'white'
                          }} />
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ 
                            color: '#1565c0', 
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            mb: 0.5
                          }}>
                            {course.duration}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: '#666',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}>
                            Self-paced learning
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {user && course.isApproved ? (
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Visibility />}
                        onClick={() => navigate(`/courses/${course._id}/view`)}
                        sx={{
                          py: 1.8,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)',
                          fontWeight: 700,
                          textTransform: 'none',
                          fontSize: '1rem',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                            transition: 'left 0.6s'
                          },
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                            boxShadow: '0 12px 40px rgba(25, 118, 210, 0.5)',
                            transform: 'translateY(-2px)',
                            '&::before': {
                              left: '100%'
                            }
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
                          py: 1.8,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                          boxShadow: '0 8px 24px rgba(76, 175, 80, 0.4)',
                          fontWeight: 700,
                          textTransform: 'none',
                          fontSize: '1rem',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                            transition: 'left 0.6s'
                          },
                          '&:hover': {
                            background: 'linear-gradient(135deg, #43a047 0%, #4caf50 100%)',
                            boxShadow: '0 12px 40px rgba(76, 175, 80, 0.5)',
                            transform: 'translateY(-2px)',
                            '&::before': {
                              left: '100%'
                            }
                          }
                        }}
                      >
                        Enroll Now - Start Learning
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>

        {filteredCourses.length === 0 && (
          <Fade in={loaded} timeout={1000}>
            <Box sx={{
              textAlign: 'center',
              py: 8,
              px: 3
            }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#1976d2',
                  mb: 2,
                  fontWeight: 700
                }}
              >
                No courses found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  maxWidth: 400,
                  mx: 'auto',
                  fontSize: '1.1rem'
                }}
              >
                {user ? 'Ready to start your learning journey? Browse our course catalog!' : 'New courses are added weekly. Check back soon!'}
              </Typography>
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default CoursesPage;