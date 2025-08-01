import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth Service ---
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (role, details) => api.post(`/auth/register/${role}`, details);

// --- Admin Service ---
// Course Management
export const adminCreateCourse = (courseData) => api.post('/admin/courses', courseData);
export const adminUpdateCourse = (id, courseData) => api.put(`/admin/courses/${id}`, courseData);
export const adminDeleteCourse = (id) => api.delete(`/admin/courses/${id}`);
export const adminAssignTeacher = (teacherId, courseId) => api.put(`/admin/teachers/${teacherId}/assign/${courseId}`);
export const adminAddStudentToCourse = (courseId, studentId) => api.put(`/admin/courses/${courseId}/addStudent/${studentId}`);
export const adminRemoveStudentFromCourse = (courseId, studentId) => api.put(`/admin/courses/${courseId}/removeStudent/${studentId}`);

// Teacher Management
export const adminCreateTeacher = (teacherData) => api.post('/admin/teachers', teacherData); // Assumes registration is separate
export const adminUpdateTeacher = (id, teacherData) => api.put(`/admin/teachers/${id}`, teacherData);
export const adminDeleteTeacher = (id) => api.delete(`/admin/teachers/${id}`);

// Student Management
export const adminCreateStudent = (studentData) => api.post('/admin/students', studentData); // Assumes registration is separate
export const adminUpdateStudent = (id, studentData) => api.put(`/admin/students/${id}`, studentData);
export const adminDeleteStudent = (id) => api.delete(`/admin/students/${id}`);


// --- Teacher Service ---
export const teacherAddStudent = (courseId, studentId, teacherId) => api.put(`/courses/${courseId}/addStudent/${studentId}/byTeacher/${teacherId}`);
export const teacherRemoveStudent = (courseId, studentId, teacherId) => api.put(`/courses/${courseId}/removeStudent/${studentId}/byTeacher/${teacherId}`);


// --- Public/Shared Service ---
export const getAllCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const getAllTeachers = () => api.get('/teachers');
export const getTeacherById = (id) => api.get(`/teachers/${id}`);
export const getAllStudents = () => api.get('/students');
export const getStudentById = (id) => api.get(`/students/${id}`);

export default api;


// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;