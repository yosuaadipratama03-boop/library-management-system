import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/register', data),
    login: (data) => api.post('/login', data),
    logout: () => api.post('/logout'),
    me: () => api.get('/me'),
};

// Books API
export const bookAPI = {
    getAll: () => api.get('/books'),
    getOne: (id) => api.get(`/books/${id}`),
    create: (data) => api.post('/books', data),
    update: (id, data) => api.put(`/books/${id}`, data),
    delete: (id) => api.delete(`/books/${id}`),
};

// Borrowings API
export const borrowingAPI = {
    getAll: (params) => api.get('/borrowings', { params }),
    getOne: (id) => api.get(`/borrowings/${id}`),
    create: (data) => api.post('/borrowings', data),
    update: (id, data) => api.put(`/borrowings/${id}`, data),
    delete: (id) => api.delete(`/borrowings/${id}`),
    returnBook: (id) => api.post(`/borrowings/${id}/return`),
};

// Dashboard API
export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats'),
};

export default api;
