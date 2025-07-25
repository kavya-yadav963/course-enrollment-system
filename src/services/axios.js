// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   },
//   timeout: 10000
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('user');
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;