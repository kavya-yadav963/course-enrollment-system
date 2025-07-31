import React, { useState, useEffect } from 'react';
import { getAllCourses, createCourse, deleteCourse, getAllTeachers, adminAddStudentToCourse, getAllStudents } from '../services/api';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [newCourse, setNewCourse] = useState({ courseName: '', maxStudents: 30 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const coursesRes = await getAllCourses();
      const teachersRes = await getAllTeachers();
      const studentsRes = await getAllStudents();
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
      setTeachers(Array.isArray(teachersRes.data) ? teachersRes.data : []);
      setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data from the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await createCourse(newCourse);
      setNewCourse({ courseName: '', maxStudents: 30 });
      loadData(); // Refresh list
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course.');
    }
  };
  
  const handleDeleteCourse = async (courseId) => {
      if(window.confirm('Are you sure you want to delete this course?')) {
          try {
              await deleteCourse(courseId);
              loadData();
          } catch (error) {
              console.error('Error deleting course:', error);
              setError('Failed to delete course. It may have students or a teacher assigned.');
          }
      }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Course Management</h4>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreateCourse} className="form-inline">
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={newCourse.courseName}
            onChange={handleInputChange}
            placeholder="e.g., Advanced React"
            required
          />
        </div>
        <div className="form-group">
          <label>Max Students</label>
          <input
            type="number"
            name="maxStudents"
            value={newCourse.maxStudents}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Teacher</th>
            <th>Enrolled</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.teacher ? course.teacher.teacherName : 'Unassigned'}</td>
              <td>{course.students.length} / {course.maxStudents}</td>
              <td>
                <button onClick={() => handleDeleteCourse(course.courseId)} className="btn btn-danger btn-small">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
                <td colSpan="5" className="text-center">No courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;