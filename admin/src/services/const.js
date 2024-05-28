export const API = import.meta.env.VITE_API;

const API_PATH = `${API}/api`;
export const API_USER_REGISTER = `${API_PATH}/auth/registerOTP`;
export const API_USER_LOGIN = `${API_PATH}/auth/login`;
export const API_USER_FORGOT_PASSWORD = `${API_PATH}/auth/forgotpassword`;
export const API_USER_CONFIRM_OTP = `${API_PATH}/auth/resetPassword`;
export const API_USER_VERIFY_EMAIL = `${API_PATH}/auth/confirmOtpRegisted`;
