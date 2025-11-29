import { useState } from 'react';

const SubscribeButton = () => {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            // 👇 FIX: Changed 'token' to 'authToken' to match your login system
            const token = localStorage.getItem('authToken'); 
            
            const API_URL = 'https://dewhitt-api.onrender.com';

            const response = await fetch(`${API_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error initiating checkout');
            }

            if (data.url) {
                window.location.href = data.url;
            }

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Failed to start payment session. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleSubscribe} 
            disabled={loading}
            style={{
                padding: '12px 24px',
                backgroundColor: '#635bff', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                marginTop: '20px'
            }}
        >
            {loading ? "Redirecting..." : "Upgrade to Premium ($10/mo)"}
        </button>
    );
};

export default SubscribeButton;