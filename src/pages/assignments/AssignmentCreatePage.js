import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as courseService from '../../services/courseService';
import * as assignmentService from '../../services/assignmentService';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';

const AssignmentCreatePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    question: '',
    due_date: '',
  });

  useEffect(() => {
    const loadTeacherCourses = async () => {
      if (user?.role === 'Teacher') {
        const courses = await courseService.getCoursesByTeacher(user.id);
        setMyCourses(courses);
        setIsLoading(false);
      }
    };
    loadTeacherCourses();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.course_id || !formData.title || !formData.question || !formData.due_date) {
        alert("Please fill out all fields.");
        return;
    }
    try {
        await assignmentService.createAssignment(formData);
        alert('Assignment created successfully!');
        navigate('/dashboard/my-courses'); // Redirect after creation
    } catch (error) {
        alert('Failed to create assignment.');
        console.error(error);
    }
  };
  
  if (isLoading) {
      return <div>Loading your course data...</div>
  }

  return (
    <>
      <Header title="Create New Assignment" />
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="course_id">Select Course</label>
            <select
              id="course_id"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose a course...</option>
              {myCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Assignment Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="question">Question / Description</label>
            <textarea
              id="question"
              name="question"
              rows="5"
              value={formData.question}
              onChange={handleChange}
              required
            ></textarea>
          </div>
           <div className="form-group">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Create Assignment</button>
        </form>
      </div>
    </>
  );
};

export default AssignmentCreatePage;