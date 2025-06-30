import React from 'react'
import HomePageNavbar from '../Components/Navbar/Homepagenavbar.jsx';
import Homepagecarousel from '../Components/Home/Homepagecarousel.jsx';
import FeaturesSection from '../Components/Home/FeaturesSection.jsx';
import ExpertTeachers from '../Components/Home/ExpertTeachers.jsx';


export default function homepage() {
  return (
    <div>
     <HomePageNavbar/>
     <Homepagecarousel/>
     <FeaturesSection/>
     <ExpertTeachers/>
    </div>
  )
}
