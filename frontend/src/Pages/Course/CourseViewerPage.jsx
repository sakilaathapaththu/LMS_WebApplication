
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API, { IMAGE_BASE_URL } from "../../Utils/api";
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Paper, 
//   Card, 
//   CardContent,
//   Skeleton,
//   Chip,
//   Divider,
//   Grid
// } from "@mui/material";
// import { PlayCircleOutline, AccessTime, VideoLibrary } from "@mui/icons-material";
// import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

// const CourseViewerPage = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     API.get(`/courses/${id}/access`)
//       .then(res => setCourse(res.data))
//       .catch(err => alert("Access denied or not approved yet"));
//   }, [id]);

//   // ✅ Convert Drive /view to /preview for iframe
//   const getEmbedUrl = (url) => {
//     if (url.includes("drive.google.com") && url.includes("/view")) {
//       return url.replace("/view", "/preview");
//     }
//     return url;
//   };

  


//   if (!course) {
//     return (
//       <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
//         <HomePageNavbar />
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//           <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
//           <Skeleton variant="text" width="80%" height={30} sx={{ mb: 4 }} />
//           {[1, 2, 3].map((item) => (
//             <Card key={item} sx={{ mb: 3, borderRadius: 3 }}>
//               <CardContent>
//                 <Skeleton variant="text" width="30%" height={30} sx={{ mb: 2 }} />
//                 <Skeleton variant="rectangular" height={315} sx={{ borderRadius: 2 }} />
//               </CardContent>
//             </Card>
//           ))}
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
//       <HomePageNavbar />
      
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Course Header */}
//         <Paper 
//           elevation={0} 
//           sx={{ 
//             p: 4, 
//             mb: 4, 
//             borderRadius: 4,
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             position: 'relative',
//             overflow: 'hidden'
//           }}
//         >
//           <Box sx={{ position: 'relative', zIndex: 2 }}>
//             <Typography 
//               variant="h3" 
//               component="h1" 
//               sx={{ 
//                 fontWeight: 700,
//                 mb: 2,
//                 fontSize: { xs: '2rem', md: '3rem' }
//               }}
//             >
//               {course.title}
//             </Typography>
            
//             <Typography 
//               variant="h6" 
//               sx={{ 
//                 opacity: 0.9,
//                 mb: 3,
//                 lineHeight: 1.6,
//                 maxWidth: '80%'
//               }}
//             >
//               {course.description}
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <Chip 
//                 icon={<VideoLibrary />}
//                 label={`${course.videoClips?.length || 0} Lectures`}
//                 sx={{ 
//                   bgcolor: 'rgba(255,255,255,0.2)', 
//                   color: 'white',
//                   fontWeight: 600
//                 }}
//               />
//               <Chip 
//                 icon={<AccessTime />}
//                 label="Self-paced"
//                 sx={{ 
//                   bgcolor: 'rgba(255,255,255,0.2)', 
//                   color: 'white',
//                   fontWeight: 600
//                 }}
//               />
//             </Box>
//           </Box>
          
//           {/* Decorative elements */}
//           <Box 
//             sx={{ 
//               position: 'absolute',
//               top: -50,
//               right: -50,
//               width: 200,
//               height: 200,
//               borderRadius: '50%',
//               bgcolor: 'rgba(255,255,255,0.1)',
//               zIndex: 1
//             }} 
//           />
//           <Box 
//             sx={{ 
//               position: 'absolute',
//               bottom: -30,
//               left: -30,
//               width: 150,
//               height: 150,
//               borderRadius: '50%',
//               bgcolor: 'rgba(255,255,255,0.05)',
//               zIndex: 1
//             }} 
//           />
//         </Paper>

//         {/* Course Content */}
//         <Box>
//           <Typography 
//             variant="h4" 
//             sx={{ 
//               mb: 3, 
//               fontWeight: 600,
//               color: '#2c3e50',
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1
//             }}
//           >
//             <VideoLibrary sx={{ color: '#667eea' }} />
//             Course Content
//           </Typography>

//           <Grid container spacing={3}>
//             {/* {course.videoClips?.map((url, idx) => (
//               <Grid item xs={12} key={idx}>
//                 <Card 
//                   sx={{ 
//                     borderRadius: 3,
//                     overflow: 'hidden',
//                     boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
//                     }
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
                    
//                     <Box 
//                       sx={{ 
//                         p: 3,
//                         bgcolor: '#f8f9ff',
//                         borderBottom: '1px solid #e3f2fd'
//                       }}
//                     >
//                       <Typography 
//                         variant="h6" 
//                         sx={{ 
//                           fontWeight: 600,
//                           color: '#2c3e50',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 1
//                         }}
//                       >
//                         <PlayCircleOutline sx={{ color: '#667eea' }} />
//                         Lecture {idx + 1}
//                       </Typography>
//                     </Box>

                    
//                     <Box sx={{ p: 3 }}>
//                       <Box 
//                         sx={{ 
//                           position: 'relative',
//                           width: '100%',
//                           height: 0,
//                           paddingBottom: '56.25%', // 16:9 aspect ratio
//                           borderRadius: 2,
//                           overflow: 'hidden',
//                           boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
//                         }}
//                       >
                       
//                         <iframe
//                           src={getEmbedUrl(url)}
//                           title={`Lecture ${idx + 1}`}
//                           frameBorder="0"
//                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                           allowFullScreen
//                           sandbox="allow-scripts allow-same-origin" // 🔐 disable downloads
//                           style={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%'
//                           }}
//                         ></iframe>
                        


//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))} */}
//           


//           </Grid>
//         </Box>

//         {/* Course Completion Message */}
//         {course.videoClips?.length > 0 && (
//           <Paper 
//             sx={{ 
//               mt: 6,
//               p: 4,
//               textAlign: 'center',
//               borderRadius: 3,
//               bgcolor: '#f0f7ff',
//               border: '1px solid #e3f2fd'
//             }}
//           >
//             <Typography 
//               variant="h6" 
//               sx={{ 
//                 color: '#1976d2',
//                 fontWeight: 600,
//                 mb: 1
//               }}
//             >
//               🎉 You're doing great!
//             </Typography>
//             <Typography 
//               variant="body1" 
//               sx={{ 
//                 color: '#555',
//                 maxWidth: '600px',
//                 mx: 'auto'
//               }}
//             >
//               Take your time to complete each lecture. Learning at your own pace 
//               ensures better understanding and retention of the material.
//             </Typography>
//           </Paper>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default CourseViewerPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Grid
} from "@mui/material";
import { PlayCircleOutline, AccessTime, VideoLibrary } from "@mui/icons-material";
import HomePageNavbar from "../../Components/Navbar/Homepagenavbar";

const CourseViewerPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
 const token = localStorage.getItem("token")?.startsWith("Bearer ")
  ? localStorage.getItem("token").split(" ")[1]
  : localStorage.getItem("token");


  useEffect(() => {
    API.get(`/courses/${id}/access`)
      .then((res) => setCourse(res.data))
      .catch((err) => alert("Access denied or not approved yet"));
  }, [id]);

  if (!course) {
    return (
      <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
        <HomePageNavbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={30} sx={{ mb: 4 }} />
          {[1, 2, 3].map((item) => (
            <Card key={item} sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" width="30%" height={30} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={315} sx={{ borderRadius: 2 }} />
              </CardContent>
            </Card>
          ))}
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <HomePageNavbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Course Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              {course.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                mb: 3,
                lineHeight: 1.6,
                maxWidth: '80%'
              }}
            >
              {course.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<VideoLibrary />}
                label={`${course.videoCount || 0} Lectures`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Chip
                icon={<AccessTime />}
                label="Self-paced"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Course Content */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <VideoLibrary sx={{ color: '#667eea' }} />
            Course Content
          </Typography>

          <Grid container spacing={3}>
            {Array.from({ length: course.videoCount || 0 }).map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, bgcolor: '#f8f9ff' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <PlayCircleOutline sx={{ color: '#667eea' }} />
                        Lecture {idx + 1}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Box sx={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                        <iframe
                          src={`${API_BASE_URL}/courses/${id}/video/${idx}?token=${token}`}
                          title={`Lecture ${idx + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                        ></iframe>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default CourseViewerPage;
