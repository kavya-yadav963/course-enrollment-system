import React, { useState } from 'react';
import { login } from '../services/api';

const LoginPage = ({ role, onLoginSuccess, setView }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await login(credentials);
      // The backend response includes the role, so we check if it matches
      if (data.role.includes(role.toUpperCase())) {
          onLoginSuccess(data);
      } else {
          setError(`You do not have permission to log in as a ${role}.`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password.";
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{role} Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required onChange={handleChange} value={credentials.email} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required onChange={handleChange} value={credentials.password} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <button type="button" className="btn btn-secondary mt-1" onClick={() => setView('landing')}>Back to Home</button>
      </form>
    </div>
  );
};

export default LoginPage;