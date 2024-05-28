import axios from 'axios';
import {
  API_USER_REGISTER,
  API_USER_LOGIN,
  API_USER_FORGOT_PASSWORD,
  API_USER_CONFIRM_OTP,
  API_USER_VERIFY_EMAIL,
} from './const.js';

const authServices = {
  login: async ({ email, password }) => {
    try {
      const response = await axios.post(API_USER_LOGIN, { email, password });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const { accessToken, role } = response.data;
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('currentUser', JSON.stringify(role));
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('authToken') ? Promise.resolve() : Promise.reject();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('authToken');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
  register: async (payload) => {
    try {
      const response = await axios.post(API_USER_REGISTER, payload);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  ForgotPassword: async (payload) => {
    try {
      const response = await axios.post(API_USER_FORGOT_PASSWORD, payload);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      const { message } = response.data;
      return message;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  confirmOTP: async (payload) => {
    try {
      const response = await axios.post(API_USER_CONFIRM_OTP, payload);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      const { message } = response.data;
      return message;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
  verifyEmail: async (payload) => {
    try {
      const response = await axios.post(API_USER_VERIFY_EMAIL, payload);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      const { message } = response.data;
      return message;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  },
};

export default authServices;
