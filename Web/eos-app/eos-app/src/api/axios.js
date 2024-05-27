const { default: axios } = require("axios");

export default axios.create({
  baseURL: "http://localhost:3344/api/",
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "no-cache",
  },
});
