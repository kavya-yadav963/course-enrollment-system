import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
             <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          </Route>
           <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
             <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Route>
          
          {/* Fallback Route */}
          <Route path="*" element={<p>404 Not Found</p>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;