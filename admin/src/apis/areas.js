import handleRequest from './request';

// API endpoints
const getAllArea = (event_id) => handleRequest('get', `/getAllArea?event_id=${event_id}`);
const createArea = (data) => handleRequest('post', '/createArea', data);
const updateArea = (idArea, data) => handleRequest('patch', `/updateArea/${idArea}`, data);
const getAreaById = (idArea) => handleRequest('get', `/getAreaById/${idArea}`);
const deleteArea = (idArea) => handleRequest('delete', `/deleteArea/${idArea}`);

export { getAllArea, getAreaById, createArea, updateArea, deleteArea };
