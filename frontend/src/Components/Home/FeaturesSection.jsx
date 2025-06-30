
import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ForumIcon from '@mui/icons-material/Forum';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const features = [
  {
    icon: <VerifiedUserIcon style={{ fontSize: 60, color: '#43a047' }} />,
    title: 'Secure Enrollment',
    description: 'Submit a key and get admin approval before accessing courses — ensuring safe, exclusive access.',
  },
  {
    icon: <OndemandVideoIcon style={{ fontSize: 60, color: '#1e88e5' }} />,
    title: 'HD Embedded Video Lectures',
    description: 'Stream lecture content with no distractions — download-blocked for focused viewing only.',
  },
  {
    icon: <AdminPanelSettingsIcon style={{ fontSize: 60, color: '#fb8c00' }} />,
    title: 'Admin Control Panel',
    description: 'Admins manage users, course content, enrollment approvals, and view analytics with full access.',
  },
  {
    icon: <SchoolIcon style={{ fontSize: 60, color: '#6a1b9a' }} />,
    title: 'Track Learning Progress',
    description: 'Students can view enrolled courses and completion status and manage structured learning paths.',
  },
  {
    icon: <AssignmentTurnedInIcon style={{ fontSize: 60, color: '#00acc1' }} />,
    title: 'Learning Plan System',
    description: 'Create and share personalized study plans with timelines, resources, and progress tracking.',
  },
  {
    icon: <ForumIcon style={{ fontSize: 60, color: '#3949ab' }} />,
    title: 'Social Interactions',
    description: 'Like, comment, follow, and engage with other learners through interactive post and status features.',
  },
  {
    icon: <AssignmentIcon style={{ fontSize: 60, color: '#ef6c00' }} />,
    title: 'Downloadable Attachments',
    description: 'Access instructor-provided notes, assignments, and course materials directly within the course.',
  },
  {
    icon: <EmojiEventsIcon style={{ fontSize: 60, color: '#d32f2f' }} />,
    title: 'Completion Recognition',
    description: 'Celebrate achievements with visible course progress and earned certifications (future-ready).',
  }
];

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 8, mb: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Powerful Features for Smarter Learning
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 5 }}>
          Our LMS empowers both students and admins with the right tools for progress, engagement, and success.
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} align="center" data-aos="fade-up">
              <Box>{feature.icon}</Box>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
