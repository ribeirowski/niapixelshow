import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
});

api.defaults.timeout = 10000;

export default api;