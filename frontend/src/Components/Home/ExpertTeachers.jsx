import React from 'react';
import {
  Container, Grid, Card, CardContent, Typography,
  IconButton, CardActions, Box
} from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import profile01 from "../../Assets/images/profile.jpg";
import sakila from "../../Assets/images/sakila.jpeg";

// Each teacher now has social media links
const teachers = [
  {
    name: 'Sakila Athapaththu',
    title: 'Co-Director',
    image: sakila,
    facebook: 'https://facebook.com/sakilaathapaththu',
    instagram: 'https://instagram.com/sakilaathapaththu',
    linkedin: 'https://linkedin.com/in/sakila-athapaththu-412647215',
  },
  {
    name: 'Thamidu Sulakshana',
    title: 'Director',
    image: profile01,
    facebook: 'https://facebook.com/thamidu.sulakshana',
    instagram: 'https://instagram.com/thamidu.sulakshana',
    linkedin: 'https://linkedin.com/in/thamidu-sulakshana',
  },
  {
    name: 'Praveen Liyanage',
    title: 'Director',
    image: profile01,
    facebook: 'https://facebook.com/praveen.liyanage',
    instagram: 'https://instagram.com/praveen.liyanage',
    linkedin: 'https://linkedin.com/in/praveen-liyanage',
  },
  {
    name: 'Thilina Sadamal',
    title: 'Director',
    image: profile01,
    facebook: 'https://facebook.com/thilina.sadamal',
    instagram: 'https://instagram.com/thilina.sadamal',
    linkedin: 'https://linkedin.com/in/thilina-sadamal',
  },
];

const TeacherCard = ({ name, title, image, facebook, instagram, linkedin }) => (
  <Card
    sx={{
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.04)',
      },
      transition: 'background-color 0.3s ease-in-out',
      borderRadius: 3
    }}
  >
    <Box
      component="img"
      alt={name}
      src={image}
      sx={{ width: '100%', height:'100%', objectFit: 'cover' }}
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
      <IconButton aria-label="facebook" component="a" href={facebook} target="_blank" rel="noreferrer">
        <Facebook />
      </IconButton>
      <IconButton aria-label="linkedin" component="a" href={linkedin} target="_blank" rel="noreferrer">
        <LinkedInIcon />
      </IconButton>
      <IconButton aria-label="instagram" component="a" href={instagram} target="_blank" rel="noreferrer">
        <Instagram />
      </IconButton>
    </CardActions>
  </Card>
);

const ExpertTeachers = () => (
  <Container sx={{ my: 8 }}>
    <Typography variant="h4" component="h2" align="center" gutterBottom>
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
