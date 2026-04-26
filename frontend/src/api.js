import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:8080/api'
      : '/api')
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

export const getProperties = () => API.get('/properties');
export const getProperty = (id) => API.get(`/properties/${id}`);
export const createProperty = (data) => API.post('/properties', data);
export const updateProperty = (id, data) => API.put(`/properties/${id}`, data);
export const deleteProperty = (id) => API.delete(`/properties/${id}`);

export default API;
