import handleRequest from './request';

// API endpoints
const createTicket = (data) => handleRequest('post', '/api/createTicket', data);
const disableTicket = (data) => handleRequest('post', '/api/disableTicket', data);
const getAllTicket = () => handleRequest('get', '/api/getAllTicket');
const getTicketByUserId = (userId) =>
  handleRequest('get', `/api/getTicketByUserId?userId=${userId}`);
const getTicketDetails = (ticketId) =>
  handleRequest('get', `/api/getTicketDetails?ticketId=${ticketId}`);
const getTicketPayment = (ticketId) =>
  handleRequest('get', `/api/getTicketPayment?ticketId=${ticketId}`);
const updateTicket = (data) => handleRequest('post', '/api/updateTicket', data);

export {
  createTicket,
  getAllTicket,
  updateTicket,
  disableTicket,
  getTicketDetails,
  getTicketPayment,
  getTicketByUserId,
};
