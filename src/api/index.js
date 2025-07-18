import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const apiClient = axios.create({
    baseURL: 'http://94.74.86.174:8080/api',
    headers: {
    'Content-Type': 'application/json',
},
});

apiClient.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        const token = authStore.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    register: (data) => apiClient.post('/register', data),
    login: (credentials) => apiClient.post('/login', credentials),

    getChecklists: () => apiClient.get('/checklist'),
    createChecklist: (data) => apiClient.post('/checklist', data),
    deleteChecklist: (checklistId) => apiClient.delete(`/checklist/${checklistId}`),

    getChecklistItems: (checklistId) => apiClient.get(`/checklist/${checklistId}/item`),
    createChecklistItem: (checklistId, data) => apiClient.post(`/checklist/${checklistId}/item`, data),
    updateItemStatus: (checklistId, itemId) => apiClient.put(`/checklist/${checklistId}/item/${itemId}`),
    renameItem: (checklistId, itemId, data) => apiClient.put(`/checklist/${checklistId}/item/rename/${itemId}`, data),
    deleteChecklistItem: (checklistId, itemId) => apiClient.delete(`/checklist/${checklistId}/item/${itemId}`),
};