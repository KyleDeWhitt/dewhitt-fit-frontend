// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';      
import RegistrationForm from './components/RegistrationForm.jsx'; 
import Dashboard from './components/Dashboard.jsx'; 
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import ProfileSetup from './components/ProfileSetup.jsx'; 
// 👇 1. Import the new Landing Page
import LandingPage from './components/LandingPage.jsx'; 

function App() {
  return (
    <Routes>
      
      {/* 2. Public Routes */}
      {/* 👇 The Landing Page is now the "Front Door" (Root URL) */}
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistrationForm />} /> 
      
      {/* 3. Protected Routes Wrapper */}
      {/* Users only get here if they are logged in */}
      <Route element={<ProtectedRoute />}>
          
          {/* Main Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/setup-profile" element={<ProfileSetup />} /> 

      </Route>
      
      {/* 4. Catch-all for unknown routes */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;