import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('userFirstName');
            localStorage.removeItem('userLastName');
            localStorage.removeItem('userEmail');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getCurrentUser: () => api.get('/auth/me'),
};

// Admin API
export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getUsers: (params = {}) => api.get('/admin/users', { params }),
    updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
    getCourses: () => api.get('/admin/courses'),
    createCourse: (courseData) => api.post('/admin/courses', courseData),
    updateCourse: (id, courseData) => api.put(`/admin/courses/${id}`, courseData),
    deleteCourse: (id) => api.delete(`/admin/courses/${id}`),
    createModule: (courseId, moduleData) => api.post(`/admin/courses/${courseId}/modules`, moduleData),
    createQuiz: (courseId, quizData) => api.post(`/admin/courses/${courseId}/quiz`, quizData),
    checkAdmin: () => api.get('/admin/check'),
};

// Instructor API
export const instructorAPI = {
    getCourses: () => api.get('/instructor/courses'),
};

// Courses API
export const coursesAPI = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
};

// User API
export const userAPI = {
    getProgress: () => api.get('/user/progress'),
    updateProgress: (progressData) => api.post('/user/progress', progressData),
    getCertificates: () => api.get('/user/certificates'),
    getDashboard: () => api.get('/dashboard'),
};

// Quiz API
export const quizAPI = {
    getByCourse: (courseId) => api.get(`/courses/${courseId}/quiz`),
    submitAttempt: (attemptData) => api.post('/quiz/attempt', attemptData),
};

// Case Studies API
export const caseStudiesAPI = {
    getAll: (category = 'all') => api.get(`/case-studies?category=${category}`),
};

// Tools API
export const toolsAPI = {
    getAll: () => api.get('/tools'),
};

export default api;