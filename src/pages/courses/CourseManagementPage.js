import React, { useState, useEffect } from 'react';
import * as courseService from '../../services/courseService';
import * as userService from '../../services/userService';
import Modal from '../../components/ui/Modal';
import Header from '../../components/common/Header';

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    // Fetch initial data
    const loadData = async () => {
      setIsLoading(true);
      const coursesData = await courseService.getCourses();
      const teachersData = await userService.getTeachers();
      setCourses(coursesData);
      setTeachers(teachersData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentCourse({ course_name: '', max_students: 30, teacher_id: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setIsEditing(true);
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
        await courseService.deleteCourse(courseId);
        // Refresh the list
        const coursesData = await courseService.getCourses();
        setCourses(coursesData);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
        await courseService.updateCourse(currentCourse.id, currentCourse);
    } else {
        await courseService.addCourse(currentCourse);
    }
    // Refresh list and close modal
    const coursesData = await courseService.getCourses();
    setCourses(coursesData);
    handleCloseModal();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };
  
  if (isLoading) {
    return <div>Loading...</div>; // Replace with LoadingSpinner component later
  }

  return (
    <>
      <Header title="Course Management" />
      <div className="card">
        <button className="btn btn-primary" onClick={handleOpenAddModal}>Add New Course</button>
        
        <table className="table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Assigned Teacher</th>
              <th>Max Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.course_name}</td>
                <td>{course.teacher_name}</td>
                <td>{course.max_students}</td>
                <td>
                  <button className="btn btn-small" onClick={() => handleOpenEditModal(course)}>Edit</button>
                  <button className="btn btn-small btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label>Course Name</label>
                <input 
                    type="text" 
                    name="course_name" 
                    value={currentCourse?.course_name || ''} 
                    onChange={handleFormChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label>Max Students</label>
                <input 
                    type="number" 
                    name="max_students" 
                    value={currentCourse?.max_students || ''} 
                    onChange={handleFormChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label>Assign Teacher</label>
                <select 
                    name="teacher_id" 
                    value={currentCourse?.teacher_id || ''} 
                    onChange={handleFormChange}
                    required
                >
                    <option value="" disabled>Select a teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn">{isEditing ? 'Update Course' : 'Save Course'}</button>
        </form>
      </Modal>
    </>
  );
};

export default CourseManagementPage;