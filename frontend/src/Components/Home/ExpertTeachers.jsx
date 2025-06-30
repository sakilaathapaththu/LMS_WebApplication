import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, CardActions, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import profile01 from "../../Assets/images/profile.jpg"

const teachers = [
  {
    name: 'Damie Glendell',
    title: 'Co-Director',
    image: profile01, // replace with actual image link
  },
  {
    name: 'James Catwin',
    title: 'Art Director',
    image: profile01, // replace with actual image link
  },
  {
    name: 'Jenny Sheen',
    title: 'Digital Media Programming',
    image: profile01, // replace with actual image link
  },
  {
    name: 'Jim Morrison',
    title: 'Chief Programmer',
    image: profile01, // replace with actual image link
  },
];

const TeacherCard = ({ name, title, image }) => (
  <Card 
    sx={{ 
      '&:hover': {
        backgroundColor: 'lightgrey',
      },
      transition: 'background-color 0.3s ease-in-out',
    }}
  >
    <Box
      component="img"
      alt={name}
      src={image}
      sx={{ width: '100%', height: 'auto' }}
    />
    <CardContent>
      <Typography variant="h6" component="div">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton aria-label="facebook">
        <Facebook />
      </IconButton>
      <IconButton aria-label="twitter">
        <Twitter />
      </IconButton>
      <IconButton aria-label="instagram">
        <Instagram />
      </IconButton>
    </CardActions>
  </Card>
);

const ExpertTeachers = () => (
  <Container>
    <Typography variant="h4" component="h2" align="center" gutterBottom sx={{mt:5,mb:5}}>
      Our Expert Team
    </Typography>
    <Grid container spacing={4}>
      {teachers.map((teacher, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <TeacherCard {...teacher} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ExpertTeachers;
