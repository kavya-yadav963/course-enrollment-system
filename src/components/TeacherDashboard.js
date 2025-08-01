import React, { useState, useEffect } from 'react';
import { getTeacherById, getAllStudents, teacherAddStudent, teacherRemoveStudent } from '../services/api';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [error, setError] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user'));
  const teacherId = user.id;

  const fetchData = async () => {
    try {
      const [teacherRes, studentsRes] = await Promise.all([
          getTeacherById(teacherId),
          getAllStudents()
      ]);
      setTeacher(teacherRes.data);
      setAllStudents(studentsRes.data);
    } catch (err) {
      setError('Failed to fetch teacher data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [teacherId]);

  const handleAddStudent = async (e, courseId) => {
      const studentId = e.target.value;
      if(!studentId) return;
      try {
          await teacherAddStudent(courseId, studentId, teacherId);
          fetchData();
      } catch (err) {
          setError(err.response?.data?.message || 'Failed to add student.');
      }
  };

  const handleRemoveStudent = async (courseId, studentId) => {
      try {
          await teacherRemoveStudent(courseId, studentId, teacherId);
          fetchData();
      } catch (err) {
          setError(err.response?.data?.message || 'Failed to remove student.');
      }
  };

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Manage your assigned courses and students.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      
      <h2 className="section-title">My Courses</h2>
      {teacher.coursesTeaching.length === 0 ? <p>You are not assigned to any courses.</p> : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Enrolled / Max</th>
                <th>Add Student</th>
              </tr>
            </thead>
            <tbody>
              {teacher.coursesTeaching.map(course => (
                <React.Fragment key={course.courseId}>
                  <tr>
                    <td>{course.courseName}</td>
                    <td>{course.enrolledStudents.length} / {course.maxStudents}</td>
                    <td>
                      <select value="" onChange={(e) => handleAddStudent(e, course.courseId)}>
                        <option value="">Select a student to add</option>
                        {allStudents.map(s => <option key={s.studentId} value={s.studentId}>{s.studentName}</option>)}
                      </select>
                    </td>
                  </tr>
                  {course.enrolledStudents.length > 0 && (
                    <tr>
                      <td colSpan="3">
                        <strong>Enrolled Students:</strong>
                        {course.enrolledStudents.map(s => (
                          <span key={s.studentId} style={{ margin: '0 10px', padding: '5px', background: '#f0f0f0', borderRadius: '4px' }}>
                            {s.studentName}
                            <button onClick={() => handleRemoveStudent(course.courseId, s.studentId)} style={{ marginLeft: '5px', color: 'red', cursor: 'pointer', border: 'none', background: 'transparent' }}>
                              &times;
                            </button>
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;