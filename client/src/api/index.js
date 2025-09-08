
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // ✅ always capital A
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
