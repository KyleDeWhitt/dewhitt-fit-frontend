import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileSetup from './components/ProfileSetup';
import AdminDashboard from './components/AdminDashboard';
import VerifyEmail from './components/VerifyEmail';

const GlobalStyles = () => (
  <style>{`
    /* 🔴 DELETED THE LINE THAT BROKE EVERYTHING */
    /* * { background-color: transparent !important; } */
    
    /* Re-apply nice dark background */
    body {
      background-color: #0b1121; 
      margin: 0;
      color: white;
    }
    
    /* Fix Card Backgrounds so they are readable */
    .comparison-card, .engine-card, .cta-card, .auth-card {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .comparison-card.good {
      background-color: rgba(255, 215, 0, 0.05);
    }
    
    /* Buttons */
    button {
      background-color: #FFD700;
      border: none;
      cursor: pointer;
    }
    nav button {
      background-color: white;
    }
    input, select {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `}</style>
);

function App() {
  return (
    <Router>
      <AuthProvider>
          <GlobalStyles /> {/* ✅ ENABLED AGAIN */}
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/setup-profile" element={<ProfileSetup />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404 Not Found</h1>} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;