import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_AUTH_TOKEN ?? "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const GET = axiosInstance.get;
const POST = axiosInstance.post;
const PUT = axiosInstance.put;
const DELETE = axiosInstance.delete;

export { axiosInstance, GET, POST, PUT, DELETE };
