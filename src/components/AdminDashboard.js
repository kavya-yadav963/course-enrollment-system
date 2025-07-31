import React, { useState } from 'react';
import CourseManagement from './CourseManagement';
import TeacherManagement from './TeacherManagement';
import StudentManagement from './StudentManagement';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('courses');

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'students':
        return <StudentManagement />;
      default:
        return <CourseManagement />;
    }
  };

  // Basic styles for tabs
  const tabStyle = {
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: '3px solid transparent',
    display: 'inline-block'
  };

  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '3px solid #667eea',
    color: '#667eea',
  };


  return (
    <div>
      <h3>Welcome, {user.name}! (Administrator)</h3>
      <p>From this dashboard, you can manage all courses, teachers, and students in the system.</p>
      
      <div style={{ borderBottom: '1px solid #ddd', marginBottom: '2rem' }}>
        <div style={activeTab === 'courses' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('courses')}>
          Manage Courses
        </div>
        <div style={activeTab === 'teachers' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('teachers')}>
          Manage Teachers
        </div>
        <div style={activeTab === 'students' ? activeTabStyle : tabStyle} onClick={() => setActiveTab('students')}>
          Manage Students
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;