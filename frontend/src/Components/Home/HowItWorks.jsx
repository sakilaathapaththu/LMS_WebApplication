import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Register',
      description: 'Create your free SmartLearn account in just a few clicks and join thousands of learners.',
      color: '#1976d2'
    },
    {
      id: 2,
      title: 'Choose a Course',
      description: 'Browse our extensive catalog and select courses that match your learning goals.',
      color: '#1976d2'
    },
    {
      id: 3,
      title: 'Start Learning',
      description: 'Access high-quality content, interactive lessons, and hands-on projects.',
      color: '#1976d2'
    },
    {
      id: 4,
      title: 'Track Progress',
      description: 'Monitor your achievements, earn certificates, and advance your career.',
      color: '#1976d2'
    }
  ];

  return (
    <section style={{
      width: '100%',
      padding: '80px 20px',
      backgroundColor: '#f8fafc',
      minHeight: '600px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1565c0',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            How CourseMinistry Works
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Start your learning journey in just four simple steps. 
            Join thousands of students already transforming their careers.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '40px 30px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #e3f2fd',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(25, 118, 210, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              {/* Step Number */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: step.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.5rem',
                margin: '0 auto 24px',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
              }}>
                {step.id}
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: '#1565c0',
                  marginBottom: '16px',
                  margin: '0 0 16px 0'
                }}>
                  {step.title}
                </h3>

                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  margin: '0'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e3f2fd'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1976d2'
            }}></div>
            <span style={{ color: '#1565c0', fontWeight: '600', fontSize: '0.95rem' }}>
              50k+ Students
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e3f2fd'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1976d2'
            }}></div>
            <span style={{ color: '#1565c0', fontWeight: '600', fontSize: '0.95rem' }}>
              4.9/5 Rating
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e3f2fd'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1976d2'
            }}></div>
            <span style={{ color: '#1565c0', fontWeight: '600', fontSize: '0.95rem' }}>
              Industry Leaders
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            <button
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1565c0';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1976d2';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(25, 118, 210, 0.3)';
              }}
            >
              Browse Course Catalog
            </button>
            
            <button
              style={{
                backgroundColor: 'white',
                color: '#1976d2',
                border: '2px solid #1976d2',
                padding: '12px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1976d2';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(25, 118, 210, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#1976d2';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              Start Free Trial
            </button>
          </div>
          
          <p style={{
            color: '#888',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;