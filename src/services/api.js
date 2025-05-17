
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://right-zorana-mephisto-0553475f.koyeb.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hata yakalama için interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
