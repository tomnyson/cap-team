// axiosConfig.js
import axios from 'axios';
// Create an Axios instance with custom configuration
const handleGetToken = () =>  localStorage.getItem('token');
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_ROOT, // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${handleGetToken()}`,
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    config => {
        // Modify the request configuration if needed
        config.headers.Authorization = `Bearer ${handleGetToken()}`; // Example custom header
        return config;
    },
    error =>
        // Handle request error
         Promise.reject(error)
    
);

// Response interceptor
apiClient.interceptors.response.use(
    response => 
        // Handle the response data
         response
    ,
    error => 
        // Handle response error
         Promise.reject(error)
    
);

const handleRequest = (method, url, data) => apiClient[method](url, data)
export default handleRequest;
