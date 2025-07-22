import React from 'react'
import HomePageNavbar from '../Components/Navbar/Homepagenavbar.jsx';
import Homepagecarousel from '../Components/Home/Homepagecarousel.jsx';
import FeaturesSection from '../Components/Home/FeaturesSection.jsx';
import ExpertTeachers from '../Components/Home/ExpertTeachers.jsx';
import MissionandVision from '../Components/Home/MissionandVision.jsx';
import HowItWorks from '../Components/Home/HowItWorks.jsx';
import FAQSection from '../Components/Home/FAQ.jsx';


export default function homepage() {
  return (
    <div>
     <HomePageNavbar/>
     <Homepagecarousel/>
     <FeaturesSection/>
     <MissionandVision/>
     <HowItWorks/>
     <FAQSection/>
     {/* <ExpertTeachers/> */}
    </div>
  )
}
