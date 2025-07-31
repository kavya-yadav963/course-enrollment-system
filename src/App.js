import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing', 'login', 'register', 'dashboard'
  const [role, setRole] = useState(''); // 'admin', 'teacher', 'student'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setView('dashboard');
      }
    } catch (error) {
        console.error('Could not parse user from localStorage', error);
        localStorage.clear();
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    const appUser = {
      id: userData.userId,
      name: userData.name,
      role: userData.role.replace('ROLE_', ''), // Storing role as ADMIN, not ROLE_ADMIN
      token: userData.token
    };
    localStorage.setItem('user', JSON.stringify(appUser));
    localStorage.setItem('authToken', appUser.token);
    setUser(appUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setRole('');
    setView('landing');
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading-container">Loading...</div>;
    }

    if (view === 'dashboard' && user) {
      return <Dashboard user={user} onLogout={handleLogout} />;
    }
    if (view === 'login') {
      return <LoginPage role={role} onLoginSuccess={handleLoginSuccess} setView={setView} />;
    }
    if (view === 'register') {
      return <RegisterPage role={role} onLoginSuccess={handleLoginSuccess} setView={setView} />;
    }
    return <LandingPage setView={setView} setRole={setRole} />;
  };

  return <div className="app">{renderContent()}</div>;
}

export default App;