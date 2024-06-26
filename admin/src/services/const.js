export const API = import.meta.env.VITE_API;

const API_PATH = `${API}/api`


export const API_CREATE_TICKET = `${API_PATH}/createTicket`;
export const API_DISABLE_TICKET = `${API_PATH}/disableTicket`;
export const API_GET_ALL_TICKET = `${API_PATH}/getAllTicket`;
export const API_GET_TICKET_BY_USER_ID = `${API_PATH}/getTicketByUserId`;
export const API_GET_TICKET_DETAILS = '/getTicketDetails';
export const API_GET_TICKET_PAYMENT = '/getTicketPayment';
export const API_UPDATE_TICKET = `${API_PATH}/updateTicket`;
export const API_GET_EVENT = `${API_PATH}/getAllEventByEmail`;

export const API_USER_REGISTER = `${API_PATH}/auth/registerOTP`;
export const API_USER_LOGIN = `${API_PATH}/auth/login`;
export const API_USER_FORGOT_PASSWORD = `${API_PATH}/auth/forgotpassword`;
export const API_USER_CONFIRM_OTP = `${API_PATH}/auth/resetPassword`;
export const API_USER_VERIFY_EMAIL = `${API_PATH}/auth/confirmOtpRegisted`;
export const API_USER_INFO_BY_EMAIL = `${API}/api/getUserbyEmail`;
export const API_USER_REFRESH_TOKEN = '/api/auth/refresh-token';

export const API_GETALL_ATTENDANCE_BY_EVENTID = `${API_PATH}/getAllAttendanceByEventId`;


export const API_GET_USER_GROUP = `${API_PATH}/getAllUserByGroupId`
export const API_GET_GROUP_BY_USER = `${API_PATH}/getAllGroupByUserId`
export const API_CREATE_GROUP = `${API_PATH}/createGroup`
export const API_DELETE_GROUP = `${API_PATH}/deleteGroup`
export const API_ADD_USER_GROUP = `${API_PATH}/addMember`