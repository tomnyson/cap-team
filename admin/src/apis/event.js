// apis/event.js
import handleRequest from './request';

// API endpoints
const createEvent = (data) => handleRequest('post', '/createEvent', data);
const chageStatus = (data) => handleRequest('put', '/chageStatus', data);
const getAllEventByEmail = (email) =>
  handleRequest('get', `/getAllEventByEmail?email=${email}`);
const updateEvent = (data) => handleRequest('post', '/updateEvent', data);

export { createEvent, chageStatus, updateEvent, getAllEventByEmail };
