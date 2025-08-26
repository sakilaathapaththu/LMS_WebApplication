import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Fade,
  Grow,
  CircularProgress,
  Backdrop
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { School, LockOpen, Verified } from "@mui/icons-material";
import API, { IMAGE_BASE_URL } from "../../Utils/api";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

// Professional animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

// Styled components
const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  }
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  position: 'relative',
  zIndex: 1,
}));

const EnrollmentCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  boxShadow: `
    0 25px 50px -12px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3)
  `,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2, #42a5f5, #64b5f6, #42a5f5, #1976d2)',
    backgroundSize: '300% 100%',
    animation: `${shimmer} 3s ease-in-out infinite`,
  }
}));

const CourseTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  position: 'relative',
  animation: `${slideInLeft} 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
    borderRadius: '2px',
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  '&:hover': {
    '& img': {
      transform: 'scale(1.08)',
    },
    transform: 'translateY(-4px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const CourseImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '320px',
  objectFit: 'cover',
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: '450px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    fontSize: '16px',
    padding: '4px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(25, 118, 210, 0.2)',
    borderWidth: '2px',
  },
  '& .MuiInputLabel-root': {
    color: '#1976d2',
    fontWeight: 600,
    '&.Mui-focused': {
      color: '#1976d2',
    },
  },
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both`,
}));

const EnrollButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
  borderRadius: '16px',
  padding: '16px 40px',
  fontSize: '18px',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${pulseGlow} 3s infinite, ${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: 'rgba(25, 118, 210, 0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(25, 118, 210, 0.1)',
  animation: `${fadeInUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both`,
}));

const LoadingOverlay = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
}));

const EnrollCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await API.get("/courses/all");
        const found = res.data.find(c => c._id === id);
        setCourse(found);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async () => {
    if (!key.trim()) {
      alert("Please enter an enrollment key");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/courses/enroll", { courseId: id, enrollmentKey: key });
      alert("Enrollment submitted. Waiting for admin approval.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <HomePageNavbar />
        <LoadingOverlay open={loading}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
              Loading course details...
            </Typography>
          </Box>
        </LoadingOverlay>
      </MainContainer>
    );
  }

  if (!course) {
    return (
      <MainContainer>
        <HomePageNavbar />
        <StyledContainer>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#1976d2' }}>
            Course not found
          </Typography>
        </StyledContainer>
      </MainContainer>
    );
  }
  
const fileBase = (IMAGE_BASE_URL || "").replace(/\/api\/?$/, ""); 
function resolveCoverUrl(coverImage) {
  if (!coverImage) return "/course-placeholder.png";
  let p = String(coverImage);

  // If absolute URL, return as-is
  if (/^https?:\/\//i.test(p)) return p;

  // Normalize Windows-style paths to forward slashes
  p = p.replace(/\\/g, "/");

  // Remove leading slash to avoid double slashes when concatenating
  if (p.startsWith("/")) p = p.slice(1);

  return `${fileBase}/${p}`; // fileBase points to your server origin (no /api)
}
  return (
    <MainContainer>
      <HomePageNavbar />
      
      <StyledContainer maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <EnrollmentCard elevation={0}>
            <CardContent sx={{ padding: { xs: 4, md: 6 } }}>
              <CourseTitle variant="h2" component="h1">
                {course.title}
              </CourseTitle>
              
              <FeatureBox>
                <School sx={{ color: '#1976d2', fontSize: 28 }} />
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                  Professional Certification Course
                </Typography>
              </FeatureBox>
              
              <Grow in={true} timeout={1200}>
                <ImageContainer>
                  {/* <CourseImage
                    src={`${IMAGE_BASE_URL}/${course.coverImage}`}
                    alt={`${course.title} cover`}
                    loading="lazy"
                  /> */}
                  <CourseImage
                    src={resolveCoverUrl(course.coverImage)}
                    alt={`${course.title} cover`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = "/course-placeholder.png"; }}
                  />

                </ImageContainer>
              </Grow>
              
              <FormContainer>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <LockOpen sx={{ color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Enter your enrollment key to access this course
                  </Typography>
                </Box>
                
                <StyledTextField
                  fullWidth
                  label="Enrollment Key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <Verified sx={{ color: '#1976d2', mr: 1 }} />
                    ),
                  }}
                />
                
                <Box sx={{ textAlign: 'center' }}>
                  <EnrollButton
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                    size="large"
                    fullWidth
                  >
                    {submitting ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                        Processing...
                      </>
                    ) : (
                      'Enroll Now'
                    )}
                  </EnrollButton>
                </Box>
              </FormContainer>
            </CardContent>
          </EnrollmentCard>
        </Fade>
      </StyledContainer>
    </MainContainer>
  );
};

export default EnrollCoursePage;