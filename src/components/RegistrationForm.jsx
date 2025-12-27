import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function RegistrationForm() {
    const { registerUser } = useAuth();
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        const result = await registerUser(formData);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    };

    // --- SUCCESS VIEW (Also styled with Glass) ---
    if (success) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#0b1121'
            }}>
                <div style={{ 
                    padding: '40px', 
                    borderRadius: '24px', 
                    maxWidth: '400px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}>
                    <h2 style={{ color: '#10b981', fontSize: '2rem', marginBottom: '10px' }}>✅ Success!</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#cbd5e1' }}>
                        Account created for <strong>{formData.email}</strong>.
                    </p>
                    <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid #FFD700', marginBottom: '20px' }}>
                        <p style={{ margin: 0, color: '#FFD700', fontSize: '0.9rem' }}>
                            Please check your inbox and click the verification link to activate your account.
                        </p>
                    </div>
                    <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    // --- MAIN REGISTRATION FORM ---
    return (
        <div style={{ 
            minHeight: '100vh', 
            width: '100%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#0b1121',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ 
                width: '100%', 
                maxWidth: '450px', // Slightly wider for the two-column inputs
                padding: '40px', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', // MATCHED LOGIN STYLE
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
                <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '10px', fontSize: '1.8rem', fontWeight: '800' }}>
                    Create <span style={{ color: '#FFD700' }}>Account</span>
                </h2>
                <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '30px', fontSize: '0.95rem' }}>
                    Start your journey with DeWhitt Designs.
                </p>

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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>FIRST NAME</label>
                            <input 
                                name="first_name" 
                                type="text" 
                                placeholder="Jane"
                                value={formData.first_name} 
                                onChange={handleChange} 
                                style={{ 
                                    width: '100%', padding: '12px', borderRadius: '12px', 
                                    border: '1px solid #334155', background: 'rgba(0,0,0,0.2)', 
                                    color: 'white', outline: 'none', boxSizing: 'border-box' 
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>LAST NAME</label>
                            <input 
                                name="last_name" 
                                type="text" 
                                placeholder="Doe"
                                value={formData.last_name} 
                                onChange={handleChange} 
                                style={{ 
                                    width: '100%', padding: '12px', borderRadius: '12px', 
                                    border: '1px solid #334155', background: 'rgba(0,0,0,0.2)', 
                                    color: 'white', outline: 'none', boxSizing: 'border-box' 
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>EMAIL ADDRESS</label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="name@company.com"
                            value={formData.email} 
                            onChange={handleChange} 
                            style={{ 
                                width: '100%', padding: '12px', borderRadius: '12px', 
                                border: '1px solid #334155', background: 'rgba(0,0,0,0.2)', 
                                color: 'white', outline: 'none', boxSizing: 'border-box' 
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ color: '#cbd5e1', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>PASSWORD</label>
                        <input 
                            name="password" 
                            type="password" 
                            placeholder="••••••••"
                            value={formData.password} 
                            onChange={handleChange} 
                            style={{ 
                                width: '100%', padding: '12px', borderRadius: '12px', 
                                border: '1px solid #334155', background: 'rgba(0,0,0,0.2)', 
                                color: 'white', outline: 'none', boxSizing: 'border-box' 
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            marginTop: '10px', 
                            padding: '16px', 
                            background: '#FFD700', 
                            color: '#000', 
                            fontWeight: '800', 
                            fontSize: '1.1rem',
                            border: 'none', 
                            borderRadius: '50px', // MATCHED LOGIN PILL SHAPE
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'transform 0.1s'
                        }}
                        onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseOut={(e) => !loading && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '30px', fontSize: '0.95rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationForm;