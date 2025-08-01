import React, { useState, useEffect } from 'react';
import {
  getAllCourses,
  getAllTeachers,
  getAllStudents,
  adminCreateCourse,
  adminDeleteCourse,
  adminAssignTeacher,
  adminAddStudentToCourse,
  adminRemoveStudentFromCourse,
  adminDeleteTeacher,
  adminDeleteStudent
} from '../services/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseMaxStudents, setNewCourseMaxStudents] = useState(30);
  const [error, setError] = useState('');
  
  const fetchData = async () => {
    try {
      const [coursesRes, teachersRes, studentsRes] = await Promise.all([
        getAllCourses(),
        getAllTeachers(),
        getAllStudents(),
      ]);
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      setError('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await adminCreateCourse({ courseName: newCourseName, maxStudents: newCourseMaxStudents });
      setNewCourseName('');
      setNewCourseMaxStudents(30);
      fetchData(); // Refresh data
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to create course.');
    }
  };
  
  const handleDeleteCourse = async (courseId) => {
      if(window.confirm('Are you sure you want to delete this course?')) {
          try {
              await adminDeleteCourse(courseId);
              fetchData();
          } catch (err) {
              setError('Failed to delete course.');
          }
      }
  };

  const handleAssignTeacher = async (e, courseId) => {
      const teacherId = e.target.value;
      if (!teacherId) return;
      try {
          await adminAssignTeacher(teacherId, courseId);
          fetchData();
      } catch (err) {
           setError(err.response?.data?.message || 'Failed to assign teacher.');
      }
  };

  const handleEnrollStudent = async (e, courseId) => {
      const studentId = e.target.value;
      if(!studentId) return;
      try {
          await adminAddStudentToCourse(courseId, studentId);
          fetchData();
      } catch(err) {
          setError(err.response?.data?.message || 'Failed to enroll student.');
      }
  }

  const handleUnenrollStudent = async (courseId, studentId) => {
       try {
          await adminRemoveStudentFromCourse(courseId, studentId);
          fetchData();
      } catch(err) {
          setError(err.response?.data?.message || 'Failed to unenroll student.');
      }
  }
  
  const handleDeleteTeacher = async (teacherId) => {
       if(window.confirm('Are you sure you want to delete this teacher? This will also unassign them from any courses.')) {
           try {
               await adminDeleteTeacher(teacherId);
               fetchData();
           } catch(err) {
               setError('Failed to delete teacher.');
           }
       }
  }

   const handleDeleteStudent = async (studentId) => {
       if(window.confirm('Are you sure you want to delete this student? This will also remove them from any enrolled courses.')) {
           try {
               await adminDeleteStudent(studentId);
               fetchData();
           } catch(err) {
               setError('Failed to delete student.');
           }
       }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage courses, teachers, and students across the system.</p>
      </div>
      {error && <p className="error-message">{error}</p>}

      {/* Course Management */}
      <h2 className="section-title">Course Management</h2>
      <form onSubmit={handleCreateCourse} className="form-inline">
          <input 
            type="text" 
            placeholder="New Course Name" 
            value={newCourseName}
            onChange={e => setNewCourseName(e.target.value)}
            required
            />
          <input 
            type="number"
            placeholder="Max Students"
            value={newCourseMaxStudents}
            onChange={e => setNewCourseMaxStudents(e.target.value)}
            required
            />
          <button type="submit" className="btn btn-primary">Create Course</button>
      </form>
      <div className="table-container">
        <table className="table">
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Assigned Teacher</th>
                    <th>Enrolled / Max</th>
                    <th>Enroll Student</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => (
                    <React.Fragment key={course.courseId}>
                    <tr>
                        <td>{course.courseName}</td>
                        <td>
                             <select value={course.teacher?.teacherId || ''} onChange={(e) => handleAssignTeacher(e, course.courseId)}>
                                <option value="">Assign Teacher</option>
                                {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.teacherName}</option>)}
                             </select>
                        </td>
                        <td>{course.enrolledStudents.length} / {course.maxStudents}</td>
                        <td>
                             <select value="" onChange={(e) => handleEnrollStudent(e, course.courseId)}>
                                <option value="">Select Student</option>
                                {students.map(s => <option key={s.studentId} value={s.studentId}>{s.studentName}</option>)}
                             </select>
                        </td>
                        <td className="action-buttons">
                            <button className="btn btn-danger" onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
                        </td>
                    </tr>
                    {course.enrolledStudents.length > 0 && (
                        <tr>
                            <td colSpan="5">
                                <strong>Enrolled Students: </strong>
                                {course.enrolledStudents.map(s => (
                                    <span key={s.studentId} style={{marginRight: '10px'}}>
                                        {s.studentName} <button style={{color: 'red', cursor: 'pointer', border: 'none'}} onClick={() => handleUnenrollStudent(course.courseId, s.studentId)}>x</button>
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

       {/* Teacher Management */}
        <h2 className="section-title">Teacher Management</h2>
         <div className="table-container">
            <table className="table">
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Courses Teaching</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {teachers.map(t => (
                        <tr key={t.teacherId}>
                            <td>{t.teacherName}</td>
                            <td>{t.email}</td>
                            <td>{t.coursesTeaching.map(c => c.courseName).join(', ') || 'None'}</td>
                            <td className="action-buttons">
                                <button className="btn btn-danger" onClick={() => handleDeleteTeacher(t.teacherId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

       {/* Student Management */}
        <h2 className="section-title">Student Management</h2>
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Courses Enrolled</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.studentId}>
                            <td>{s.studentName}</td>
                            <td>{s.email}</td>
                            <td>{s.enrolledCourses.map(c => c.courseName).join(', ') || 'None'}</td>
                            <td className="action-buttons">
                                <button className="btn btn-danger" onClick={() => handleDeleteStudent(s.studentId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminDashboard;