import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Box, Container, Fade, Slide, Zoom } from '@mui/material';
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
        <Fade in={isLoaded} timeout={1500}>
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
                    transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
                    transition: 'transform 2s cubic-bezier(0.23, 1, 0.32, 1)',
                    // Hardware acceleration for smoother performance
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1,
                        transition: 'opacity 0.5s ease-in-out',
                    }
                }}
            />
        </Fade>
    );
}

export default function HomepageCarousel() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

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
                // Full viewport height
                height: '100vh',
                minHeight: '600px', // Minimum height for smaller screens
                width: '100%',
                // Ensure it's at the top of the page
                top: 0,
                left: 0
            }}
        >
            {/* Background Images Carousel - Changed to fade transition */}
            <Carousel
                navButtonsAlwaysVisible={false}
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
                animation="fade"  // Changed from "slide" to "fade"
                duration={1200}   // Increased duration for much smoother fade
                interval={6000}   // Increased interval to let fade complete
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    // Enhanced styles for ultra-smooth fade effect
                    '& .carousel-item': {
                        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1) !important',
                        willChange: 'opacity',
                    },
                    '& .carousel-item.active': {
                        opacity: 1,
                    },
                    '& .carousel-item:not(.active)': {
                        opacity: 0,
                    },
                    // Smooth out any flickering
                    '& .MuiCarousel-root': {
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        perspective: '1000px',
                    }
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
                        alignItems: { xs: 'center', md: 'flex-start' }, // Center on mobile, left-align on desktop
                        height: '100%',
                        maxWidth: { xs: '100%', md: '60%' },
                        pl: { xs: 2, md: 4 },
                        pr: { xs: 2, md: 0 },
                        textAlign: { xs: 'center', md: 'left' } // Center text on mobile
                    }}
                >
                    {/* Main Heading - Slides in from left */}
                    <Slide direction="right" in={showContent} timeout={800}>
                        <Typography 
                            variant="h2" 
                            sx={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
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
                                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' },
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
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
                                lineHeight: 1.6,
                                mb: 4,
                                maxWidth: { xs: '90%', md: '500px' },
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
                                onClick={handleCTAClick}
                                sx={{
                                    bgcolor: '#1976d2',
                                    color: 'white',
                                    px: { xs: 3, md: 4 },
                                    py: { xs: 1.2, md: 1.5 },
                                    fontSize: { xs: '1rem', md: '1.1rem' },
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

                    {/* Optional: Scroll indicator */}
                    <Fade in={showContent} timeout={1500}>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 30,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: { xs: 'none', md: 'block' },
                                color: 'rgba(255,255,255,0.7)',
                                cursor: 'pointer',
                                animation: 'bounce 2s infinite',
                                '@keyframes bounce': {
                                    '0%, 20%, 50%, 80%, 100%': {
                                        transform: 'translateX(-50%) translateY(0)',
                                    },
                                    '40%': {
                                        transform: 'translateX(-50%) translateY(-10px)',
                                    },
                                    '60%': {
                                        transform: 'translateX(-50%) translateY(-5px)',
                                    },
                                }
                            }}
                            onClick={() => {
                                window.scrollTo({
                                    top: window.innerHeight,
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                                Scroll Down
                            </Typography>
                            <Box
                                sx={{
                                    width: '24px',
                                    height: '36px',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    margin: '0 auto',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '6px',
                                        left: '50%',
                                        width: '4px',
                                        height: '8px',
                                        backgroundColor: 'rgba(255,255,255,0.7)',
                                        borderRadius: '2px',
                                        transform: 'translateX(-50%)',
                                        animation: 'scrollDot 2s infinite',
                                    },
                                    '@keyframes scrollDot': {
                                        '0%': { opacity: 1, top: '6px' },
                                        '100%': { opacity: 0, top: '22px' },
                                    }
                                }}
                            />
                        </Box>
                    </Fade>
                </Box>
            </Container>
        </Paper>
    );
}