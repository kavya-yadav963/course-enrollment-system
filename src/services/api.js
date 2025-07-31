import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the auth token to every secure request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth ---
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (role, userData) => api.post(`/auth/register/${role}`, userData);


// --- Course Management (Admin) ---
export const createCourse = (courseData) => api.post('/admin/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/admin/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);

// --- General Course Access ---
export const getAllCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);

// --- Teacher Management (Admin) ---
export const getAllTeachers = () => api.get('/teachers');
// Note: User creation now goes through /auth/register
// export const createTeacher = (teacherData) => api.post('/admin/teachers', teacherData);
export const deleteTeacher = (id) => api.delete(`/admin/teachers/${id}`);

// --- Student Management (Admin) ---
export const getAllStudents = () => api.get('/students');
// Note: User creation now goes through /auth/register
// export const createStudent = (studentData) => api.post('/admin/students', studentData);
export const deleteStudent = (id) => api.delete(`/admin/students/${id}`);

// --- Enrollment Management ---
export const adminAddStudentToCourse = (courseId, studentId) => api.put(`/admin/courses/${courseId}/addStudent/${studentId}`);
export const adminRemoveStudentFromCourse = (courseId, studentId) => api.put(`/admin/courses/${courseId}/removeStudent/${studentId}`);




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