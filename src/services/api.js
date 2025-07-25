import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const login = (username, password, role) => {
  return api.post('/auth/login', {
    username,
    password,
    role
  });
};

export const getAllStudents = () => {
  return api.get('/student');
};


export const getStudents = getAllStudents;

export const createStudent = (studentData) => {
  return api.post('/student/create', studentData);
};

// Add alias for components expecting 'addStudent'
export const addStudent = createStudent;

export const getStudentById = (id) => {
  return api.get(`/student/${id}`);
};

export const updateStudent = (id, studentData) => {
  return api.put(`/student/${id}`, studentData);
};

export const deleteStudent = (id) => {
  return api.delete(`/student/${id}`);
};

export const getAllCourses = () => {
  return api.get('/courses');
};

export const getCourses = getAllCourses;

export const createCourse = (courseData) => {
  return api.post('/courses/create', courseData);
};

export const addCourse = createCourse;

export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};

export const addStudentToCourse = (courseId, studentId) => {
  return api.post(`/courses/${courseId}/students/${studentId}`);
};


export const enrollStudent = addStudentToCourse;

export const removeStudentFromCourse = (courseId, studentId) => {
  return api.delete(`/courses/${courseId}/students/${studentId}`);
};

export const unenrollStudent = removeStudentFromCourse;

export const getAllTeachers = () => {
  return api.get('/teachers');
};


export const getTeachers = getAllTeachers;

export const createTeacher = (teacherData) => {
  return api.post('/teachers/create', teacherData);
};

export const addTeacher = createTeacher;

export const getTeacherById = (id) => {
  return api.get(`/teachers/${id}`);
};

export const updateTeacher = (id, teacherData) => {
  return api.put(`/teachers/${id}`, teacherData);
};

export const deleteTeacher = (id) => {
  return api.delete(`/teachers/${id}`);
};

export const assignTeacher = (teacherId, courseId) => {

  return api.post(`/courses/${courseId}/teachers/${teacherId}`);
};

export default api;