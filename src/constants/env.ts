const ENV = {
  baseURL: String(import.meta.env.VITE_API_PORT),
  googleLoginBaseURL: String(import.meta.env.VITE_API_GOOGLE_LOGIN_PORT),
};
export default ENV;
