import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as courseService from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';

const EnrolledCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth(); // Get the logged-in student

  useEffect(() => {
    if (user?.role === 'Student') {
      const loadCourses = async () => {
        setIsLoading(true);
        const enrolledCourses = await courseService.getEnrolledCoursesByStudent(user.id);
        setCourses(enrolledCourses);
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
      <Header title="My Enrolled Courses" />
      {courses.length > 0 ? (
        <div className="stats-grid">
          {courses.map(course => (
            <div key={course.id} className="card">
              <h3>{course.course_name}</h3>
              <p>Taught by: {course.teacher_name}</p>
              {/* This link will go to a read-only details page */}
              <Link to={`/dashboard/course/${course.id}`} className="btn" style={{marginTop: '1rem'}}>
                View Course
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
            <p>You are not currently enrolled in any courses.</p>
        </div>
      )}
    </>
  );
};

export default EnrolledCoursesPage;