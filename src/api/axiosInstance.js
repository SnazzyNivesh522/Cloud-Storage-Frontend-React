
import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL+'/api',
  // baseURL: 'http://localhost:8000/api', // Replace with your backend URL
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Adjust based on your auth implementation
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Axios Request:');
    console.log('URL:', config.baseURL + config.url); // Full URL
    console.log('Method:', config.method); // HTTP method
    console.log('Headers:', JSON.stringify(config.headers, null, 2)); // Request headers
    console.log('Data:', JSON.stringify(config.data, null, 2)); // Request body (for POST/PUT)
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;