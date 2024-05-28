
import axios from 'axios';

import { API_GET_USER_GROUP, API_GET_GROUP_BY_USER, API_CREATE_GROUP,API_DELETE_GROUP } from './const.js';
// import api from './axios.js';

const groupServices = {
    getUserGroupById: async ({ group_id }) => {
        try {
            const response = await axios.get(`${API_GET_USER_GROUP}?group_id=${group_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.data;
            // set info of current user
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    },
    getGroupByUserId: async ({ user_id }) => {
        try {
            const response = await axios.get(`${API_GET_GROUP_BY_USER}?user_id=${user_id}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('authToken')
                }
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.data;
            // set info of current user
        } catch (error) {
            console.error(error);
            return []
        }
    },
    createGroup: async (payload) => {
        try {
            const response = await axios.post(`${API_CREATE_GROUP}`,payload,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('authToken')
                }
            });
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.data;
            // set info of current user
        } catch (error) {
            console.error(error);
            return []
        }
    },
    deleteGroup: async (payload) => {
        try {
          const response = await axios.delete(`${API_DELETE_GROUP}`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            },
            data: payload, // Include payload in the data property
          });
      
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
      
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
};

export default groupServices;


