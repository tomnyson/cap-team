// apis/event.js
import handleRequest from './request';

// API endpoints
const createEvent = (data) => handleRequest('post', '/api/createEvent', data);
const chageStatus = (data) => handleRequest('put', '/api/chageStatus', data);
const getAllEventByEmail = (email) =>
  handleRequest('get', `/api/getAllEventByEmail?email=${email}`);
const updateEvent = (data) => handleRequest('post', '/api/updateEvent', data);

export { createEvent, chageStatus, updateEvent, getAllEventByEmail };
