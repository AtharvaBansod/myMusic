import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
import { refreshToken } from './auth'; 

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken  = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - update to handle token expiration better
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Handle token expired error
      if (error.response?.status === 403 && 
          error.response?.data?.code === 'TOKEN_EXPIRED' &&
          !originalRequest._retry) {
        
        originalRequest._retry = true;
        
        try {
          const newAccessToken = await refreshToken();
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Don't logout immediately - the user might still be able to continue
          console.error('Refresh token failed:', refreshError);
          return Promise.reject(error);
        }
      }
      
      return Promise.reject(error);
    }
  );

export default api;