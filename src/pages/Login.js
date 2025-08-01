import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const { role } = useParams(); // 'admin', 'teacher', or 'student'
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser({ email, password });
      const userData = {
        token: response.data.token,
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
      };
      
      const userRole = userData.role.replace('ROLE_', '').toLowerCase();

      if (userRole !== role) {
        setError(`Login failed. You are not registered as a ${role}.`);
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect based on role
      navigate(`/${userRole}-dashboard`);

    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
        {error && <p className="error-message">{error}</p>}
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
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        {role !== 'admin' && (
           <div className="auth-switch">
                Don't have an account? <Link to={`/register/${role}`}>Register here</Link>
            </div>
        )}
      </form>
    </div>
  );
};

export default Login;