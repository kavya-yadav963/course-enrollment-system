import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import CreateAssignmentPage from '../assignments/AssignmentCreatePage';
import CourseDetailsPage from '../courses/CourseDetailsPage';
import SubmissionsPage from '../assignments/SubmissionsPage'; // <-- IMPORT THE NEW PAGE

// Import Role-Specific Dashboards
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

// --- CORRECTED: Import all the REAL pages we have built ---
import CourseManagementPage from '../courses/CourseManagementPage';
import UserManagementPage from '../users/UserManagementPage';
import MyCoursesPage from '../courses/MyCoursesPage';
import EnrolledCoursesPage from '../courses/EnrolledCoursesPage';

// --- We still need placeholders for pages we have NOT built yet ---


const DashboardPage = () => {
  const { user } = useAuth();

  // This function determines which component to show on the main "/dashboard" route
  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Teacher':
        return <TeacherDashboard />;
      case 'Student':
        return <StudentDashboard />;
      default:
        // If role is not found, or user is null, redirect to login
        return <Navigate to="/login" replace />;
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        {/* The Header can be made dynamic later if needed */}
        <Header title="Dashboard" />
        <Routes>
            {/* The main dashboard route shows a different component based on role */}
            <Route path="/" element={renderDashboardByRole()} />

            {/* === Admin Routes === */}
            <Route path="courses" element={<CourseManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
            
            {/* === Teacher Routes === */}
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route path="create-assignment" element={<CreateAssignmentPage />} />

            {/* === Student Routes === */}
            <Route path="enrolled-courses" element={<EnrolledCoursesPage />} />
            
            {/* === ADDED: Dynamic Route for viewing a single course === */}
            {/* This route will be used by all roles to see course details */}
            <Route path="course/:courseId" element={<CourseDetailsPage />} />
            <Route path="assignment/:assignmentId/submissions" element={<SubmissionsPage />} />
            {/* Fallback for any other route inside the dashboard */}
            <Route path="*" element={<div>Page Not Found Inside Dashboard</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardPage;