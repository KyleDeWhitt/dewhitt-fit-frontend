import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await login(email, password);
            
            if (response && response.user && response.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard'); 
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            width: '100%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#0b1121', // Deep dark blue background
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '420px', 
                padding: '40px', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', // Subtle glass effect
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', color: 'white', margin: '0 0 10px 0', fontWeight: '800' }}>
                        Welcome <span style={{ color: '#FFD700' }}>Back</span>
                    </h2>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
                        Access your DeWhitt Designs dashboard.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                        border: '1px solid #ef4444', 
                        color: '#fca5a5', 
                        padding: '12px', 
                        borderRadius: '8px', 
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            color: '#cbd5e1', 
                            fontSize: '0.75rem', 
                            fontWeight: '700', 
                            letterSpacing: '1px', 
                            marginBottom: '8px' 
                        }}>
                            EMAIL ADDRESS
                        </label>
                        <input 
                            type="email" 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '14px', 
                                borderRadius: '12px', 
                                border: '1px solid #334155', 
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                color: 'white', 
                                fontSize: '1rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                            onBlur={(e) => e.target.style.borderColor = '#334155'}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{ 
                                color: '#cbd5e1', 
                                fontSize: '0.75rem', 
                                fontWeight: '700', 
                                letterSpacing: '1px'
                            }}>
                                PASSWORD
                            </label>
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ 
                                width: '100%', 
                                padding: '14px', 
                                borderRadius: '12px', 
                                border: '1px solid #334155', 
                                backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                                color: 'white', 
                                fontSize: '1rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#FFD700'}
                            onBlur={(e) => e.target.style.borderColor = '#334155'}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '16px', 
                            borderRadius: '50px', 
                            backgroundColor: '#FFD700', 
                            color: '#000', 
                            fontWeight: '800', 
                            fontSize: '1.1rem', 
                            border: 'none', 
                            cursor: loading ? 'wait' : 'pointer',
                            transition: 'transform 0.1s',
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseOut={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {loading ? 'Accessing...' : 'Sign In'}
                    </button>
                </form>

                {/* Footer Link */}
                <div style={{ marginTop: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 'bold' }}>
                        Start a Project
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;