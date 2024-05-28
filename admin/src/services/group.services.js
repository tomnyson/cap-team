import axios from 'axios';
import api from './axios.js';

const API_PATH = import.meta.env.VITE_API;

const groupServices = {
  createGroup: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(`${API_PATH}/createGroup`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  updateGroup: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.put(`${API_PATH}/updateGroup`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  deleteGroup: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.delete(`${API_PATH}/deleteGroup`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  getAllGroupByUserId: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${API_PATH}/getAllGroupByUserId`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          user_id: data.user_id,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  addMember: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(`${API_PATH}/addMember`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  deleteMember: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.delete(`${API_PATH}/deleteMember`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  getAllUserByGroupId: async (data) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${API_PATH}/getAllUserByGroupId`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          group_id: data.group_id,
        },
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default groupServices;
