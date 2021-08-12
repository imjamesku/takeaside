import axios, { AxiosRequestConfig } from "axios";
import parseJSON from "./parseJSON";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 6000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return config;
  }
  const user = parseJSON(userStr);
  if (user) {
    const token = user.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
