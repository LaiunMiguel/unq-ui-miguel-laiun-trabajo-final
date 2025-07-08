import axios from 'axios';

const api_dir = "https://word-api-hmlg.vercel.app/api"

const instance = axios.create({
  baseURL: api_dir
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("JWT");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default instance;
