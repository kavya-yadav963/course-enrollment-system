import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import * as userService from '../services/userService'; // Import the user service
import '../styles/App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', // Changed from fullName to match service
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student', // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- THIS IS THE NEW, FIXED REGISTRATION LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
    }
    setLoading(true);

    try {
      // Actually call our service to add the user to the mock data!
      await userService.addUser({ name, email, password, role });
      
      alert('Registration successful! You can now log in.');
      
      // Redirect the user to the login page
      navigate('/login');

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
        setLoading(false);
    }
  };
  // --- END OF NEW LOGIC ---

  return (
    <div className="login-container">
      <form className="login-form register-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Full Name</label> {/* Changed from fullName */}
          <input
            type="text"
            id="name"
            name="name" // Changed from fullName
            value={name}
            onChange={onChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">I am a:</label>
          <select 
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            disabled={loading}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength="6"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="form-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="btn btn-link">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;