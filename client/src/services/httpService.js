import axios from "axios";
import notify from "./notifyService";

// const instance = axios.create({
// 	baseURL: 'localhost:3000/api',
// });

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) {
    notify.errorNotify(error);
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
