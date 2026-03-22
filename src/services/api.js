import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - token artık cookie'de taşınıyor, header'a eklemeye gerek yok.
api.interceptors.request.use(
    (config) => {
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
            // Yetkisiz erişim - login'e yönlendir
            localStorage.removeItem('isAuthenticated');
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

export const firmaService = {
    getAll: () => api.get('Firma'),
    getById: (id) => api.get(`Firma/${id}`),
    create: (data) => api.post('Firma', data),
    update: (id, data) => api.put(`Firma/${id}`, data),
    delete: (id) => api.delete(`Firma/${id}`),
};

export default api;
