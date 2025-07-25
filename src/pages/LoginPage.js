import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../services/_mockData';
import '../styles/App.css';

const LoginPage = () => {
  // State now holds all three credentials
  const [credentials, setCredentials] = useState({
    role: 'Student', // Default role
    userId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    const { role, userId, password } = credentials;

    if (!role || !userId || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    // --- NEW LOGIN LOGIC BASED ON ROLE AND USER ID ---
    setTimeout(() => {
      // Find the user that matches BOTH the entered ID and the selected Role
      const foundUser = mockUsers.find(
        (user) => user.id === userId && user.role === role
      );

      // We still don't check the password, but in a real app you would.
      if (foundUser) {
        login(foundUser);
        navigate('/dashboard');
      } else {
        setError('Login failed. Invalid User ID or Role.');
      }
      setLoading(false);
    }, 1000);
    // --- END OF NEW LOGIC ---
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="role">Login as a:</label>
          <select id="role" name="role" value={credentials.role} onChange={handleChange} required>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="e.g., user01, admin01"
            value={credentials.userId}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="form-footer">
          <p>Don't have an account?</p>
          <Link to="/register" className="btn btn-link">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;