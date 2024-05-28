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
            const response = await axios.post(`${API_PATH}/updateEvent`, data, {
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
    updateStatus: async ({ data }) => {
        try {
            const response = await axios.put(`${API_PATH}/chageStatus`, data, {
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
    createQR: async ({ data }) => {
        try {
            const response = await axios.post(`${API_PATH}/createQR`, data, {
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
    getQRbyEventId: async ({ event_id }) => {
        try {
            const response = await axios.get(`${API_PATH}/getAllQRByEventId?event_id=${event_id}`, {
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
    getAreaByEventId: async ({ event_id }) => {
        try {
            const response = await axios.get(`${API_PATH}/getAllArea?event_id=${event_id}`, {
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
    // delete: async ({ event_id }) => {
    //     try {
    //         const response = await axios.get(`${API_PATH}/getAllArea?event_id=${event_id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    //             },
    //         });
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(response.statusText);
    //         }
    //         return response.data;
    //         // set info of current user
    //     } catch (error) {
    //         throw new Error(error.response ? error.response.data.message : error.message);
    //     }
    // },
};

export default eventServices;
