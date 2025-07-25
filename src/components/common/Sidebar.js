import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/App.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="sidebar">
      <h3>Course Enrollment</h3>
      <ul className="nav-menu">
        {/* Common Link for all roles */}
        <li>
          <NavLink to="/dashboard" end>
            <button>Dashboard</button>
          </NavLink>
        </li>

        {/* Admin-only links */}
        {user?.role === 'Admin' && (
          <>
            <li>
              <NavLink to="/dashboard/courses">
                <button>Course Management</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/users">
                <button>User Management</button>
              </NavLink>
            </li>
          </>
        )}

        {/* Teacher-only links */}
        {user?.role === 'Teacher' && (
          <>
            <li>
              <NavLink to="/dashboard/my-courses">
                <button>My Courses</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-assignment">
                <button>Create Assignment</button>
              </NavLink>
            </li>
          </>
        )}

        {/* Student-only links */}
        {user?.role === 'Student' && (
          <>
            <li>
              <NavLink to="/dashboard/enrolled-courses">
                <button>Enrolled Courses</button>
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
    </div>
  );
};

// We need to style the active NavLink. Update your App.css.
// Find `.nav-menu button.active` in App.css and change it to:
// .nav-menu a.active button { ... }
// This is a common pattern with NavLink.
// For simplicity, let's add this directly here. The active class is added to the <a> tag.

const styleFix = `
  .nav-menu a.active button {
    background-color: #34495e;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styleFix;
document.head.appendChild(styleSheet);


export default Sidebar;