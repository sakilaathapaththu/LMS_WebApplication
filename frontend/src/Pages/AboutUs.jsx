// import React, { useState, useEffect, useRef } from "react";
// import HomePageNavbar from "../Components/Navbar/Homepagenavbar";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   LinearProgress,
//   Rating,
//   AppBar,
//   Toolbar,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert
// } from "@mui/material";
// import {
//   School,
//   People,
//   MenuBook,
//   EmojiEvents,
//   TrendingUp,
//   Computer,
//   Language,
//   Headset,
//   Security,
//   Cloud,
//   Analytics,
//   Star,
//   ChevronRight,
//   Add,
//   Send
// } from "@mui/icons-material";


// // Enhanced scroll animation hook
// const useScrollAnimation = () => {
//   const [visibleElements, setVisibleElements] = useState(new Set());

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setVisibleElements(prev => new Set([...prev, entry.target.dataset.animateId]));
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     const elements = document.querySelectorAll('[data-animate-id]');
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   return visibleElements;
// };

// // Animated wrapper component
// const AnimatedDiv = ({ children, id, sx = {}, delay = 0, direction = "up", ...props }) => {
//   const visibleElements = useScrollAnimation();
//   const isVisible = visibleElements.has(id);

//   const getTransform = () => {
//     if (!isVisible) {
//       switch(direction) {
//         case "left": return "translateX(-50px)";
//         case "right": return "translateX(50px)";
//         case "up": return "translateY(50px)";
//         case "down": return "translateY(-50px)";
//         default: return "translateY(50px)";
//       }
//     }
//     return "translateX(0) translateY(0)";
//   };

//   return (
//     <Box
//       data-animate-id={id}
//       sx={{
//         transform: getTransform(),
//         opacity: isVisible ? 1 : 0,
//         transition: 'all 0.7s ease-out',
//         transitionDelay: `${delay}ms`,
//         ...sx
//       }}
//       {...props}
//     >
//       {children}
//     </Box>
//   );
// };

// // Stats Card Component
// const StatsCard = ({ icon: Icon, number, label, delay = 0 }) => (
//   <AnimatedDiv
//     id={`stats-${label}`}
//     delay={delay}
//   >
//     <Card sx={{ 
//       background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//       color: 'white',
//       height: '100%',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'translateY(-8px)',
//         boxShadow: 6
//       }
//     }}>
//       <CardContent sx={{ textAlign: 'center', py: 4 }}>
//         <Icon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
//         <Typography variant="h3" fontWeight="bold" gutterBottom>
//           {number}
//         </Typography>
//         <Typography variant="h6">
//           {label}
//         </Typography>
//       </CardContent>
//     </Card>
//   </AnimatedDiv>
// );

// // Enhanced Feature Card Component with consistent sizing
// const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
//   <AnimatedDiv
//     id={`feature-${title}`}
//     direction="left"
//     delay={delay}
//   >
//     <Card sx={{ 
//       height: '100%',
//       minHeight: 200,
//       display: 'flex',
//       flexDirection: 'column',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'translateY(-4px)',
//         boxShadow: 4
//       }
//     }}>
//       <CardContent sx={{ 
//         p: 3, 
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexGrow: 1 }}>
//           <Box sx={{ 
//             bgcolor: '#e3f2fd', 
//             p: 1.5, 
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexShrink: 0
//           }}>
//             <Icon sx={{ color: '#1976d2', fontSize: 24 }} />
//           </Box>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="h6" fontWeight="600" gutterBottom>
//               {title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
//               {description}
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   </AnimatedDiv>
// );

// // Team Member Card
// const TeamMemberCard = ({ name, role, image, delay = 0 }) => (
//   <AnimatedDiv
//     id={`team-${name}`}
//     delay={delay}
//   >
//     <Card sx={{ 
//       height: '100%',
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'scale(1.05)',
//         boxShadow: 6
//       }
//     }}>
//       <CardContent sx={{ textAlign: 'center', p: 3 }}>
//         <Avatar
//           src={image}
//           alt={name}
//           sx={{ 
//             width: 80, 
//             height: 80, 
//             mx: 'auto', 
//             mb: 2,
//             border: '3px solid #e3f2fd'
//           }}
//         />
//         <Typography variant="h6" fontWeight="600" gutterBottom>
//           {name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {role}
//         </Typography>
//       </CardContent>
//     </Card>
//   </AnimatedDiv>
// );

// // Review Form Component
// const ReviewForm = ({ open, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     role: '',
//     rating: 5,
//     review: ''
//   });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.name && formData.role && formData.review) {
//       onSubmit(formData);
//       setFormData({ name: '', role: '', rating: 5, review: '' });
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Share Your Experience</DialogTitle>
//       <DialogContent>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Your Name"
//                 value={formData.name}
//                 onChange={(e) => handleChange('name', e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Your Role/Title"
//                 value={formData.role}
//                 onChange={(e) => handleChange('role', e.target.value)}
//                 required
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
//               <Rating
//                 value={formData.rating}
//                 onChange={(event, newValue) => handleChange('rating', newValue)}
//                 size="large"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Your Review"
//                 value={formData.review}
//                 onChange={(e) => handleChange('review', e.target.value)}
//                 placeholder="Tell us about your experience with Smart Learning LMS..."
//                 required
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button 
//           onClick={handleSubmit} 
//           variant="contained" 
//           startIcon={<Send />}
//           disabled={!formData.name || !formData.role || !formData.review}
//         >
//           Submit Review
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Progress Bar Component
// const ProgressBar = ({ value, delay = 0 }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setProgress(value);
//     }, delay);
//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return (
//     <Box sx={{ width: '100%', mt: 2 }}>
//       <LinearProgress
//         variant="determinate"
//         value={progress}
//         sx={{
//           height: 8,
//           borderRadius: 4,
//           bgcolor: 'rgba(255,255,255,0.2)',
//           '& .MuiLinearProgress-bar': {
//             bgcolor: 'white',
//             borderRadius: 4,
//             transition: 'transform 1s ease-out'
//           }
//         }}
//       />
//     </Box>
//   );
// };

// const AboutUs = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
//   const [userReviews, setUserReviews] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleReviewSubmit = (reviewData) => {
//     const newReview = {
//       ...reviewData,
//       id: Date.now(),
//       image: `https://ui-avatars.com/api/?name=${reviewData.name}&background=1976d2&color=fff`
//     };
//     setUserReviews(prev => [newReview, ...prev]);
//     setSnackbarOpen(true);
//   };

//   const stats = [
//     { icon: People, number: "50K+", label: "Students" },
//     { icon: MenuBook, number: "500+", label: "Courses" },
//     { icon: School, number: "100+", label: "Instructors" },
//     { icon: EmojiEvents, number: "98%", label: "Success Rate" },
//   ];

//   const features = [
//     {
//       icon: Computer,
//       title: "Interactive Learning",
//       description: "Engage with multimedia content, quizzes, and interactive exercises designed to enhance your learning experience.",
//     },
//     {
//       icon: Language,
//       title: "Multi-Language Support",
//       description: "Access courses in multiple languages to break down barriers and reach a global audience.",
//     },
//     {
//       icon: Headset,
//       title: "24/7 Support",
//       description: "Our dedicated support team is available round the clock to assist you with any queries or technical issues.",
//     },
//     {
//       icon: Security,
//       title: "Secure Platform",
//       description: "Your data and progress are protected with enterprise-grade security measures and regular backups.",
//     },
//     {
//       icon: Cloud,
//       title: "Cloud-Based",
//       description: "Access your courses from anywhere, anytime with our reliable cloud infrastructure.",
//     },
//     {
//       icon: Analytics,
//       title: "Progress Tracking",
//       description: "Monitor your learning journey with detailed analytics and progress reports.",
//     },
//   ];

//   const teamMembers = [
//     { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
//     { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     { name: "Emily Rodriguez", role: "Head of Education", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     { name: "David Kim", role: "Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//   ];

//   const benefits = [
//     { icon: School, title: "Personalized Learning Paths", description: "Tailored courses based on your goals and skill level" },
//     { icon: EmojiEvents, title: "Industry-Recognized Certificates", description: "Boost your career with verified credentials" },
//     { icon: People, title: "Community Support", description: "Connect with peers and mentors in your field" },
//     { icon: TrendingUp, title: "Career Advancement", description: "Skills and knowledge that translate to real-world success" },
//   ];

//   const defaultTestimonials = [
//     {
//       text: "Smart Learning LMS completely transformed my career. The courses are comprehensive and the support is outstanding.",
//       name: "Alex Thompson",
//       role: "Software Developer",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       rating: 5
//     },
//     {
//       text: "The interactive learning approach kept me engaged throughout. I've gained skills that directly apply to my job.",
//       name: "Maria Garcia",
//       role: "Marketing Manager",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
//       rating: 5
//     },
//     {
//       text: "Flexible learning that fits my schedule. The quality of instruction is exceptional and the platform is user-friendly.",
//       name: "James Wilson",
//       role: "Data Analyst",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
//       rating: 5
//     }
//   ];

//   const allTestimonials = [...userReviews, ...defaultTestimonials];

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
//       <HomePageNavbar />
      
//       {/* Hero Section */}
//       <Box sx={{ 
//         background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//         color: 'white',
//         py: { xs: 8, lg: 12 },
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <Box sx={{ 
//           position: 'absolute', 
//           inset: 0, 
//           bgcolor: 'rgba(0,0,0,0.1)' 
//         }} />
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
//           <Box sx={{ 
//             textAlign: 'center',
//             transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
//             opacity: isLoaded ? 1 : 0,
//             transition: 'all 1s ease-out'
//           }}>
//             <Typography 
//               variant="h2" 
//               component="h1" 
//               fontWeight="bold" 
//               gutterBottom
//               sx={{ 
//                 fontSize: { xs: '2.5rem', lg: '4rem' },
//                 background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text'
//               }}
//             >
//               About CourseMinistry
//             </Typography>
//             <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
//               Your Ministry of Knowledge
//             </Typography>
//             <ProgressBar value={100} delay={1000} />
//           </Box>
//         </Container>
//       </Box>

//       {/* Company Overview */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <AnimatedDiv id="story-header">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//               Our Story
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//               Founded in 2024, CourseMinistry has been at the forefront of educational technology innovation
//             </Typography>
//           </Box>
//         </AnimatedDiv>

//         <Grid container spacing={6} alignItems="center">
//           <Grid item xs={12} lg={6}>
//             <AnimatedDiv id="company-image" direction="left">
//               <Box
//                 component="img"
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
//                 alt="Our Company"
//                 sx={{
//                   width: '100%',
//                   height: 'auto',
//                   borderRadius: 2,
//                   boxShadow: 4
//                 }}
//               />
//             </AnimatedDiv>
//           </Grid>
          
//           <Grid item xs={12} lg={6}>
//             <AnimatedDiv id="mission-content" direction="right" delay={200}>
//               <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
//                 Our Mission
//               </Typography>
//               <Typography variant="body1" color="text.secondary" paragraph>
//                 To empower students with accessible, high-quality educational resources and personalized guidance, 
//                 fostering knowledge, skill development, and lifelong learning through an intuitive and 
//                 innovative online learning platform
//               </Typography>
//               <Typography variant="body1" color="text.secondary" paragraph>
//                 We are committed to breaking down traditional barriers to education and creating opportunities for 
//                 personal and professional growth through innovative technology and pedagogical excellence.
//               </Typography>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
//                 <Chip label="Innovation" sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} />
//                 <Chip label="Excellence" sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }} />
//                 <Chip label="Accessibility" sx={{ bgcolor: '#fff3e0', color: '#f57c00' }} />
//               </Box>
//             </AnimatedDiv>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Stats Section */}
//       <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
//         <Container maxWidth="lg">
//           <AnimatedDiv id="stats-header">
//             <Box sx={{ textAlign: 'center', mb: 6 }}>
//               <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//                 Our Impact
//               </Typography>
//               <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//                 Numbers that reflect our commitment to educational excellence
//               </Typography>
//             </Box>
//           </AnimatedDiv>
          
//           <Grid container spacing={3}>
//             {stats.map((stat, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <StatsCard {...stat} delay={index * 100} />
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* What We Offer */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <AnimatedDiv id="features-header">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//               What We Offer
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//               Comprehensive learning solutions designed to meet diverse educational needs
//             </Typography>
//           </Box>
//         </AnimatedDiv>

//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} md={6} lg={4} key={index}>
//               <FeatureCard {...feature} delay={index * 100} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* What Clients Get */}
//       <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} lg={6}>
//               <AnimatedDiv id="clients-content" direction="left">
//                 <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//                   What Our Clients Get
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" paragraph>
//                   When you choose CourseMinistry, you're not just getting a platform – you're gaining access to a 
//                   comprehensive educational ecosystem designed to accelerate your learning journey.
//                 </Typography>
                
//                 <Box sx={{ mt: 4 }}>
//                   {benefits.map((benefit, index) => (
//                     <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
//                       <Box sx={{ 
//                         bgcolor: '#e3f2fd', 
//                         p: 1, 
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexShrink: 0
//                       }}>
//                         <benefit.icon sx={{ color: '#1976d2', fontSize: 20 }} />
//                       </Box>
//                       <Box>
//                         <Typography variant="h6" fontWeight="600" gutterBottom>
//                           {benefit.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {benefit.description}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   ))}
//                 </Box>
//               </AnimatedDiv>
//             </Grid>
            
//             <Grid item xs={12} lg={6}>
//               <AnimatedDiv id="clients-image" direction="right" delay={200}>
//                 <Box
//                   component="img"
//                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
//                   alt="What Clients Get"
//                   sx={{
//                     width: '100%',
//                     height: 'auto',
//                     borderRadius: 2,
//                     boxShadow: 4
//                   }}
//                 />
//               </AnimatedDiv>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Team Section */}
//       <Container maxWidth="lg" sx={{ py: 8 }}>
//         <AnimatedDiv id="team-header">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//               Meet Our Team
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//               The passionate professionals behind CourseMinistry LMS
//             </Typography>
//           </Box>
//         </AnimatedDiv>

//         <Grid container spacing={4}>
//           {teamMembers.map((member, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <TeamMemberCard {...member} delay={index * 100} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Values Section */}
//       <Box sx={{ bgcolor: 'white', py: 8 }}>
//         <Container maxWidth="lg">
//           <AnimatedDiv id="values-header">
//             <Box sx={{ textAlign: 'center', mb: 6 }}>
//               <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//                 Our Values
//               </Typography>
//               <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//                 The principles that guide everything we do
//               </Typography>
//             </Box>
//           </AnimatedDiv>

//           <Grid container spacing={4}>
//             {[
//               { icon: TrendingUp, title: "Innovation", description: "We continuously push the boundaries of educational technology to create better learning experiences.", delay: 0 },
//               { icon: Star, title: "Quality", description: "Every course, feature, and interaction is crafted with meticulous attention to detail and excellence.", delay: 200 },
//               { icon: People, title: "Accessibility", description: "We believe education should be available to everyone, regardless of background or circumstance.", delay: 400 }
//             ].map((value, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <AnimatedDiv id={`value-${value.title.toLowerCase()}`} delay={value.delay}>
//                   <Box sx={{ textAlign: 'center' }}>
//                     <Box sx={{ 
//                       bgcolor: '#e3f2fd', 
//                       width: 64, 
//                       height: 64, 
//                       borderRadius: '50%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mx: 'auto',
//                       mb: 2
//                     }}>
//                       <value.icon sx={{ color: '#1976d2', fontSize: 32 }} />
//                     </Box>
//                     <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
//                       {value.title}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       {value.description}
//                     </Typography>
//                   </Box>
//                 </AnimatedDiv>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Enhanced Testimonials Section */}
//       <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
//         <Container maxWidth="lg">
//           <AnimatedDiv id="testimonials-header">
//             <Box sx={{ textAlign: 'center', mb: 6 }}>
//               <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
//                 What Our Students Say
//               </Typography>
//               <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
//                 Real feedback from learners who've transformed their careers
//               </Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={() => setReviewDialogOpen(true)}
//                 sx={{ 
//                   background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
//                   boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
//                   '&:hover': {
//                     background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
//                   }
//                 }}
//               >
//                 Add Your Review
//               </Button>
//             </Box>
//           </AnimatedDiv>

//           <Grid container spacing={4}>
//             {allTestimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <AnimatedDiv id={`testimonial-${index + 1}`} delay={index * 100}>
//                   <Card sx={{ 
//                     height: '100%',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: 4
//                     }
//                   }}>
//                     <CardContent sx={{ p: 3 }}>
//                       <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
//                       <Typography variant="body1" color="text.secondary" paragraph>
//                         "{testimonial.text}"
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                         <Avatar
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           sx={{ width: 40, height: 40 }}
//                         />
//                         <Box>
//                           <Typography variant="subtitle2" fontWeight="600">
//                             {testimonial.name}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {testimonial.role}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </AnimatedDiv>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Call to Action */}
//       <Box sx={{ 
//         background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//         color: 'white',
//         py: 8
//       }}>
//         <Container maxWidth="lg">
//           <AnimatedDiv id="cta-content">
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h3" fontWeight="bold" gutterBottom>
//                 Ready to Transform Your Learning?
//               </Typography>
//               <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
//                 Join thousands of learners who have already started their journey with CourseMinistry
//               </Typography>
//             </Box>
//           </AnimatedDiv>
//         </Container>
//       </Box>
//       {/* Review Form Dialog */}
//       <ReviewForm
//         open={reviewDialogOpen}
//         onClose={() => setReviewDialogOpen(false)}
//         onSubmit={handleReviewSubmit}
//       />

//       {/* Success Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={() => setSnackbarOpen(false)} 
//           severity="success" 
//           sx={{ width: '100%' }}
//         >
//           Thank you for your review! It has been added successfully.
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AboutUs;
import React, { useState, useEffect, useRef } from "react";
import HomePageNavbar from "../Components/Navbar/Homepagenavbar";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Rating,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import {
  School,
  People,
  MenuBook,
  EmojiEvents,
  TrendingUp,
  Computer,
  Language,
  Headset,
  Security,
  Cloud,
  Analytics,
  Star,
  ChevronRight,
  Add,
  Send
} from "@mui/icons-material";



// Enhanced scroll animation hook
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animateId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

// Animated wrapper component
const AnimatedDiv = ({ children, id, sx = {}, delay = 0, direction = "up", ...props }) => {
  const visibleElements = useScrollAnimation();
  const isVisible = visibleElements.has(id);

  const getTransform = () => {
    if (!isVisible) {
      switch(direction) {
        case "left": return "translateX(-50px)";
        case "right": return "translateX(50px)";
        case "up": return "translateY(50px)";
        case "down": return "translateY(-50px)";
        default: return "translateY(50px)";
      }
    }
    return "translateX(0) translateY(0)";
  };

  return (
    <Box
      data-animate-id={id}
      sx={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.7s ease-out',
        transitionDelay: `${delay}ms`,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, number, label, delay = 0 }) => (
  <AnimatedDiv
    id={`stats-${label}`}
    delay={delay}
  >
    <Card sx={{ 
      background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      color: 'white',
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: 6
      }
    }}>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Icon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {number}
        </Typography>
        <Typography variant="h6">
          {label}
        </Typography>
      </CardContent>
    </Card>
  </AnimatedDiv>
);

// Enhanced Feature Card Component with consistent sizing
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <AnimatedDiv
    id={`feature-${title}`}
    direction="left"
    delay={delay}
  >
    <Card sx={{ 
      height: '100%',
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ 
        p: 3, 
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexGrow: 1 }}>
          <Box sx={{ 
            bgcolor: '#e3f2fd', 
            p: 1.5, 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon sx={{ color: '#1976d2', fontSize: 24 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </AnimatedDiv>
);

// Team Member Card
const TeamMemberCard = ({ name, role, image, delay = 0 }) => (
  <AnimatedDiv
    id={`team-${name}`}
    delay={delay}
  >
    <Card sx={{ 
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 6
      }
    }}>
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
        <Avatar
          src={image}
          alt={name}
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 2,
            border: '3px solid #e3f2fd'
          }}
        />
        <Typography variant="h6" fontWeight="600" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  </AnimatedDiv>
);

// Review Form Component
const ReviewForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    review: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.review) {
      onSubmit(formData);
      setFormData({ name: '', role: '', rating: 5, review: '' });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Your Experience</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Role/Title"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
              <Rating
                value={formData.rating}
                onChange={(event, newValue) => handleChange('rating', newValue)}
                size="large"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review"
                value={formData.review}
                onChange={(e) => handleChange('review', e.target.value)}
                placeholder="Tell us about your experience with Smart Learning LMS..."
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          startIcon={<Send />}
          disabled={!formData.name || !formData.role || !formData.review}
        >
          Submit Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Progress Bar Component
const ProgressBar = ({ value, delay = 0 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'rgba(255,255,255,0.2)',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'white',
            borderRadius: 4,
            transition: 'transform 1s ease-out'
          }
        }}
      />
    </Box>
  );
};

const AboutUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      image: `https://ui-avatars.com/api/?name=${reviewData.name}&background=1976d2&color=fff`
    };
    setUserReviews(prev => [newReview, ...prev]);
    setSnackbarOpen(true);
  };

  const stats = [
    { icon: People, number: "50K+", label: "Students" },
    { icon: MenuBook, number: "500+", label: "Courses" },
    { icon: School, number: "100+", label: "Instructors" },
    { icon: EmojiEvents, number: "98%", label: "Success Rate" },
  ];

  const features = [
    {
      icon: Computer,
      title: "Interactive Learning",
      description: "Engage with multimedia content, quizzes, and interactive exercises designed to enhance your learning experience.",
    },
    {
      icon: Language,
      title: "Multi-Language Support",
      description: "Access courses in multiple languages to break down barriers and reach a global audience.",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock to assist you with any queries or technical issues.",
    },
    {
      icon: Security,
      title: "Secure Platform",
      description: "Your data and progress are protected with enterprise-grade security measures and regular backups.",
    },
    {
      icon: Cloud,
      title: "Cloud-Based",
      description: "Access your courses from anywhere, anytime with our reliable cloud infrastructure.",
    },
    {
      icon: Analytics,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and progress reports.",
    },
  ];

  const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
    { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Emily Rodriguez", role: "Head of Education", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { name: "David Kim", role: "Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  ];

  const benefits = [
    { icon: School, title: "Personalized Learning Paths", description: "Tailored courses based on your goals and skill level" },
    { icon: EmojiEvents, title: "Industry-Recognized Certificates", description: "Boost your career with verified credentials" },
    { icon: People, title: "Community Support", description: "Connect with peers and mentors in your field" },
    { icon: TrendingUp, title: "Career Advancement", description: "Skills and knowledge that translate to real-world success" },
  ];

  const defaultTestimonials = [
    {
      text: "Smart Learning LMS completely transformed my career. The courses are comprehensive and the support is outstanding.",
      name: "Alex Thompson",
      role: "Software Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 5
    },
    {
      text: "The interactive learning approach kept me engaged throughout. I've gained skills that directly apply to my job.",
      name: "Maria Garcia",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 5
    },
    {
      text: "Flexible learning that fits my schedule. The quality of instruction is exceptional and the platform is user-friendly.",
      name: "James Wilson",
      role: "Data Analyst",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 5
    }
  ];

  const allTestimonials = [...userReviews, ...defaultTestimonials];

return (
  <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
    <HomePageNavbar />

    {/* Hero Section */}
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: { xs: 8, lg: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.1)'
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            opacity: isLoaded ? 1 : 0,
            transition: 'all 1s ease-out'
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', lg: '4rem' },
              background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            About CourseMinistry
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Your Ministry of Knowledge
          </Typography>
          <ProgressBar value={100} delay={1000} />
        </Box>
      </Container>
    </Box>

    {/* Company Overview */}
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <AnimatedDiv id="story-header">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
            Our Story
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 900, mx: 'auto' }}>
            Established in 2020, Smart Learning LMS is redefining how people learn, teach, and grow in the digital era. 
            Our journey began with a simple vision: to make high-quality education accessible, engaging, and effective for everyone.
          </Typography>
        </Box>
      </AnimatedDiv>

      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} lg={6}>
          <AnimatedDiv id="company-image" direction="left">
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Smart Learning LMS"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 4
              }}
            />
          </AnimatedDiv>
        </Grid>

        <Grid item xs={12} lg={6}>
          <AnimatedDiv id="mission-content" direction="right" delay={200}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We aim to democratize education by delivering a platform where learning is personalized, flexible, and impactful. 
              From academic courses to professional upskilling, Smart Learning LMS is designed to help learners achieve their goals.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              By blending advanced technology with pedagogical excellence, we ensure education is not limited by time, place, or background.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip label="Innovation" sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} />
              <Chip label="Excellence" sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }} />
              <Chip label="Accessibility" sx={{ bgcolor: '#fff3e0', color: '#f57c00' }} />
            </Box>
          </AnimatedDiv>
        </Grid>
      </Grid>
    </Container>

    {/* Stats Section */}
    <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="lg">
        <AnimatedDiv id="stats-header">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
              Our Impact
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Advancing education everywhere with measurable growth.
            </Typography>
          </Box>
        </AnimatedDiv>

        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard {...stat} delay={index * 100} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* What We Offer */}
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <AnimatedDiv id="features-header">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
            What We Offer
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Smarter, simpler, and more effective learning experiences
          </Typography>
        </Box>
      </AnimatedDiv>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <FeatureCard {...feature} delay={index * 100} />
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* What Clients Get */}
    <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <AnimatedDiv id="clients-content" direction="left">
              <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
                Why Choose Us
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Smart Learning LMS isn’t just another learning platform — it’s a complete ecosystem designed to support students, educators, and institutions in achieving excellence.
              </Typography>

              <Box sx={{ mt: 4 }}>
                {benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        bgcolor: '#e3f2fd',
                        p: 1,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <benefit.icon sx={{ color: '#1976d2', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </AnimatedDiv>
          </Grid>

          <Grid item xs={12} lg={6}>
            <AnimatedDiv id="clients-image" direction="right" delay={200}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                alt="Smart Learning Experience"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 4
                }}
              />
            </AnimatedDiv>
          </Grid>
        </Grid>
      </Container>
    </Box>

    {/* Team Section */}
    {/* <Container maxWidth="lg" sx={{ py: 8 }}>
      <AnimatedDiv id="team-header">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
            Meet Our Team
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Dedicated experts shaping the future of digital education
          </Typography>
        </Box>
      </AnimatedDiv>

      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TeamMemberCard {...member} delay={index * 100} />
          </Grid>
        ))}
      </Grid>
    </Container> */}

    {/* Values Section */}
    <Box sx={{ bgcolor: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <AnimatedDiv id="values-header">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
              Our Core Values
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              The foundation that drives our innovation and impact
            </Typography>
          </Box>
        </AnimatedDiv>

        <Grid container spacing={4}>
          {[
            {
              icon: TrendingUp,
              title: 'Innovation',
              description: 'We embrace emerging technologies to deliver smarter and more engaging learning solutions.',
              delay: 0
            },
            {
              icon: Star,
              title: 'Quality',
              description: 'Every feature, course, and tool is built with excellence and learner success in mind.',
              delay: 200
            },
            {
              icon: People,
              title: 'Accessibility',
              description: 'We believe education is a right, not a privilege — available to all, anytime, anywhere.',
              delay: 400
            }
          ].map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <AnimatedDiv id={`value-${value.title.toLowerCase()}`} delay={value.delay}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: '#e3f2fd',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <value.icon sx={{ color: '#1976d2', fontSize: 32 }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {value.description}
                  </Typography>
                </Box>
              </AnimatedDiv>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* Testimonials */}
    {/* <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
      <Container maxWidth="lg">
        <AnimatedDiv id="testimonials-header">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom color="text.primary">
              What Our Learners Say
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
              Stories from students and professionals who upgraded their learning journey with us
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setReviewDialogOpen(true)}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
                }
              }}
            >
              Add Your Review
            </Button>
          </Box>
        </AnimatedDiv>

        <Grid container spacing={4}>
          {allTestimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <AnimatedDiv id={`testimonial-${index + 1}`} delay={index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="600">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </AnimatedDiv>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box> */}

    {/* CTA Section */}
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: 8
      }}
    >
      {/* <Container maxWidth="lg">
        <AnimatedDiv id="cta-content">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Ready to Transform Your Learning?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Join thousands of learners worldwide who are achieving success with Smart Learning LMS
            </Typography>
          </Box>
        </AnimatedDiv>
      </Container> */}
    </Box>

    {/* Review Form */}
    {/* <ReviewForm
      open={reviewDialogOpen}
      onClose={() => setReviewDialogOpen(false)}
      onSubmit={handleReviewSubmit}
    /> */}

    {/* Snackbar */}
    {/* <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
        Thank you for your review! It has been added successfully.
      </Alert>
    </Snackbar> */}
  </Box>
);

};

export default AboutUs;