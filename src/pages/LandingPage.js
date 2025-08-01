import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminIcon from '../assets/admin.png';
import teacherIcon from '../assets/teacher.png';
import studentIcon from '../assets/student.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const RoleCard = ({ title, icon, role }) => (
    <div className="role-card">
      <img src={icon} alt={`${title} icon`} className="role-icon" />
      <h2>{title}</h2>
      <div className="role-buttons">
        <button onClick={() => navigate(`/login/${role}`)} className="btn btn-primary">Login</button>
        {role !== 'admin' && (
          <button onClick={() => navigate(`/register/${role}`)} className="btn btn-secondary">Register</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="landing-container">
      <div>
        <h1 className="landing-title">Course Enrollment System</h1>
        <div className="role-selection">
           <RoleCard title="Admin" role="admin" icon={adminIcon} />
           <RoleCard title="Teacher" role="teacher" icon={teacherIcon} />
           <RoleCard title="Student" role="student" icon={studentIcon} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;