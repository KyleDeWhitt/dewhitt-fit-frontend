import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Model as Logo } from './CloverLogo'; // Using the Clover for Dashboard
import CheckoutButton from './CheckoutButton'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const GOLD_COLOR = '#FFD700';
const BG_COLOR = '#0b1121';

const PHASES = [
    { name: 'Discovery', description: 'Consultation & Requirements' },
    { name: 'Strategy', description: 'Wireframes & Architecture' },
    { name: 'Development', description: 'High-fidelity Coding' },
    { name: 'Launch', description: 'QA Testing & Deployment' }
];

function Dashboard() {
    const { user, logout } = useAuth();
    const [project, setProject] = useState(null);
    
    // --- 1. RESPONSIVE STATE ---
    // Detects if the screen is narrower than 1024px (Tablets & Phones)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // ---------------------------

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${API_URL}/api/my-project`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProject(response.data);
            } catch (err) {
                console.error("Error loading project:", err);
            } 
        };

        if (user) fetchProjectData();
    }, [user]);

    const status = project?.status || "Discovery"; 
    const progress = project?.progress || 10; 
    const isPremium = user?.planTier === 'premium'; 
    const activePhaseIndex = PHASES.findIndex(p => p.name === status);
    const safeActiveIndex = activePhaseIndex === -1 ? 0 : activePhaseIndex;

    return (
        <div style={{ minHeight: '100vh', background: BG_COLOR, color: 'white', fontFamily: "'Inter', sans-serif" }}>
            
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '20px' : '40px' }}>
                
                {/* HEADER */}
                <header style={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', // Stack header on mobile
                    justifyContent: 'space-between', 
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    gap: isMobile ? '20px' : '0',
                    marginBottom: '40px' 
                }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: '800', letterSpacing: '-1px' }}>
                            <span style={{ color: GOLD_COLOR }}>{project?.name || 'Alpha'}</span>
                        </h1>
                        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                            {project?.clientName || user?.email} • {isPremium ? 'Premium Plan' : 'Preview Mode'}
                        </p>
                    </div>
                    <button onClick={logout} style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        border: '1px solid #334155', 
                        color: '#94a3b8', 
                        padding: '10px 24px', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: isMobile ? '100%' : 'auto' // Full width button on mobile
                    }}>
                        Log Out
                    </button>
                </header>

                {/* MAIN GRID LAYOUT */}
                <div style={{ 
                    display: 'grid', 
                    // CHANGE 2: If Mobile, use 1 column. If Desktop, use 12 columns.
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
                    gap: '30px' 
                }}>

                    {/* 1. VISUALIZER */}
                    <div style={{ 
                        // CHANGE 3: If Mobile, span full width. If Desktop, span 8.
                        gridColumn: isMobile ? 'span 1' : 'span 8', 
                        
                        // Make height smaller on mobile so it doesn't take up the whole screen
                        height: isMobile ? '400px' : '600px', 
                        
                        position: 'relative', 
                        overflow: 'hidden', 
                        borderRadius: '24px',
                        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                         <div style={{
                            position: 'absolute', top: 30, left: 30, zIndex: 10,
                            display: 'flex', gap: '10px'
                        }}>
                             <div style={{
                                background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: '30px',
                                border: `1px solid ${GOLD_COLOR}`, color: GOLD_COLOR, 
                                fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(4px)'
                            }}>
                                ● LIVE PREVIEW
                            </div>
                        </div>

                        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
                            <ambientLight intensity={1.5} />
                            <Environment preset="city" />
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={isPremium ? 2 : 0.5} />
                            <Logo /> 
                        </Canvas>
                    </div>

                    {/* 2. ROADMAP */}
                    <div style={{ 
                        // CHANGE 4: If Mobile, span full width