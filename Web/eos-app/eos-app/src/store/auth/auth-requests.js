const { default: axios } = require("api/axios");

export const requestAuthRegister = (data) => {
  return axios.post("/users/register", {
    ...data,
  });
};
export const requestAuthLogin = (data) => {
  return axios.post("/users/login", {
    ...data,
  });
};
export const requestAuthFetchMe = (token) => {
  console.log("🚀 ~ requestAuthFetchMe ~ token:", token);
  if (!token) return;
  return axios.post(
    "/users/details",
    {},
    {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const requestAuthRefreshToken = (token) => {
  if (!token) return;
  return axios.post("/token", {
    "Content-Type": "Application/json",
    refreshToken: token,
  });
};
