import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { API_BASE_URL } from "../../Utils/api";

import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Skeleton,
  Chip,
  Grid,
  Button,
  Fade,
  Zoom,
  Slide,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  CardMedia,
} from "@mui/material";
import {
  PlayCircleOutline,
  AccessTime,
  VideoLibrary,
  School,
  Star,
  TrendingUp,
  Close,
  PlayArrow,
} from "@mui/icons-material";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

const CourseViewerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  
  const token = localStorage.getItem("token")?.startsWith("Bearer ")
    ? localStorage.getItem("token").split(" ")[1]
    : localStorage.getItem("token");

  useEffect(() => {
    API.get(`/courses/${id}/access`)
      .then((res) => {
        setCourse(res.data);
        setTimeout(() => setAnimationTrigger(true), 300);
      })
      .catch((err) => alert("Access denied or not approved yet"));
  }, [id]);

  const handleVideoClick = (videoIndex) => {
    setSelectedVideo(videoIndex);
    setOpenVideoDialog(true);
  };

  const handleCloseVideo = () => {
    setOpenVideoDialog(false);
    setSelectedVideo(null);
  };

  if (!course) {
    return (
      <Box sx={{ 
        bgcolor: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", 
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            opacity: 0.1,
            animation: "float 6s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" }
            }
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            left: "-10%",
            width: "25%",
            height: "25%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            opacity: 0.1,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        
        <HomePageNavbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Fade in timeout={800}>
            <Box>
              <Skeleton 
                variant="text" 
                width="60%" 
                height={80} 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.3)",
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 0.3 },
                    "50%": { opacity: 0.6 }
                  }
                }} 
              />
              <Skeleton 
                variant="text" 
                width="80%" 
                height={40} 
                sx={{ 
                  mb: 4, 
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.3)",
                  animation: "pulse 2s ease-in-out infinite 0.5s",
                }} 
              />
              {[1, 2, 3].map((item) => (
                <Zoom key={item} in timeout={800 + item * 200}>
                  <Card sx={{ 
                    mb: 3, 
                    borderRadius: 4,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.7)",
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={35}
                        sx={{ 
                          mb: 2, 
                          borderRadius: 2,
                          bgcolor: "rgba(100,150,255,0.2)",
                        }}
                      />
                      <Skeleton
                        variant="rectangular"
                        height={280}
                        sx={{ 
                          borderRadius: 3,
                          bgcolor: "rgba(100,150,255,0.1)",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Zoom>
              ))}
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: "#ffffff",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Enhanced Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          opacity: 0.4,
          animation: "smoothFloat 12s ease-in-out infinite",
          "@keyframes smoothFloat": {
            "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
            "25%": { transform: "translate(15px, -15px) scale(1.05)" },
            "50%": { transform: "translate(-10px, 10px) scale(0.95)" },
            "75%": { transform: "translate(20px, 5px) scale(1.02)" }
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
          opacity: 0.3,
          animation: "smoothFloat 15s ease-in-out infinite reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "75%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
          opacity: 0.25,
          animation: "smoothFloat 18s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "10%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
          opacity: 0.2,
          animation: "smoothFloat 20s ease-in-out infinite reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "40%",
          right: "15%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
          opacity: 0.3,
          animation: "smoothFloat 14s ease-in-out infinite",
        }}
      />

      <HomePageNavbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Course Header */}
        <Fade in={animationTrigger} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 5,
              mb: 4,
              borderRadius: 6,
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(30, 60, 114, 0.3)",
              transform: animationTrigger ? "translateY(0)" : "translateY(50px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                animation: "rotate 20s linear infinite",
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" }
                }
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                animation: "rotate 15s linear infinite reverse",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Slide direction="right" in={animationTrigger} timeout={1200}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: "2.2rem", md: "3.5rem" },
                    background: "linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {course.title}
                </Typography>
              </Slide>

              <Slide direction="left" in={animationTrigger} timeout={1400}>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.95,
                    mb: 4,
                    lineHeight: 1.8,
                    maxWidth: "85%",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                  }}
                >
                  {course.description}
                </Typography>
              </Slide>

              <Zoom in={animationTrigger} timeout={1600}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                  <Chip
                    icon={<VideoLibrary />}
                    label={`${course.videoCount || 0} Lectures`}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.95)",
                      color: "#1565c0",
                      fontWeight: 700,
                      fontSize: "1rem",
                      height: 48,
                      borderRadius: 4,
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(21, 101, 192, 0.2)",
                      boxShadow: "0 4px 20px rgba(21, 101, 192, 0.15)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "& .MuiChip-icon": {
                        color: "#1565c0",
                        fontSize: "1.2rem",
                      },
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 30px rgba(21, 101, 192, 0.25)",
                        border: "2px solid rgba(21, 101, 192, 0.4)",
                      }
                    }}
                  />
                  <Chip
                    icon={<AccessTime />}
                    label="Self-paced"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.95)",
                      color: "#2e7d32",
                      fontWeight: 700,
                      fontSize: "1rem",
                      height: 48,
                      borderRadius: 4,
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(46, 125, 50, 0.2)",
                      boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "& .MuiChip-icon": {
                        color: "#2e7d32",
                        fontSize: "1.2rem",
                      },
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 30px rgba(46, 125, 50, 0.25)",
                        border: "2px solid rgba(46, 125, 50, 0.4)",
                      }
                    }}
                  />
                  <Chip
                    icon={<Star />}
                    label="Premium"
                    sx={{
                      bgcolor: "rgba(255,193,7,0.95)",
                      color: "#e65100",
                      fontWeight: 700,
                      fontSize: "1rem",
                      height: 48,
                      borderRadius: 4,
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(230, 81, 0, 0.3)",
                      boxShadow: "0 4px 20px rgba(255, 193, 7, 0.4)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "& .MuiChip-icon": {
                        color: "#e65100",
                        fontSize: "1.2rem",
                      },
                      "&:hover": {
                        bgcolor: "rgba(255,193,7,1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 30px rgba(255, 193, 7, 0.6)",
                        border: "2px solid rgba(230, 81, 0, 0.5)",
                      }
                    }}
                  />
                </Box>
              </Zoom>

              <Fade in={animationTrigger} timeout={1800}>
                <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<TrendingUp />}
                    sx={{ 
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      px: 4,
                      py: 1.5,
                      borderRadius: 4,
                      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                      boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 35px rgba(255, 107, 107, 0.6)",
                      }
                    }}
                    onClick={() => navigate(`/quizzes/${id}`)}
                  >
                    📝 Take Quiz
                  </Button>
                  
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 1,
                    bgcolor: "rgba(255,255,255,0.15)",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}>
                    <School sx={{ color: "white", fontSize: "1.2rem" }} />
                    <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                      Interactive Learning
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Paper>
        </Fade>

        {/* Course Content */}
        <Slide direction="up" in={animationTrigger} timeout={1000}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: "#1a237e",
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <VideoLibrary sx={{ color: "#1565c0", fontSize: "2rem" }} />
              </Box>
              Course Content
            </Typography>

            {/* Video Grid */}
            <Grid container spacing={3}>
              {Array.from({ length: course.videoCount || 0 }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Zoom in={animationTrigger} timeout={1200 + idx * 100}>
                    <Card 
                      sx={{ 
                        borderRadius: 4, 
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(21, 101, 192, 0.08)",
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(10px)",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
                          border: "1px solid rgba(21, 101, 192, 0.15)",
                        }
                      }}
                      onClick={() => handleVideoClick(idx)}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          sx={{
                            height: 160,
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0,0,0,0.3)",
                              zIndex: 1,
                            }
                          }}
                        >
                          <Box sx={{ 
                            position: "relative", 
                            zIndex: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                          }}>
                            <Box sx={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.9)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backdropFilter: "blur(10px)",
                              border: "2px solid rgba(255,255,255,0.5)",
                            }}>
                              <PlayArrow sx={{ 
                                color: "#1565c0", 
                                fontSize: "2rem",
                                ml: 0.5
                              }} />
                            </Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: "white", 
                                fontWeight: 600,
                                textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                              }}
                            >
                              Click to Play
                            </Typography>
                          </Box>
                        </CardMedia>
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#1565c0",
                            fontSize: "1.1rem",
                            mb: 1,
                          }}
                        >
                          Lecture {idx + 1}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <PlayCircleOutline sx={{ fontSize: "1rem" }} />
                          Video Content
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={openVideoDialog}
        onClose={handleCloseVideo}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "transparent",
          }
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            color: "white",
            fontWeight: 700,
          }}
        >
          <Typography variant="h6" component="div">
            Lecture {selectedVideo !== null ? selectedVideo + 1 : ""}
          </Typography>
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              color: "white",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              }
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, bgcolor: "#000" }}>
          {selectedVideo !== null && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src={`${API_BASE_URL}/courses/${id}/video/${selectedVideo}?token=${token}`}
                title={`Lecture ${selectedVideo + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CourseViewerPage;