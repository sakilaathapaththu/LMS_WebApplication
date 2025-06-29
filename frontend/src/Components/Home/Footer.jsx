import React from 'react';
import { Container, Grid, Box, Typography, Button, Link, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Facebook, Twitter, YouTube, Instagram, LocationOn, Phone, Fax, Email } from '@mui/icons-material';


const Footer = () => (
  <Box sx={{ bgcolor: '#f5f5dc', py: 6, mt:10 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>About Us</Typography>
          <Typography variant="body2" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et lobortis diam.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Duis tellus enim, vestibulum eget varius id, vulputate et mi. Nullam feugiat, diam quis interdum varius.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Start Learning Now</Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Popular Courses</Typography>
          <Link href="#" variant="body2" display="block" gutterBottom>Power Electronics</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Introduction to Calculus</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Basic Laws and Policies</Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Quick Links</Typography>
          <Link href="#" variant="body2" display="block" gutterBottom>All Courses</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Summer Sessions</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Professional Courses</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Privacy Policy</Link>
          <Link href="#" variant="body2" display="block" gutterBottom>Terms of Use</Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Contact Us</Typography>
          <List>
            <ListItem>
              <ListItemIcon><LocationOn /></ListItemIcon>
              <ListItemText primary="The Design Themes Inc." secondary="Mary Jane St, Sydney 2233, Australia." />
            </ListItem>
            <ListItem>
              <ListItemIcon><Phone /></ListItemIcon>
              <ListItemText primary="+11 (2) 7654 2233" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Fax /></ListItemIcon>
              <ListItemText primary="+11 (5) 7654 2244" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Email /></ListItemIcon>
              <ListItemText primary="lms@gmail.com" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <IconButton href="#" color="inherit"><Facebook /></IconButton>
        <IconButton href="#" color="inherit"><Twitter /></IconButton>
        <IconButton href="#" color="inherit"><YouTube /></IconButton>
        <IconButton href="#" color="inherit"><Instagram /></IconButton>
       
      </Box>
      
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
      <hr></hr>
        Copyright © 2020 LMS Theme All Rights Reserved | BlackCode
        <hr></hr>
      </Typography>
      
    </Container>
  </Box>
);

export default Footer;
