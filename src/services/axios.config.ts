import axios from 'axios';
const instance = axios.create({ baseURL: String(import.meta.env.VITE_API_PORT) });

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // const [cookies] = useCookies<string, { token?: string }>(['token']);
    // config.headers.Authorization = cookies.token;
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
