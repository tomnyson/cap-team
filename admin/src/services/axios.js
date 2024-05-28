import axios from 'axios';
import { API, API_USER_REFRESH_TOKEN } from './const';

// Create an Axios instance
const api = axios.create({
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
  baseURL: API, // Ensure you have this in your .env file
  withCredentials: true, // To include cookies in requests
});

// Response interceptor for handling token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post(API_USER_REFRESH_TOKEN, {refreshToken: localStorage.get('authToken') || null});
        console.log('call fresh token')
        console.log(data);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
