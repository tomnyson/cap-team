import axios from 'axios';
import api from './axios.js';

const API_PATH = import.meta.env.VITE_API;

const groupServices = {
  createGroup: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(`${API_PATH}/createGroup`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    }
    catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  }
};

export default groupServices;