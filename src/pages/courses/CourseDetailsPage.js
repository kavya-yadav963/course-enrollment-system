import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link
import * as courseService from '../../services/courseService';
import * as userService from '../../services/userService';
import * as assignmentService from '../../services/assignmentService';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import AssignmentSubmission from '../assignments/AssignmentSubmission';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState('');

  const canManageCourse = user.role === 'Admin' || (user.role === 'Teacher' && user.id === course?.teacher_id);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const courseData = await courseService.getCourseById(courseId);
      if (!courseData) { navigate('/dashboard'); return; }
      setCourse(courseData);

      const enrolledData = await courseService.getEnrolledStudents(courseId);
      setEnrolledStudents(enrolledData);
      
      const assignmentData = await assignmentService.getAssignmentsByCourse(courseId);
      setAssignments(assignmentData);

      if (user.role === 'Admin' || (user.role === 'Teacher' && user.id === courseData.teacher_id)) {
        const allStudents = await userService.getStudents(); 
        const enrolledIds = new Set(enrolledData.map(s => s.id));
        setAvailableStudents(allStudents.filter(s => !enrolledIds.has(s.id)));
      }
    } catch (error) {
      console.error("Failed to load course data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, navigate, user]);

  useEffect(() => { loadData(); }, [loadData]);

  // (All handle functions like handleEnrollStudent remain the same)
  const handleEnrollStudent = async (e) => { e.preventDefault(); try { await courseService.enrollStudent(courseId, selectedStudent); setSelectedStudent(''); await loadData(); } catch (error) { alert(`Error: ${error.message}`); }};
  const handleUnenrollStudent = async (studentId) => { if (window.confirm('Are you sure?')) { await courseService.unenrollStudent(courseId, studentId); await loadData(); }};

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header title={course.course_name} />
      {/* ... Course Info, Student Management, and Enrolled Students tables remain the same ... */}
      <div className="card"><p><strong>Teacher:</strong> {course.teacher_name} | <strong>Capacity:</strong> {enrolledStudents.length} / {course.max_students}</p></div>

      {/* --- ASSIGNMENTS SECTION (view changes based on role) --- */}
      <div className="card">
        <h3>Assignments</h3>
        {assignments.length === 0 ? <p>No assignments posted.</p> : (
            assignments.map(assignment => (
                <div key={assignment.id}>
                    {/* Students see the submission component */}
                    {user.role === 'Student' && (
                        <AssignmentSubmission assignment={assignment} />
                    )}
                    {/* Teacher sees a link to the grading page */}
                    {canManageCourse && (
                        <div className="card" style={{marginTop: '1rem'}}>
                           <h4>{assignment.title}</h4>
                           <p>Due: {assignment.due_date}</p>
                           <Link to={`/dashboard/assignment/${assignment.id}/submissions`} className="btn btn-small">
                                View Submissions
                           </Link>
                        </div>
                    )}
                </div>
            ))
        )}
      </div>
    </>
  );
};

export default CourseDetailsPage;