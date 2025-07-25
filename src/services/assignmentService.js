import { mockAssignments, mockSubmissions, mockUsers } from './_mockData';

// --- For Teachers ---

// Gets a single assignment by its ID
export const getAssignmentById = (assignmentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const assignment = mockAssignments.find(a => a.id === assignmentId);
            resolve(assignment);
        }, 500);
    });
};

// Create a new assignment
export const createAssignment = (assignmentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAssignment = {
        id: `assign${Date.now()}`,
        ...assignmentData,
      };
      mockAssignments.push(newAssignment);
      resolve(newAssignment);
    }, 500);
  });
};

// Get all submissions for an assignment, now with student names
export const getSubmissionsForAssignment = (assignmentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const submissions = mockSubmissions.filter(s => s.assignment_id === assignmentId);
            // Enrich submission data with student's name
            const enrichedSubmissions = submissions.map(sub => {
                const student = mockUsers.find(u => u.id === sub.student_id);
                return {
                    ...sub,
                    student_name: student ? student.name : 'Unknown Student'
                };
            });
            resolve(enrichedSubmissions);
        }, 500);
    });
};

// Grade a submission
export const gradeSubmission = (submissionId, marks) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const submission = mockSubmissions.find(s => s.id === submissionId);
            if (submission) {
                // Make sure marks are stored as a number
                submission.marks = Number(marks);
            }
            resolve(submission);
        }, 500);
    });
};

// --- For Students ---

// Get all assignments for a specific course
export const getAssignmentsByCourse = (courseId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const assignments = mockAssignments.filter(a => a.course_id === courseId);
            resolve(assignments);
        }, 500);
    });
};

// Submit an assignment
export const submitAssignment = (submissionData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newSubmission = {
                id: `sub${Date.now()}`,
                submitted_at: new Date().toISOString().split('T')[0],
                marks: null,
                ...submissionData
            };
            const existingIndex = mockSubmissions.findIndex(s => s.assignment_id === submissionData.assignment_id && s.student_id === submissionData.student_id);
            if(existingIndex !== -1){
                mockSubmissions.splice(existingIndex, 1, newSubmission);
            } else {
                mockSubmissions.push(newSubmission);
            }
            resolve(newSubmission);
        }, 500);
    });
};