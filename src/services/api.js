import axios from 'axios';

const api = axios.create({
    baseURL: '/', // Proxy handles the base URL
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

export const stokService = {
    getAll: () => api.get('/Stok'),
    create: (data) => api.post('/Stok', data),
    update: (id, data) => api.put(`/Stok/${id}`, data),
    delete: (id) => api.delete(`/Stok/${id}`),
};

export const fasonService = {
    getAll: () => api.get('/Fason'),
    getById: (id) => api.get(`/Fason/${id}`),
    getByCompany: (companyName) => api.get(`/Fason/companyName`, { params: { companyName } }),
    create: (data) => api.post('/Fason', data),
    update: (id, data) => api.put(`/Fason/id?id=${id}`, data), // Matching backend route: [HttpPut("id")]
    delete: (id) => api.delete(`/Fason/${id}`),
};

export default api;
