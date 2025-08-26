import React, { useEffect, useState } from 'react';

// Simple SVG icons with blue theme
const VerifiedUserIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#2563eb">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
  </svg>
);

const OndemandVideoIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#1d4ed8">
    <path d="M21,3H3C1.89,3 1,3.89 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3M21,19H3V5H21V19M10,12L15,9V15L10,12Z"/>
  </svg>
);

const AdminPanelSettingsIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#3b82f6">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.33,7 14.67,7.33 15.5,8.17C16.33,9 16.67,10.33 16.67,11.67C16.67,13 16.33,14.33 15.5,15.17C14.67,16 13.33,16.33 12,16.33C10.67,16.33 9.33,16 8.5,15.17C7.67,14.33 7.33,13 7.33,11.67C7.33,10.33 7.67,9 8.5,8.17C9.33,7.33 10.67,7 12,7Z"/>
  </svg>
);

const SchoolIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#1e40af">
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

const AssignmentTurnedInIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#60a5fa">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const ForumIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#2563eb">
    <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"/>
  </svg>
);

const AssignmentIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#1d4ed8">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const EmojiEventsIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#3b82f6">
    <path d="M5,16L3,5H5.5L6.5,10H9.5L10.5,5H13L11,16H5M15,16V8H17V16H15M18,8V16H20V8H18M16,4V6H20V4H16Z"/>
  </svg>
);

const features = [
  {
    icon: <VerifiedUserIcon />,
    title: 'Secure Enrollment',
    description: 'Submit a key and get admin approval before accessing courses — ensuring safe, exclusive access.',
    color: '#2563eb'
  },
  {
    icon: <OndemandVideoIcon />,
    title: 'HD Video Lectures',
    description: 'Stream lecture content with no distractions — download-blocked for focused viewing only.',
    color: '#1d4ed8'
  },
  {
    icon: <AdminPanelSettingsIcon />,
    title: 'Admin Control Panel',
    description: 'Admins manage users, course content, enrollment approvals, and view analytics with full access.',
    color: '#3b82f6'
  },
  {
    icon: <SchoolIcon />,
    title: 'Learning Progress',
    description: 'Students can view enrolled courses and completion status and manage structured learning paths.',
    color: '#1e40af'
  },
  {
    icon: <AssignmentTurnedInIcon />,
    title: 'Learning Plans',
    description: 'Create and share personalized study plans with timelines, resources, and progress tracking.',
    color: '#60a5fa'
  },
  {
    icon: <ForumIcon />,
    title: 'Social Interactions',
    description: 'Like, comment, follow, and engage with other learners through interactive post and status features.',
    color: '#2563eb'
  },
  {
    icon: <AssignmentIcon />,
    title: 'Downloadable Content',
    description: 'Access instructor-provided notes, assignments, and course materials directly within the course.',
    color: '#1d4ed8'
  },
  {
    icon: <EmojiEventsIcon />,
    title: 'Completion Recognition',
    description: 'Celebrate achievements with visible course progress and earned certifications (future-ready).',
    color: '#3b82f6'
  }
];

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="features-container">
      <div className="background-overlay"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="content-wrapper">
        <div className={`header-section ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="main-title">Powerful Features for Smarter Learning</h2>
          <p className="subtitle">
            CourseMinistry empowers both students and admins with the right tools for progress, engagement, and success.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${isVisible ? 'animate-in' : ''} ${hoveredIndex === index ? 'hovered' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="feature-content">
                <div className="icon-container">
                  <div className="icon-bg" style={{ backgroundColor: `${feature.color}08` }}></div>
                  <div className="icon-wrapper">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-container {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.03) 0%, transparent 50%);
          z-index: 1;
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.04;
          animation: float 10s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #2563eb, #3b82f6);
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #1d4ed8, #60a5fa);
          top: 60%;
          right: 15%;
          animation-delay: 3s;
        }

        .shape-3 {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #1e40af, #93c5fd);
          bottom: 40%;
          left: 20%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .header-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .main-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1e40af;
          margin-bottom: 0.8rem;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .feature-card {
          position: relative;
          padding: 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(59, 130, 246, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card.hovered {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(59, 130, 246, 0.2);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.1);
        }

        .feature-content {
          text-align: center;
        }

        .icon-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          margin-bottom: 1.5rem;
        }

        .icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .icon-wrapper {
          position: relative;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .feature-card.hovered .icon-wrapper {
          transform: scale(1.1);
        }

        .feature-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.8rem;
        }

        .feature-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #64748b;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .features-container {
            padding: 2rem 1rem;
          }
          
          .main-title {
            font-size: 1.8rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .feature-card {
            padding: 1.5rem 1rem;
          }

          .icon-container {
            width: 60px;
            height: 60px;
          }

          .feature-title {
            font-size: 1.1rem;
          }

          .feature-description {
            font-size: 0.85rem;
          }

          .header-section {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .features-container {
            padding: 1.5rem 0.75rem;
          }
          
          .main-title {
            font-size: 1.6rem;
          }
          
          .subtitle {
            font-size: 0.9rem;
          }
          
          .feature-card {
            padding: 1.25rem 0.75rem;
          }

          .header-section {
            margin-bottom: 1.25rem;
          }
        }

        /* Tablet Responsive */
        @media (min-width: 769px) and (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-container {
            padding: 2.5rem 1.5rem;
          }
        }

        /* Large screens */
        @media (min-width: 1025px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;