import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                return;
            }

            try {
                // 👇 Call the new backend route we just made
                await axios.post(`${API_URL}/api/auth/verify-email`, { token });
                setStatus('success');
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } catch (error) {
                console.error("Verification failed:", error);
                setStatus('error');
            }
        };

        verifyToken();
    }, [searchParams, navigate]);

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#0b1121', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ 
                background: '#1e293b', 
                padding: '40px', 
                borderRadius: '16px', 
                maxWidth: '400px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {status === 'verifying' && (
                    <>
                        <h2 style={{ color: '#FFD700' }}>Verifying...</h2>
                        <p>Please wait while we confirm your email.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <h2 style={{ color: '#10b981' }}>✅ Email Verified!</h2>
                        <p>Thank you for verifying your account.</p>
                        <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Redirecting to login...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <h2 style={{ color: '#ef4444' }}>❌ Verification Failed</h2>
                        <p>The link may be invalid or expired.</p>
                        <button 
                            onClick={() => navigate('/login')}
                            style={{
                                marginTop: '20px',
                                background: '#FFD700',
                                color: 'black',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Back to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;