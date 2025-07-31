import React, { useState } from 'react';
import { register, login } from '../services/api';

const RegisterPage = ({ role, onLoginSuccess, setView }) => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await register(role, userData);
      setMessage('Registration successful! Please log in.');
      // Automatically switch to login view after a short delay
      setTimeout(() => {
          setView('login');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register as {role}</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p style={{color: 'green', textAlign: 'center'}}>{message}</p>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" id="name" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary mt-1" onClick={() => setView('landing')}>Back to Home</button>
      </form>
    </div>
  );
};

export default RegisterPage;