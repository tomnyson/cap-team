import axios from 'axios';
import {
  API_CREATE_TICKET,
  API_DISABLE_TICKET,
  API_GET_ALL_TICKET,
  API_GET_TICKET_BY_USER_ID,
  API_GET_TICKET_DETAILS,
  API_GET_TICKET_PAYMENT,
  API_UPDATE_TICKET,
  API_GET_EVENT,
} from './const.js';

const handleResponse = (response) => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }
  return response.data;
};

const ticketServices = {
  createTicket: async (data) => {
    try {
      const response = await axios.post(API_CREATE_TICKET, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  disableTicket: async (data) => {
    try {
      const response = await axios.post(API_DISABLE_TICKET, data);
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getAllTicket: async () => {
    try {
      const response = await axios.get(API_GET_ALL_TICKET, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getAllEventByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_GET_EVENT}?email=${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getTicketByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_GET_TICKET_BY_USER_ID}?userId=${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getTicketDetails: async (ticketId) => {
    try {
      const response = await axios.get(`${API_GET_TICKET_DETAILS}?ticketId=${ticketId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  getTicketPayment: async (ticketId) => {
    try {
      const response = await axios.get(`${API_GET_TICKET_PAYMENT}?ticketId=${ticketId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },

  updateTicket: async (data) => {
    try {
      const response = await axios.post(API_UPDATE_TICKET, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default ticketServices;
