import axios from "axios";

const request = axios.create({
  timeout: 5000,
  baseURL: "http://175.178.234.47/api",
});

request.interceptors.request.use((config) => {
  return config;
});

export default request;
