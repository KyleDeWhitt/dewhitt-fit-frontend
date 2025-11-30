import React from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene'; // We reuse your 3D engine immediately

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* 1. NAVIGATION */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #333' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
          DeWhitt<span style={{ color: '#009A44' }}>Designs</span>
        </div>
        <div>
          <Link to="/login" style={{ marginRight: '20px', color: '#ccc', textDecoration: 'none' }}>Client Login</Link>
          <Link to="/register">
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', background: 'white', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>
              Start Project
            </button>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '80vh', padding: '0 40px', alignItems: 'center' }}>
        
        {/* Left: The Pitch */}
        <div style={{ paddingRight: '50px' }}>
          <h1 style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '20px', letterSpacing: '-2px' }}>
            Stop Building <br />
            <span style={{ color: '#333' }}>Boring Websites.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px', maxWidth: '500px' }}>
            We build immersive, 3D-enabled platforms on a secure, production-ready SaaS engine. Don't just tell your story—let your customers interact with it.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ padding: '15px 30px', fontSize: '1.1rem', borderRadius: '5px', border: 'none', background: '#009A44', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
              View Our Work
            </button>
            <button style={{ padding: '15px 30px', fontSize: '1.1rem', borderRadius: '5px', border: '1px solid #333', background: 'transparent', color: 'white', cursor: 'pointer' }}>
              Our Stack
            </button>
          </div>
        </div>

        {/* Right: The 3D Hook */}
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            {/* We overlay a gradient so the 3D scene fades into the background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, transparent 20%, black 90%)', zIndex: 10, pointerEvents: 'none' }}></div>
            <ThreeScene />
        </div>
      </header>

      {/* 3. SOCIAL PROOF (The "Trusted By" Bar) */}
      <div style={{ borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '40px 0', textAlign: 'center', color: '#444', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
        Built on a Production-Ready Stack
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px', color: '#666', fontWeight: 'bold' }}>
            <span>Stripe</span>
            <span>React Three Fiber</span>
            <span>Node.js</span>
            <span>PostgreSQL</span>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
