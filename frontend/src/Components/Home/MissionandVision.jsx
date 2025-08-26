import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  TrackChanges,
  Star,
  Group,
  EmojiEvents,
  MenuBook
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import missionImg from '../../Assets/images/mission.jpg';
import visionImg from '../../Assets/images/vision.jpg';

const MissionandVision = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({
    header: false,
    mission: false,
    vision: false,
    values: false,
    cta: false
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const sectionRefs = {
    header: useRef(null),
    mission: useRef(null),
    vision: useRef(null),
    values: useRef(null),
    cta: useRef(null)
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.dataset.section;
            setVisibleSections(prev => ({
              ...prev,
              [sectionName]: true
            }));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const AnimatedBox = ({ children, isVisible, delay = 0, direction = 'up' }) => {
    const getTransform = () => {
      if (!isVisible) {
        switch (direction) {
          case 'left': return 'translateX(-60px)';
          case 'right': return 'translateX(60px)';
          case 'up': return 'translateY(60px)';
          case 'down': return 'translateY(-60px)';
          default: return 'translateY(60px)';
        }
      }
      return 'translateX(0) translateY(0)';
    };

    return (
      <Box
        sx={{
          opacity: isVisible ? 1 : 0,
          transform: getTransform(),
          transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        }}
      >
        {children}
      </Box>
    );
  };

  // Updated navigation handlers with scroll to top
  const handleMissionClick = () => {
    navigate('/our-mission');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleVisionClick = () => {
    navigate('/aboutus');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          '& > div': {
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 6s ease-in-out infinite'
          }
        }}
      >
        <Box
          sx={{
            top: { xs: 40, md: 80 },
            left: { xs: 20, md: 80 },
            width: { xs: 80, sm: 100, md: 128 },
            height: { xs: 80, sm: 100, md: 128 },
            bgcolor: 'primary.main',
            animationDelay: '0s'
          }}
        />
        <Box
          sx={{
            bottom: { xs: 80, md: 160 },
            right: { xs: 20, md: 160 },
            width: { xs: 120, sm: 150, md: 192 },
            height: { xs: 120, sm: 150, md: 192 },
            bgcolor: 'primary.light',
            animationDelay: '2s'
          }}
        />
        <Box
          sx={{
            top: '40%',
            left: '30%',
            width: { xs: 60, sm: 80, md: 96 },
            height: { xs: 60, sm: 80, md: 96 },
            bgcolor: 'primary.dark',
            animationDelay: '4s'
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <Box
          ref={sectionRefs.header}
          data-section="header"
          sx={{ textAlign: 'center', mb: { xs: 6, sm: 8 } }}
        >
          <AnimatedBox isVisible={visibleSections.header} delay={0}>
            <Typography
              variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'}
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 2,
                fontSize: { 
                  xs: '2rem', 
                  sm: '2.5rem', 
                  md: '3rem', 
                  lg: '3.5rem' 
                },
                lineHeight: 1.2
              }}
            >
              Our Mission &{' '}
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontSize: 'inherit',
                  fontWeight: 'inherit'
                }}
              >
                Vision
              </Typography>
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox isVisible={visibleSections.header} delay={0.2}>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                mb: 3,
                px: { xs: 2, sm: 0 },
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Empowering learners worldwide through innovative technology and exceptional educational experiences
            </Typography>
          </AnimatedBox>

          <AnimatedBox isVisible={visibleSections.header} delay={0.4}>
            <Box
              sx={{
                width: { xs: 60, sm: 80, md: 96 },
                height: 4,
                background: 'linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)',
                mx: 'auto',
                borderRadius: 2
              }}
            />
          </AnimatedBox>
        </Box>

        {/* Mission Section - Image Left, Content Right */}
        <Box
          ref={sectionRefs.mission}
          data-section="mission"
          sx={{ mb: { xs: 8, sm: 12 } }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
            {/* Mission Image - Left */}
            <Grid item xs={12} lg={6} order={{ xs: 2, lg: 1 }}>
              <AnimatedBox isVisible={visibleSections.mission} direction="left" delay={0}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 450 },
                    borderRadius: { xs: 3, sm: 4 },
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02) translateY(-8px)'
                    }
                  }}
                >
                  <img
                    src={missionImg}
                    alt="Our Mission - Empowering Education"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'inherit'
                    }}
                  />
                  
                  {/* Overlay gradient for better visual appeal */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                      borderRadius: 'inherit'
                    }}
                  />
                </Box>
              </AnimatedBox>
            </Grid>

            {/* Mission Content - Right */}
            <Grid item xs={12} lg={6} order={{ xs: 1, lg: 2 }}>
              <AnimatedBox isVisible={visibleSections.mission} direction="right" delay={0.2}>
                <Box sx={{ pl: { lg: 4 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    justifyContent: { xs: 'center', lg: 'flex-start' }
                  }}>
                    <Box
                      sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        mr: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)'
                        }
                      }}
                    >
                      <TrackChanges sx={{ 
                        fontSize: { xs: 28, sm: 32 }, 
                        color: 'white' 
                      }} />
                    </Box>
                    <Typography 
                      variant={isMobile ? 'h4' : 'h3'} 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
                      }}
                    >
                      Our Mission
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' },
                      lineHeight: 1.8,
                      mb: 4,
                      textAlign: { xs: 'center', lg: 'left' }
                    }}
                  >
                    To empower students with accessible, high-quality educational resources and personalized guidance, fostering knowledge, skill development, and lifelong learning through an intuitive and innovative online learning platform
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1.5,
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                    mb: 3
                  }}>
                    {['Accessibility', 'Innovation', 'Excellence'].map((tag, index) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                          fontWeight: 600,
                          px: 2,
                          py: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'primary.100',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleMissionClick}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                        }
                      }}
                    >
                      Learn More About Our Mission
                    </Button>
                  </Box>
                </Box>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Box>

        {/* Vision Section - Content Left, Image Right */}
        <Box
          ref={sectionRefs.vision}
          data-section="vision"
          sx={{ mb: { xs: 8, sm: 12 } }}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
            {/* Vision Content - Left */}
            <Grid item xs={12} lg={6}>
              <AnimatedBox isVisible={visibleSections.vision} direction="left" delay={0}>
                <Box sx={{ pr: { lg: 4 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    justifyContent: { xs: 'center', lg: 'flex-start' }
                  }}>
                    <Box
                      sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        mr: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(-5deg)'
                        }
                      }}
                    >
                      <Visibility sx={{ 
                        fontSize: { xs: 28, sm: 32 }, 
                        color: 'white' 
                      }} />
                    </Box>
                    <Typography 
                      variant={isMobile ? 'h4' : 'h3'} 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
                      }}
                    >
                      Our Vision
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' },
                      lineHeight: 1.8,
                      mb: 4,
                      textAlign: { xs: 'center', lg: 'left' }
                    }}
                  >
                    To become the leading online learning ministry, transforming the educational journey of students worldwide by providing a trusted, comprehensive, and inspiring digital environment for learning, growth, and achievement
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1.5,
                    justifyContent: { xs: 'center', lg: 'flex-start' },
                    mb: 3
                  }}>
                    {['Global Impact', 'Transformation', 'Future-Ready'].map((tag, index) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                          fontWeight: 600,
                          px: 2,
                          py: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'primary.100',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleVisionClick}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                        }
                      }}
                    >
                      Explore Our Vision
                    </Button>
                  </Box>
                </Box>
              </AnimatedBox>
            </Grid>

            {/* Vision Image - Right */}
            <Grid item xs={12} lg={6}>
              <AnimatedBox isVisible={visibleSections.vision} direction="right" delay={0.2}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 450 },
                    borderRadius: { xs: 3, sm: 4 },
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02) translateY(-8px)'
                    }
                  }}
                >
                  <img
                    src={visionImg}
                    alt="Our Vision - Future of Learning"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 'inherit'
                    }}
                  />
                  
                  {/* Overlay gradient for better visual appeal */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
                      borderRadius: 'inherit'
                    }}
                  />
                </Box>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Box>

        {/* Core Values */}
        <Box
          ref={sectionRefs.values}
          data-section="values"
          sx={{ textAlign: 'center' }}
        >
          <AnimatedBox isVisible={visibleSections.values} delay={0}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: { xs: 4, sm: 6 },
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Our{' '}
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontSize: 'inherit',
                  fontWeight: 'inherit'
                }}
              >
                Core Values
              </Typography>
            </Typography>
          </AnimatedBox>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {[
              {
                icon: Star,
                title: "Excellence",
                description: "Pursuing the highest standards in everything we do"
              },
              {
                icon: Group,
                title: "Community",
                description: "Building connections that foster collaborative learning"
              },
              {
                icon: EmojiEvents,
                title: "Achievement",
                description: "Celebrating every milestone in the learning journey"
              },
              {
                icon: MenuBook,
                title: "Innovation",
                description: "Continuously evolving to meet tomorrow's challenges"
              }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <AnimatedBox 
                  isVisible={visibleSections.values} 
                  delay={0.2 + index * 0.1}
                  direction="up"
                >
                  <Card
                    sx={{
                      p: { xs: 2, sm: 3 },
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'primary.light',
                      borderRadius: { xs: 2, sm: 3 },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)',
                        transform: 'translateY(-12px) scale(1.02)'
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: '0 !important' }}>
                      <Box
                        sx={{
                          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                          width: { xs: 48, sm: 56, md: 64 },
                          height: { xs: 48, sm: 56, md: 64 },
                          borderRadius: { xs: 2, sm: 3 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.15) rotate(10deg)'
                          }
                        }}
                      >
                        <value.icon sx={{ 
                          fontSize: { xs: 24, sm: 28, md: 32 }, 
                          color: 'white' 
                        }} />
                      </Box>
                      <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 2,
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.875rem', sm: '0.9rem' }
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          ref={sectionRefs.cta}
          data-section="cta"
          sx={{
            textAlign: 'center',
            mt: { xs: 6, sm: 8 }
          }}
        >
          <AnimatedBox isVisible={visibleSections.cta} delay={0} direction="up">
            <Paper
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: { xs: 3, sm: 4 },
                p: { xs: 3, sm: 4, md: 5 },
                color: 'white',
                boxShadow: '0 20px 40px rgba(25, 118, 210, 0.3)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <Typography 
                variant={isMobile ? 'h5' : 'h4'} 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                }}
              >
                Ready to Transform Your Learning Experience?
              </Typography>
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  mb: 3,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Join thousands of learners who have already discovered the power of CourseMinistry
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  borderRadius: { xs: 2, sm: 3 },
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  boxShadow: '0 8px 16px rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'scale(1.08) translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(255, 255, 255, 0.4)'
                  }
                }}
              >
                Start Your Journey Today
              </Button>
            </Paper>
          </AnimatedBox>
        </Box>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default MissionandVision;