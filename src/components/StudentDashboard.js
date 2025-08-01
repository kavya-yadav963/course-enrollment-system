import React, { useState, useEffect } from 'react';
import { getStudentById, getAllCourses } from '../services/api';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const studentId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, coursesRes] = await Promise.all([
          getStudentById(studentId),
          getAllCourses()
        ]);
        setStudent(studentRes.data);
        setAllCourses(coursesRes.data);
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };
    fetchData();
  }, [studentId]);

  if (!student) return <div>Loading...</div>;
  
  const enrolledCourseIds = new Set(student.enrolledCourses.map(c => c.courseId));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome, {student.studentName}! View your enrollments and available courses.</p>
      </div>
       {error && <p className="error-message">{error}</p>}

      <h2 className="section-title">My Enrolled Courses</h2>
      {student.enrolledCourses.length === 0 ? <p>You are not enrolled in any courses.</p> : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Current Enrollment</th>
              </tr>
            </thead>
            <tbody>
              {student.enrolledCourses.map(course => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.teacher?.teacherName || 'Not Assigned'}</td>
                  <td>{course.enrolledStudents.length} / {course.maxStudents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="section-title">All Available Courses</h2>
       <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Enrollment Status</th>
              </tr>
            </thead>
            <tbody>
              {allCourses.map(course => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.teacher?.teacherName || 'Not Assigned'}</td>
                  <td>
                    {enrolledCourseIds.has(course.courseId) 
                      ? <span style={{color: 'green', fontWeight: 'bold'}}>Enrolled</span> 
                      : `${course.enrolledStudents.length} / ${course.maxStudents}`
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default StudentDashboard;