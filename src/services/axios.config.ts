import axios from 'axios';
const instance = axios.create({ withCredentials: true });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    console.log('req:', `${config.baseURL}${config.url}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

interface Data {
  data: Record<string, string>;
}

instance.interceptors.response.use(
  function (response) {
    const data = response.data as Data;
    console.table(data.data);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
