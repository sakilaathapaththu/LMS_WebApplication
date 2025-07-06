import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, LinkedIn, ArrowForward, Group } from '@mui/icons-material';

// Team data
const teamMembers = [
  {
    name: 'Sakila Athapaththu',
    title: 'Co-Director',
    subtitle: 'Leadership & Strategy',
    image: '/api/placeholder/300/400',
    description: 'Experienced educational leader with expertise in curriculum development and strategic planning.',
    social: {
      facebook: 'https://facebook.com/sakilaathapaththu',
      instagram: 'https://instagram.com/sakilaathapaththu',
      linkedin: 'https://linkedin.com/in/sakila-athapaththu-412647215',
    }
  },
  {
    name: 'Thamidu Sulakshana',
    title: 'Director',
    subtitle: 'Academic Operations',
    image: '/api/placeholder/300/400',
    description: 'Dedicated to maintaining high academic standards and operational efficiency.',
    social: {
      facebook: 'https://facebook.com/thamidu.sulakshana',
      instagram: 'https://instagram.com/thamidu.sulakshana',
      linkedin: 'https://linkedin.com/in/thamidu-sulakshana',
    }
  },
  {
    name: 'Praveen Liyanage',
    title: 'Director',
    subtitle: 'Executive Leadership',
    image: '/api/placeholder/300/400',
    description: 'Visionary leader focused on educational excellence and organizational development.',
    social: {
      facebook: 'https://facebook.com/praveen.liyanage',
      instagram: 'https://instagram.com/praveen.liyanage',
      linkedin: 'https://linkedin.com/in/praveen-liyanage',
    }
  },
  {
    name: 'Thilina Sadamal',
    title: 'Director',
    subtitle: 'Innovation & Development',
    image: '/api/placeholder/300/400',
    description: 'Passionate about educational innovation and sustainable growth initiatives.',
    social: {
      facebook: 'https://facebook.com/thilina.sadamal',
      instagram: 'https://instagram.com/thilina.sadamal',
      linkedin: 'https://linkedin.com/in/thilina-sadamal',
    }
  },
];

const TeamCard = ({ member, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-blue-50">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 h-64 sm:h-72">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating Icon */}
          <div className={`absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}>
            <Group className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Name and Title */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
              {member.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                {member.title}
              </span>
            </div>
            <p className="text-blue-600 font-medium text-sm">{member.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {member.description}
          </p>

          {/* Social Links */}
          <div className="flex gap-3 pt-2">
            <a 
              href={member.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/social"
            >
              <Facebook className="w-5 h-5 text-blue-600 group-hover/social:text-blue-700" />
            </a>
            <a 
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/social"
            >
              <LinkedIn className="w-5 h-5 text-blue-600 group-hover/social:text-blue-700" />
            </a>
            <a 
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group/social"
            >
              <Instagram className="w-5 h-5 text-blue-600 group-hover/social:text-blue-700" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MinimalTeam = () => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-blue-100/40 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Meet Our Expert Team
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Our dedicated leadership team brings together years of experience in education, 
            innovation, and strategic development to drive excellence in everything we do.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-50 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Group className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Ready to Work With Our Expert Team?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with us to learn more about our educational programs 
                and how we can help you achieve your goals.
              </p>
            </div>
            
            <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto">
              Contact Us
              <ArrowForward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalTeam;