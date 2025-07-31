import React from 'react';
import adminImg from '../assets/admin.png';
import teacherImg from '../assets/teacher.png';
import studentImg from '../assets/student.png';

const RoleCard = ({ role, img, onLogin, onRegister }) => (
  <div className="role-card">
    <img src={img} alt={role} />
    <h3>{role}</h3>
    <div className="role-buttons">
      <button className="btn btn-primary" onClick={() => onLogin(role.toLowerCase())}>Login</button>
      <button className="btn btn-secondary" onClick={() => onRegister(role.toLowerCase())}>Register</button>
    </div>
  </div>
);

const LandingPage = ({ setView, setRole }) => {
  const handleLogin = (role) => {
    setRole(role);
    setView('login');
  };

  const handleRegister = (role) => {
    setRole(role);
    setView('register');
  };

  return (
    <div className="landing-container">
      <div>
        <h1 className="landing-title">Course Enrollment System</h1>
        <div className="role-selection">
          <RoleCard role="Admin" img={adminImg} onLogin={handleLogin} onRegister={handleRegister} />
          <RoleCard role="Teacher" img={teacherImg} onLogin={handleLogin} onRegister={handleRegister} />
          <RoleCard role="Student" img={studentImg} onLogin={handleLogin} onRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;