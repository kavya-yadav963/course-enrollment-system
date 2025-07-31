import React from 'react';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = ({ user, onLogout }) => {
  const renderDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
        return <AdminDashboard user={user} />;
      case 'TEACHER':
        return <TeacherDashboard user={user} />;
      case 'STUDENT':
        return <StudentDashboard user={user} />;
      default:
        return <p>Invalid user role.</p>;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{user.role.toLowerCase()} Dashboard</h1>
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
      <div className="dashboard-content">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;