import axios from 'axios';
import 'dotenv/config';

const api = axios.create({
    baseURL: `http://localhost:${process.env.SERVER_PORT}`
});

export default api;