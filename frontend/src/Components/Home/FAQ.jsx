import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ForumIcon from '@mui/icons-material/Forum';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [supportVisible, setSupportVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const [supportAnimatedItems, setSupportAnimatedItems] = useState(new Set());
  const sectionRef = useRef(null);
  const supportRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // FAQ data for CourseMinistry LMS
  const faqData = [
    {
      id: 'panel1',
      question: 'How do I get started with CourseMinistry?',
      answer: 'Getting started is easy! Simply create your account, choose your learning path, and begin with our interactive onboarding process. Our AI-powered system will recommend courses based on your goals and skill level.'
    },
    {
      id: 'panel2',
      question: 'Can I access courses offline?',
      answer: 'Yes, CourseMinistry offers offline access to downloaded course materials. You can download videos, documents, and interactive content to continue learning even without an internet connection.'
    },
    {
      id: 'panel3',
      question: 'What types of certificates do you offer?',
      answer: 'We provide industry-recognized certificates upon course completion. These include completion certificates, professional certifications, and verified certificates that can be shared on LinkedIn and other professional platforms.'
    },
    {
      id: 'panel4',
      question: 'Is there a mobile app available?',
      answer: 'Absolutely! CourseMinistry is fully responsive and offers dedicated mobile apps for both iOS and Android. Access all features, track progress, and learn on-the-go with our optimized mobile experience.'
    },
    {
      id: 'panel5',
      question: 'How does the AI-powered learning work?',
      answer: 'Our advanced AI analyzes your learning patterns, preferences, and progress to create personalized learning paths. It adapts content difficulty, suggests relevant courses, and optimizes your learning schedule for maximum effectiveness.'
    },
    {
      id: 'panel6',
      question: 'What support options are available?',
      answer: 'We offer 24/7 customer support through live chat, email, and phone. Plus, access our comprehensive help center, community forums, and dedicated success managers for premium users.'
    }
  ];

  // Support options data
  const supportOptions = [
    {
      id: 'live-chat',
      title: '24/7 Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatIcon,
      availability: 'Available 24/7',
      responseTime: 'Instant',
      color: '#4caf50',
      action: 'Start Chat'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us detailed questions and feedback',
      icon: EmailIcon,
      availability: 'Business Hours',
      responseTime: '< 2 hours',
      color: '#2196f3',
      action: 'Send Email'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Talk directly with our experts',
      icon: PhoneIcon,
      availability: 'Mon-Fri 9AM-6PM',
      responseTime: 'Immediate',
      color: '#ff9800',
      action: 'Call Now'
    },
    {
      id: 'help-center',
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      icon: HelpOutlineIcon,
      availability: 'Always Available',
      responseTime: 'Self-service',
      color: '#9c27b0',
      action: 'Browse Articles'
    },
    {
      id: 'community',
      title: 'Community Forum',
      description: 'Connect with other learners and experts',
      icon: ForumIcon,
      availability: '24/7 Community',
      responseTime: 'Varies',
      color: '#607d8b',
      action: 'Join Discussion'
    },
    {
      id: 'video-call',
      title: 'Video Consultation',
      description: 'Schedule a one-on-one session',
      icon: VideoCameraFrontIcon,
      availability: 'By Appointment',
      responseTime: 'Scheduled',
      color: '#e91e63',
      action: 'Book Session'
    }
  ];

  // Intersection Observer for FAQ section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Intersection Observer for Support section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSupportVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (supportRef.current) {
      observer.observe(supportRef.current);
    }

    return () => {
      if (supportRef.current) {
        observer.unobserve(supportRef.current);
      }
    };
  }, []);

  // Staggered animation for FAQ items
  useEffect(() => {
    if (isVisible) {
      faqData.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => new Set([...prev, index]));
        }, index * 150);
      });
    }
  }, [isVisible]);

  // Staggered animation for Support items
  useEffect(() => {
    if (supportVisible) {
      supportOptions.forEach((_, index) => {
        setTimeout(() => {
          setSupportAnimatedItems(prev => new Set([...prev, index]));
        }, index * 200);
      });
    }
  }, [supportVisible]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {/* FAQ Section */}
      <Box
        ref={sectionRef}
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #f8fbff 0%, #e3f2fd 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(33, 150, 243, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={isVisible} timeout={800}>
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    borderRadius: 2
                  }
                }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6
                }}
              >
                Find answers to common questions about CourseMinistry and how our platform can enhance your learning journey
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            {faqData.map((faq, index) => (
              <Grow
                key={faq.id}
                in={animatedItems.has(index)}
                timeout={600}
                style={{ transitionDelay: animatedItems.has(index) ? '0ms' : '150ms' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'rgba(25, 118, 210, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(25, 118, 210, 0.15)',
                      borderColor: 'rgba(25, 118, 210, 0.2)'
                    }
                  }}
                >
                  <Accordion
                    expanded={expanded === faq.id}
                    onChange={handleChange(faq.id)}
                    sx={{
                      boxShadow: 'none',
                      '&:before': {
                        display: 'none'
                      },
                      '& .MuiAccordionSummary-root': {
                        backgroundColor: expanded === faq.id ? '#e3f2fd' : 'transparent',
                        transition: 'all 0.3s ease-in-out',
                        minHeight: { xs: 64, md: 72 },
                        '&:hover': {
                          backgroundColor: '#f8fbff'
                        }
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: '#1976d2',
                            transition: 'transform 0.3s ease-in-out',
                            fontSize: { xs: '1.5rem', md: '1.8rem' }
                          }}
                        />
                      }
                      sx={{
                        px: { xs: 2, md: 3 },
                        py: 1
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#1976d2',
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          lineHeight: 1.4,
                          pr: 2
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: { xs: 2, md: 3 },
                        pb: { xs: 2, md: 3 },
                        pt: 0,
                        backgroundColor: '#fafbfc'
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grow>
            ))}
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '-5%',
              width: { xs: 150, md: 250 },
              height: { xs: 150, md: 250 },
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'float 6s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(180deg)' }
              }
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              left: '-5%',
              width: { xs: 100, md: 200 },
              height: { xs: 100, md: 200 },
              background: 'linear-gradient(135deg, rgba(66, 165, 245, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              animation: 'float 8s ease-in-out infinite reverse',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-15px) rotate(-180deg)' }
              }
            }}
          />
        </Container>
      </Box>

      {/* Support Section */}
      <Box
        ref={supportRef}
        sx={{
          py: { xs: 10, md: 14 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e8f4fd 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={supportVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    mr: 2
                  }}
                >
                  <SupportAgentIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textAlign: 'left'
                    }}
                  >
                    Need Help?
                  </Typography>
                  {/* <Chip
                    label="We're here for you!"
                    sx={{
                      background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                      color: 'white',
                      fontWeight: 600,
                      ml: 1
                    }}
                  /> */}
                </Box>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  maxWidth: 700,
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                  mb: 2
                }}
              >
                Our dedicated support team is ready to assist you with any questions or technical issues
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon sx={{ color: '#ffc107', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    4.9/5 Customer Satisfaction
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>•</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Average Response: 2 minutes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* <Grid container spacing={4}>
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Grid item xs={12} sm={6} lg={4} key={option.id}>
                  <Grow
                    in={supportAnimatedItems.has(index)}
                    timeout={800}
                    style={{ transitionDelay: supportAnimatedItems.has(index) ? '0ms' : '200ms' }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.4s ease-in-out',
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        borderRadius: 4,
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: `0 20px 40px rgba(25, 118, 210, 0.15)`,
                          borderColor: option.color,
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 70,
                            height: 70,
                            bgcolor: option.color,
                            mx: 'auto',
                            mb: 3,
                            boxShadow: `0 8px 20px ${option.color}30`
                          }}
                        >
                          <IconComponent sx={{ fontSize: 35 }} />
                        </Avatar>
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: 'text.primary'
                          }}
                        >
                          {option.title}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                            mb: 3,
                            lineHeight: 1.6
                          }}
                        >
                          {option.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            <strong>Availability:</strong> {option.availability}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <strong>Response Time:</strong> {option.responseTime}
                          </Typography>
                        </Box>

                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            bgcolor: option.color,
                            color: 'white',
                            fontWeight: 600,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                              bgcolor: option.color,
                              filter: 'brightness(1.1)',
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          {option.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              );
            })}
          </Grid> */}

          {/* Bottom CTA */}
          <Fade in={supportVisible} timeout={1200} style={{ transitionDelay: '800ms' }}>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Paper
                elevation={8}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                  Still need assistance?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                  Our expert team is standing by to help you succeed with CourseMinistry
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: '#1976d2',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                        transform: 'scale(1.05)'
                      }
                    }}
                    startIcon={<ChatIcon />}
                  >
                    Start Live Chat
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'scale(1.05)'
                      }
                    }}
                    startIcon={<HelpOutlineIcon />}
                  >
                    Browse Help Center
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
};

export default FAQSection;