import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as courseService from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in teacher

  useEffect(() => {
    if (user?.role === 'Teacher') {
      const loadCourses = async () => {
        setIsLoading(true);
        const teacherCourses = await courseService.getCoursesByTeacher(user.id);
        setCourses(teacherCourses);
        setIsLoading(false);
      };
      loadCourses();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading your courses...</div>;
  }
  
  return (
    <>
      <Header title="My Courses" />
      {courses.length > 0 ? (
        <div className="stats-grid">
          {courses.map(course => (
            <div key={course.id} className="card">
              <h3>{course.course_name}</h3>
              <p>Max Students: {course.max_students}</p>
              {/* This link will navigate to the details page we will build next */}
              <Link to={`/dashboard/course/${course.id}`} className="btn" style={{marginTop: '1rem'}}>
                Manage Course
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
            <p>You are not currently assigned to any courses.</p>
        </div>
      )}
    </>
  );
};

export default MyCoursesPage;