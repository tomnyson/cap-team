import handleRequest from './request';

// API endpoints
const getAllArea = (event_id) => handleRequest('get', `/api/getAllArea?event_id=${event_id}`);
const createArea = (data) => handleRequest('post', '/api/createArea', data);
const updateArea = (idArea, data) => handleRequest('patch', `/api/updateArea/${idArea}`, data);
const getAreaById = (idArea) => handleRequest('get', `/api/getAreaById/${idArea}`);
const deleteArea = (idArea) => handleRequest('delete', `/api/deleteArea/${idArea}`);

export { getAllArea, getAreaById, createArea, updateArea, deleteArea };
