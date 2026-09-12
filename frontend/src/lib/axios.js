import axios from "axios";
import useAuthStore from "@/store/authSlice";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", withCredentials: true });
let refreshing = null;
api.interceptors.request.use((config) => { const token = useAuthStore.getState().accessToken; if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((response) => response, async (error) => {
  const original = error.config;
  if (error.response?.status !== 401 || original?._retry || original?.url?.includes("/auth/refresh") || original?.url?.includes("/auth/logout")) return Promise.reject(error);
  original._retry = true;
  try {
    refreshing ||= api.post("/auth/refresh");
    const { data } = await refreshing; refreshing = null;
    useAuthStore.getState().setAuth(data); original.headers.Authorization = `Bearer ${data.accessToken}`;
    return api(original);
  } catch (refreshError) { refreshing = null; useAuthStore.getState().clearUser(); if (typeof window !== "undefined") window.location.href = "/login-register"; return Promise.reject(refreshError); }
});
export default api;
