import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const { role } = useParams(); // 'teacher' or 'student'
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await registerUser(role, { name, email, password });
      setSuccess('Registration successful! Please proceed to login.');
      setTimeout(() => navigate(`/login/${role}`), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
         <div className="auth-switch">
            Already have an account? <Link to={`/login/${role}`}>Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;