import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../services/api';

const StudentDashboard = ({ user }) => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await getAllCourses();
        // Filter courses the logged-in student is enrolled in
        const filteredCourses = data.filter(course => 
          course.students.some(student => student.studentId === user.id)
        );
        setMyCourses(filteredCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user.id]);

  if (loading) return <p>Loading your enrolled courses...</p>;

  return (
    <div>
      <h3>Welcome, {user.name}!</h3>
      <h4>Your Enrolled Courses</h4>
      {myCourses.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseName}</td>
                <td>{course.teacher ? course.teacher.teacherName : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default StudentDashboard;