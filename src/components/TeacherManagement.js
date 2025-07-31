import React, { useState, useEffect } from 'react';
import { getAllTeachers, deleteTeacher } from '../services/api';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await getAllTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load teachers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher? This will also unassign them from any courses.')) {
      try {
        await deleteTeacher(teacherId);
        loadTeachers(); // Refresh the list
      } catch (err) {
        setError('Failed to delete teacher.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Teacher Management</h4>
      {error && <p className="error-message">{error}</p>}
      <p>Teachers and students should be created via the "Register" pages.</p>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? teachers.map(teacher => (
            <tr key={teacher.teacherId}>
              <td>{teacher.teacherId}</td>
              <td>{teacher.teacherName}</td>
              <td>{teacher.email}</td>
              <td>
                <button onClick={() => handleDelete(teacher.teacherId)} className="btn btn-danger btn-small">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="text-center">No teachers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherManagement;