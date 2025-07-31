import React, { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from '../services/api';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load students.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student? They will be removed from all enrolled courses.')) {
      try {
        await deleteStudent(studentId);
        loadStudents(); // Refresh the list
      } catch (err) {
        setError('Failed to delete student.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Student Management</h4>
      {error && <p className="error-message">{error}</p>}
      
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
          {students.length > 0 ? students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student.studentId)} className="btn btn-danger btn-small">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;