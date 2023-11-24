import axios from 'axios';
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
