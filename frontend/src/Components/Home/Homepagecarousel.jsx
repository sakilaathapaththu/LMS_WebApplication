
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Box, Container, Fade, Slide, Zoom } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import side01 from "../../Assets/images/side01.jpg";
import side02 from "../../Assets/images/side02.jpg"

// Only background images array
const backgroundImages = [side01, side02];

// Constant content that doesn't change
const content = {
    name: "Transform Your Learning Journey",
    description: "Premium Online Learning Platform",
    subtitle: "Discover thousands of courses from expert instructors and advance your skills",
    ctaText: "Start Learning Today"
};

function BackgroundSlide({ image, isLoaded }) {
    return (
        <Fade in={isLoaded} timeout={1000}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
                    transition: 'transform 1.5s ease-out',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                    }
                }}
            />
        </Fade>
    );
}

export default function HomepageCarousel() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate(); // Add this hook

    useEffect(() => {
        // Simulate loading and trigger animations
        const timer1 = setTimeout(() => {
            setIsLoaded(true);
        }, 300);

        const timer2 = setTimeout(() => {
            setShowContent(true);
        }, 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // Add click handler function
    const handleCTAClick = () => {
        navigate('/courses'); // Replace '/courses' with your actual courses page route
    };

    return (
        <Paper 
            elevation={0}
            sx={{ 
                position: 'relative',
                borderRadius: 0,
                overflow: 'hidden',
                height: { xs: '400px', sm: '500px', md: '600px' }
            }}
        >
            {/* Background Images Carousel - Only backgrounds slide */}
            <Carousel
                NextIcon={<ArrowForwardIosIcon />}
                PrevIcon={<ArrowBackIosIcon />}
                navButtonsAlwaysVisible={true}
                indicators={true}
                indicatorIconButtonProps={{
                    style: {
                        color: 'rgba(255,255,255,0.5)',
                        margin: '0 8px'
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#1976d2'
                    }
                }}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '50%',
                        margin: '0 20px',
                        padding: '12px',
                        backdropFilter: 'blur(10px)'
                    }
                }}
                navButtonsWrapperProps={{
                    style: {
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }
                }}
                animation="slide"
                duration={500}
                interval={5000}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                {
                    backgroundImages.map((image, i) => <BackgroundSlide key={i} image={image} isLoaded={isLoaded} />)
                }
            </Carousel>
            
            {/* Static Content Container - Never moves but animates on load */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        maxWidth: { xs: '100%', md: '60%' },
                        pl: { xs: 2, md: 4 },
                        pr: { xs: 2, md: 0 }
                    }}
                >
                    {/* Main Heading - Slides in from left */}
                    <Slide direction="right" in={showContent} timeout={800}>
                        <Typography 
                            variant="h2" 
                            sx={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                                lineHeight: 1.2,
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                opacity: showContent ? 1 : 0,
                                transition: 'all 0.8s ease-out'
                            }}
                        >
                            {content.description}
                        </Typography>
                    </Slide>

                    {/* Subtitle - Slides in from left with delay */}
                    <Slide direction="right" in={showContent} timeout={1000}>
                        <Typography 
                            variant="h4" 
                            sx={{
                                color: 'white',
                                fontWeight: 500,
                                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                                lineHeight: 1.3,
                                mb: 1,
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                                transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                                opacity: showContent ? 1 : 0,
                                transition: 'all 1s ease-out 0.2s'
                            }}
                        >
                            {content.name}
                        </Typography>
                    </Slide>

                    {/* Description - Fades in with delay */}
                    <Fade in={showContent} timeout={1200}>
                        <Typography 
                            variant="body1" 
                            sx={{
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                                lineHeight: 1.6,
                                mb: 4,
                                maxWidth: '500px',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                fontWeight: 400,
                                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                                opacity: showContent ? 1 : 0,
                                transition: 'all 1.2s ease-out 0.4s'
                            }}
                        >
                            {content.subtitle}
                        </Typography>
                    </Fade>

                    {/* CTA Button - Zooms in with bounce effect */}
                    <Zoom in={showContent} timeout={1000}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleCTAClick} // Add click handler
                                sx={{
                                    bgcolor: '#1976d2',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: '50px',
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                                    transform: showContent ? 'scale(1)' : 'scale(0.8)',
                                    transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s',
                                    '&:hover': {
                                        bgcolor: '#1565c0',
                                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.6)',
                                        transform: 'translateY(-2px) scale(1.05)'
                                    }
                                }}
                            >
                                {content.ctaText}
                            </Button>
                        </Box>
                    </Zoom>
                </Box>
            </Container>
        </Paper>
    );
}