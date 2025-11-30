import React from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene'; 

const Section = ({ children, align = 'left' }) => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start'),
    padding: '0 10%',
    pointerEvents: 'none' // Lets clicks pass through to 3D if needed, but text stays selectable
  }}>
    <div style={{ pointerEvents: 'auto' }}>{children}</div>
  </div>
);

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#000000', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. THE 3D WALLPAPER (Fixed Background) */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <ThreeScene />
      </div>

      {/* 2. THE SCROLLABLE CONTENT (Floats on top) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* NAV */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', position: 'fixed', width: '100%', zIndex: 10, mixBlendMode: 'difference' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DeWhitt<span style={{ color: '#009A44' }}>Designs</span></div>
          <Link to="/login">
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', background: 'white', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
              Start Project
            </button>
          </Link>
        </nav>

        {/* SECTION 1: HERO */}
        <Section>
          <h1 style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '20px' }}>
            Stop Building <br /> Boring Websites.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '500px' }}>
            Scroll down to see the DeWhitt difference.
          </p>
        </Section>

        {/* SECTION 2: THE "EXPLOSION" (Services) */}
        <Section align="right">
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>We Break The Mold.</h2>
            <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '400px', marginLeft: 'auto' }}>
              Standard templates restrict your creativity. We deconstruct the web and rebuild it in 3D.
            </p>
          </div>
        </Section>

        {/* SECTION 3: THE "REASSEMBLY" (Footer) */}
        <Section align="center">
          <div style={{ textAlign: 'center', marginTop: '20vh' }}>
            <h2 style={{ fontSize: '3rem', color: '#009A44' }}>Let's Build Something Solid.</h2>
            <button style={{ marginTop: '20px', padding: '15px 40px', fontSize: '1.2rem', borderRadius: '5px', background: '#009A44', color: 'white', border: 'none', cursor: 'pointer' }}>
              Get Started
            </button>
            <div style={{ marginTop: '50px', color: '#666' }}>
              © 2025 DeWhitt Designs. Built with React Three Fiber.
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default LandingPage;