import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';


const features = [
    {
        icon: <AlarmIcon style={{ fontSize: 60, color: 'green' }} />,
        title: 'Advanced Topics',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas quis',
    },
    {
        icon: <PersonIcon style={{ fontSize: 60, color: 'blue' }} />,
        title: 'Expert Teachers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas quis',
    },
    {
        icon: <MovieIcon style={{ fontSize: 60, color: 'orange' }} />,
        title: 'Video Courses',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit maecenas quis',
    },
    
];

const FeaturesSection = () => {
    return (
        <Container>
            <Box 
            sx={{mt:5,mb:10}}>
                <Typography variant="h4" align="center" gutterBottom sx={{mt:5,mb:5}}>
                    Some Great Features of LMS Theme
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{mb:5}}>
                    Quisque porta, elit sed lacinia rutrum, nulla velit scelerisque sem, convallis molestie ante justo eget erat
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} align="center">
                            <Box>
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
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
