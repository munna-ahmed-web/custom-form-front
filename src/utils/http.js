import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

// Axios request interceptor to attach token
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
