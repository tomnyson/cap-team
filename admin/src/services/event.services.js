import axios from 'axios';
const API  = import.meta.env.VITE_API

const API_PATH = `${API}/api`
const eventServices = {
    getAllByEmail: async ({ email }) => {
        try {
            const response = await axios.get(`${API_PATH}/getAllEventByEmail?email=${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
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
    create: async ({ data }) => {
        try {
            const response = await axios.create(`${API_PATH}/createEvent`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }, data);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.data;
            // set info of current user
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    },
    update: async ({ data }) => {
        try {
            const response = await axios.create(`${API_PATH}/createEvent`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            }, data);
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.data;
            // set info of current user
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    },
};

export default eventServices;
