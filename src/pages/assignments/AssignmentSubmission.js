import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as assignmentService from '../../services/assignmentService';
import { mockSubmissions } from '../../services/_mockData'; // For checking status

const AssignmentSubmission = ({ assignment }) => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(() => {
    // Check initial submission status from mock data
    const existing = mockSubmissions.find(s => s.assignment_id === assignment.id && s.student_id === user.id);
    return existing;
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setIsLoading(true);
    const submissionData = {
      assignment_id: assignment.id,
      student_id: user.id,
      file_url: `/path/to/simulated/${file.name}`, // Simulate a file path
    };

    try {
      const newSubmission = await assignmentService.submitAssignment(submissionData);
      setSubmissionStatus(newSubmission); // Update status immediately
      alert("Assignment submitted successfully!");
    } catch (error) {
      alert("Failed to submit assignment.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '1rem', borderLeft: '4px solid #667eea' }}>
      <h4>{assignment.title}</h4>
      <p><strong>Due Date:</strong> {assignment.due_date}</p>
      <p>{assignment.question}</p>
      
      <hr style={{ margin: '1rem 0' }} />

      <div>
        <h5>Your Submission</h5>
        {submissionStatus ? (
          <div>
            <p><strong>Status:</strong> {submissionStatus.marks ? `Graded` : 'Submitted'}</p>
            <p><strong>Submitted File:</strong> {submissionStatus.file_url.split('/').pop()}</p>
            {submissionStatus.marks && <p className="stat-number">Marks: {submissionStatus.marks}</p>}
          </div>
        ) : (
          <p><strong>Status:</strong> Not Submitted</p>
        )}
        
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label htmlFor={`file-${assignment.id}`}>
              {submissionStatus ? 'Upload a new version:' : 'Upload your work:'}
            </label>
            <input type="file" id={`file-${assignment.id}`} onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-small btn-success" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmission;