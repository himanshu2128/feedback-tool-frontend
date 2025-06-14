// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://feedback-tool-backen.onrender.com/api', // ✅ your Render backend URL
  withCredentials: true, // optional
});

export default api;
