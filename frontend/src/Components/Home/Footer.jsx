import React from 'react';
import {
  Container, Grid, Box, Button,
  IconButton, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
  Facebook, Twitter, YouTube, Instagram,
  LocationOn, Phone, Fax, Email
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';


const Footer = () => (
  <Box sx={{ bgcolor: '#f5f5dc', py: 6, mt: 10 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* About Us */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>About Us</Typography>
          <Typography variant="body2" gutterBottom>
            <strong>SmartLearn LMS</strong> is your trusted learning companion—connecting students, instructors, and professionals across the world.
          </Typography>
          <Typography variant="body2">
            Our platform offers interactive courses, expert guidance, and a supportive community to fuel your educational journey.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Start Learning Now
          </Button>
        </Grid>

        {/* Popular Courses */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Popular Courses</Typography>
          <Link href="#" variant="body2" display="block">Full Stack Development</Link>
          <Link href="#" variant="body2" display="block">Machine Learning Basics</Link>
          <Link href="#" variant="body2" display="block">Introduction to Cybersecurity</Link>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Quick Links</Typography>

          <Link component={RouterLink} to="/courses" variant="body2" display="block">
            All Courses
          </Link>

          <Link component={RouterLink} to="/terms" variant="body2" display="block">
            Terms of Use
          </Link>

          <Link component={RouterLink} to="/privacy" variant="body2" display="block">
            Privacy Policy
          </Link>
        </Grid>


        {/* Contact Us */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Contact Us</Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><LocationOn /></ListItemIcon>
              <ListItemText primary="SmartLearn HQ" secondary="123 Knowledge Lane, Sydney 2233, Australia" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Phone /></ListItemIcon>
              <ListItemText primary="+94 71 478 2241" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Fax /></ListItemIcon>
              <ListItemText primary="+94 71 478 2241" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Email /></ListItemIcon>
              <ListItemText primary="support@smartlearn.com" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Social Media */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <IconButton href="#"><Facebook /></IconButton>
        <IconButton href="#"><Twitter /></IconButton>
        <IconButton href="#"><YouTube /></IconButton>
        <IconButton href="#"><Instagram /></IconButton>
      </Box>

      {/* Footer Bottom */}
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        <hr />
        © {new Date().getFullYear()} SmartLearn LMS — All Rights Reserved | Developed by BlackCode
        <hr />
      </Typography>
    </Container>
  </Box>
);

export default Footer;
