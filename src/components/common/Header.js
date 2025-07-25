import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/App.css';

const Header = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="page-header">
      <h2>{title}</h2>
      <p>Welcome, {user?.name} ({user?.role})</p>
    </div>
  );
};

export default Header;