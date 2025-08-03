//import axios from 'axios';
//import { toast } from 'react-toastify';

//const API = axios.create({
//    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
//    headers: {
//        'Content-Type': 'application/json',
//    },
//});




import axios from 'axios';

const API_BASE_URL = 'https://localhost:7220/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',

    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ãÚÇáÌ ÇáÃÎØÇÁ
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;