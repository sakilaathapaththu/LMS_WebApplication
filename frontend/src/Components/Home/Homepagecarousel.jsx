import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import side01 from "../../Assets/images/side01.jpg";
import side02 from "../../Assets/images/side02.jpg"
const items = [
    {
        name: "An Online Course Theme",
        description: "LMS",
        image: side01 // Replace with the path to your image
    },
    {
        name: "",
        description: "Welcome to Our LMS",
        image: side02
    },
    // Add more items as needed
];

function Item(props) {
    return (
        <Paper style={{ position: 'relative' }}>
            <img src={props.item.image} alt={props.item.name} style={{ width: '100%', height: '512px', objectFit: 'cover' }} />
            <Typography variant="h2" style={{ position: 'absolute', top: '20%', left: '10%', color: 'white' }}>
                {props.item.description}
            </Typography>
            <Typography variant="h4" style={{ position: 'absolute', top: '30%', left: '10%', color: 'white' }}>
                {props.item.name}
            </Typography>
        </Paper>
    );
}

export default function Homepagecarousel() {
    return (
        <Carousel
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
            navButtonsAlwaysVisible={true}
            indicators={false}
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    );
}
