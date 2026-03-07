import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - her istekte token'ı ekle
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - 401 hatalarını yakala
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token geçersiz veya yok - login'e yönlendir
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const stokService = {
    getAll: () => api.get('Stok'),
    create: (data) => api.post('Stok', data),
    update: (id, data) => api.put(`Stok/${id}`, data),
    delete: (id) => api.delete(`Stok/${id}`),
};

export const fasonService = {
    getAll: () => api.get('Fason'),
    getById: (id) => api.get(`Fason/${id}`),
    getByCompany: (companyName) => api.get(`Fason/company/${companyName}`),
    create: (data) => api.post('Fason', data),
    update: (id, data) => api.put(`Fason/${id}`, data),
    delete: (id) => api.delete(`Fason/${id}`),
};

export default api;
