import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
// 👇 1. Import your new button
import SubscribeButton from '../components/SubscribeButton';

// Define the Base URL needed for other routes
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard() {
    const { user, logout } = useAuth();
    
    // State to hold data from the backend
    const [goals, setGoals] = useState([]);
    const [recentLogs, setRecentLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const displayName = user?.name || 'Client'; 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken'); 

            if (!token) {
                 setLoading(false);
                 logout(); 
                 return;
            }

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const [goalsRes, logsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/goals`, config),
                    axios.get(`${BASE_URL}/api/logs`, config)
                ]);

                setGoals(goalsRes.data.goals || []);
                setRecentLogs(logsRes.data.logs || []);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (error.response?.status === 401) {
                     logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [logout]);

    const totalWorkouts = recentLogs.length;

    // --- RENDER CODE ---
    return (
        <div className="dashboard-container">
            <header style={{ marginBottom: '2rem' }}>
                <h1>Welcome Back, {displayName}!</h1>
                <nav className="main-nav" style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/workouts">Workouts</Link>
                    <Link to="/nutrition">Nutrition</Link>
                    <Link to="/progress">Progress</Link>
                </nav>
            </header>
            
            <main className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                
                {/* 1. Key Metrics Section */}
                <section className="metrics-card" style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                    <h2>📊 Your Progress</h2>
                    {loading ? (
                        <p>Loading stats...</p>
                    ) : (
                        <div>
                            <p><strong>Total Workouts:</strong> {totalWorkouts}</p>
                            <p><strong>Active Goals:</strong> {goals.length}</p>
                            {goals.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    <strong>Latest Goal:</strong>
                                    <p>"{goals[0].description}" ({goals[0].status})</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* 2. Today's Workout Section */}
                <section className="workout-card" style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
                    <h2>🏋️ Recent Activity</h2>
                    {loading ? (
                        <p>Loading activity...</p>
                    ) : recentLogs.length > 0 ? (
                        <ul>
                            {recentLogs.slice(0, 3).map((log) => (
                                <li key={log.id} style={{ marginBottom: '8px' }}>
                                    {log.date}: <strong>{log.exercise}</strong> - {log.weight}lbs ({log.sets}x{log.reps})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No workouts logged yet. Go hit the gym! 💪</p>
                    )}
                </section>

                {/* 3. 👇 NEW: Membership Section */}
                <section className="membership-card" style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px', background: '#1a1a1a' }}>
                    <h2>🚀 Membership Status</h2>
                    <p style={{ marginBottom: '15px' }}>
                        <strong>Current Plan:</strong> {user?.planTier === 'premium' ? 'Premium 🌟' : 'Free Tier'}
                    </p>
                    
                    {/* Only show upgrade button if they aren't premium yet */}
                    {user?.planTier !== 'premium' && (
                        <div>
                            <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px' }}>
                                Unlock unlimited goals and advanced 3D analytics.
                            </p>
                            <SubscribeButton />
                        </div>
                    )}
                </section>
                
                {/* 4. 3D Visualization Placeholder */}
                <section className="three-d-card" style={{ gridColumn: '1 / -1', border: '1px solid #333', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                    <h2>✨ 3D Body Visualization</h2>
                    <div style={{ height: '200px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                        [ 3D Model Viewer Component Will Go Here ]
                    </div>
                </section>

            </main>
            
            <footer style={{ marginTop: '2rem' }}>
                <button onClick={logout} style={{ padding: '8px 16px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Log Out
                </button> 
            </footer>
        </div>
    );
}

export default Dashboard;