// This file simulates a database.
export const mockUsers = [
  { id: 'user01', name: 'Admin User', role: 'Admin', email: 'admin@test.com' },
  { id: 'user02', name: 'John Doe', role: 'Teacher', email: 'john.doe@test.com' },
  { id: 'user03', name: 'Jane Smith', role: 'Teacher', email: 'jane.smith@test.com' },
  { id: 'user04', name: 'Peter Jones', role: 'Student', email: 'peter.jones@test.com' },
  { id: 'user05', name: 'Mary Jane', role: 'Student', email: 'mary.jane@test.com' },
];

export const mockCourses = [
  { id: 'course01', course_name: 'Introduction to React', max_students: 30, teacher_id: 'user02' },
  { id: 'course02', course_name: 'Advanced CSS', max_students: 25, teacher_id: 'user03' },
  { id: 'course03', course_name: 'Node.js Fundamentals', max_students: 30, teacher_id: 'user02' },
];
//... add this new export
export const mockEnrollments = [
    { course_id: 'course01', student_id: 'user04' }, // Peter is in React
    { course_id: 'course01', student_id: 'user05' }, // Mary is in React
    { course_id: 'course03', student_id: 'user04' }, // Peter is also in Node.js
];
export const mockAssignments = [
    { 
        id: 'assign01', 
        course_id: 'course01', // For "Introduction to React"
        title: 'Component Lifecycle Essay', 
        question: 'Write a 500-word essay explaining the lifecycle of a React class component.',
        due_date: '2025-08-15',
    }
];

export const mockSubmissions = [
    {
        id: 'sub01',
        assignment_id: 'assign01',
        student_id: 'user04', // Peter Jones submitted
        file_url: '/path/to/peters_submission.pdf',
        submitted_at: '2025-08-14',
        marks: 88,
    }
];