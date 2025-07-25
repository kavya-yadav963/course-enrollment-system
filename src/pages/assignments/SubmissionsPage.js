import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as assignmentService from '../../services/assignmentService';
import Header from '../../components/common/Header';

const SubmissionsPage = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState({}); // To hold grades before saving

  const loadSubmissions = useCallback(async () => {
    setIsLoading(true);
    const assignmentData = await assignmentService.getAssignmentById(assignmentId);
    setAssignment(assignmentData);

    const submissionData = await assignmentService.getSubmissionsForAssignment(assignmentId);
    setSubmissions(submissionData);
    
    // Pre-fill grades state with existing marks
    const initialGrades = {};
    submissionData.forEach(sub => {
        initialGrades[sub.id] = sub.marks || '';
    });
    setGrades(initialGrades);

    setIsLoading(false);
  }, [assignmentId]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const handleGradeChange = (submissionId, value) => {
    setGrades({
      ...grades,
      [submissionId]: value,
    });
  };

  const handleSaveGrade = async (submissionId) => {
    const marks = grades[submissionId];
    if (marks === '' || isNaN(marks)) {
        alert("Please enter a valid number for the grade.");
        return;
    }
    await assignmentService.gradeSubmission(submissionId, marks);
    alert('Grade saved successfully!');
    // Refresh to show updated data
    await loadSubmissions();
  };

  if (isLoading) {
    return <div>Loading submissions...</div>;
  }

  return (
    <>
      <Header title={`Submissions for: ${assignment?.title}`} />
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Submitted File</th>
              <th>Submitted At</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.student_name}</td>
                  <td>
                    <a href={sub.file_url} target="_blank" rel="noopener noreferrer">
                        {sub.file_url.split('/').pop()}
                    </a>
                  </td>
                  <td>{sub.submitted_at}</td>
                  <td>
                    <input 
                      type="number" 
                      className="form-group-input" // A smaller input
                      style={{width: '80px', padding: '0.5rem'}}
                      value={grades[sub.id]}
                      onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button 
                      className="btn btn-small btn-success"
                      onClick={() => handleSaveGrade(sub.id)}
                    >
                      Save Grade
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No submissions for this assignment yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubmissionsPage;