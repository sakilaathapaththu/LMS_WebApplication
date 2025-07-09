import React, { useEffect, useState } from 'react';

// Simple SVG icons with blue theme
const VerifiedUserIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#2563eb">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
  </svg>
);

const OndemandVideoIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#1d4ed8">
    <path d="M21,3H3C1.89,3 1,3.89 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5C23,3.89 22.1,3 21,3M21,19H3V5H21V19M10,12L15,9V15L10,12Z"/>
  </svg>
);

const AdminPanelSettingsIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#3b82f6">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.33,7 14.67,7.33 15.5,8.17C16.33,9 16.67,10.33 16.67,11.67C16.67,13 16.33,14.33 15.5,15.17C14.67,16 13.33,16.33 12,16.33C10.67,16.33 9.33,16 8.5,15.17C7.67,14.33 7.33,13 7.33,11.67C7.33,10.33 7.67,9 8.5,8.17C9.33,7.33 10.67,7 12,7Z"/>
  </svg>
);

const SchoolIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#1e40af">
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

const AssignmentTurnedInIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#60a5fa">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const ForumIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#2563eb">
    <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"/>
  </svg>
);

const AssignmentIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#1d4ed8">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const EmojiEventsIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="#3b82f6">
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
    title: 'HD Embedded Video Lectures',
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
    title: 'Track Learning Progress',
    description: 'Students can view enrolled courses and completion status and manage structured learning paths.',
    color: '#1e40af'
  },
  {
    icon: <AssignmentTurnedInIcon />,
    title: 'Learning Plan System',
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
    title: 'Downloadable Attachments',
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
        <div className="shape shape-4"></div>
      </div>
      
      <div className="content-wrapper">
        <div className={`header-section ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="main-title">Powerful Features for Smarter Learning</h2>
          <p className="subtitle">
            Our LMS empowers both students and admins with the right tools for progress, engagement, and success.
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
                  <div className="icon-glow" style={{ backgroundColor: feature.color }}></div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="card-glow" style={{ backgroundColor: feature.color }}></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #ffffff 100%);
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
          animation: gradientShift 12s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { 
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #ffffff 100%);
          }
          50% { 
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #ffffff 75%, #f8fafc 100%);
          }
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(29, 78, 216, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.04) 0%, transparent 50%);
          z-index: 1;
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          animation: float 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, #2563eb, #3b82f6);
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #1d4ed8, #60a5fa);
          top: 65%;
          right: 12%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #1e40af, #93c5fd);
          bottom: 25%;
          left: 15%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #3b82f6, #dbeafe);
          top: 8%;
          right: 25%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .header-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #1e40af;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 30%, #3b82f6 60%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGlow 4s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% { 
            text-shadow: 0 4px 20px rgba(59, 130, 246, 0.15), 0 0 30px rgba(59, 130, 246, 0.08);
          }
          100% { 
            text-shadow: 0 4px 20px rgba(59, 130, 246, 0.25), 0 0 40px rgba(59, 130, 246, 0.15);
          }
        }

        .subtitle {
          font-size: 1.2rem;
          color: #475569;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(59, 130, 246, 0.05);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .features-grid .feature-card:nth-child(n+5) {
          grid-column: span 1;
        }

        .features-grid .feature-card:nth-child(5) {
          grid-column: 1;
        }

        .features-grid .feature-card:nth-child(6) {
          grid-column: 2;
        }

        .features-grid .feature-card:nth-child(7) {
          grid-column: 3;
        }

        .features-grid .feature-card:nth-child(8) {
          grid-column: 4;
        }

        .feature-card {
          position: relative;
          padding: 2.5rem 1.5rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 2px solid rgba(59, 130, 246, 0.08);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.06);
        }

        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card.hovered {
          transform: translateY(-12px) scale(1.02);
          background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
          border-color: rgba(59, 130, 246, 0.15);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1), 0 0 30px rgba(59, 130, 246, 0.08);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.03) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .feature-card.hovered::before {
          transform: translateX(100%);
        }

        .feature-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .icon-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
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
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.2));
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          filter: blur(15px);
          transition: all 0.4s ease;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.1; }
        }

        .feature-card.hovered .icon-glow {
          opacity: 0.15;
          transform: scale(1.4);
          animation: none;
        }

        .feature-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .feature-card.hovered .feature-title {
          transform: scale(1.03);
          color: #1d4ed8;
        }

        .feature-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #64748b;
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .feature-card.hovered .feature-description {
          opacity: 1;
          color: #475569;
        }

        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 197, 253, 0.05));
          filter: blur(30px);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .feature-card.hovered .card-glow {
          opacity: 0.1;
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .features-container {
            padding: 2rem 1rem;
          }
          
          .main-title {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .feature-card {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;