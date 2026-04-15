import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ReactApp, UserAccount } from "@/types/admin/types"; 

// =========================
// 🔹 CONFIG
// =========================
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// =========================
// 🔹 AXIOS INSTANCE
// =========================
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// 🔹 TOKEN HANDLING (JWT)
// =========================
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// 🔹 ERROR HANDLER
// =========================
const handleError = (error: AxiosError): never => {
  const message =
    (error.response?.data as any)?.detail ||
    error.message ||
    "Request failed";

  throw new Error(message);
};

// =========================
// 🔹 REACT APPS API (GET ONLY)
// =========================
export const AppAPI = {
  getAll: async (): Promise<ReactApp[]> => {
    try {
      const res = await api.get<ReactApp[]>("/api/apps/");
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return [];
  },

  getOne: async (id: number): Promise<ReactApp> => {
    try {
      const res = await api.get<ReactApp>(`/api/apps/${id}/`);
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return {} as ReactApp;
  },
};

// =========================
// 🔹 USER API (GET ONLY)
// =========================
export const UserAPI = {
  getAll: async (): Promise<UserAccount[]> => {
    try {
      const res = await api.get<UserAccount[]>("/api/admin/users/");
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return [];
  },

  getOne: async (id: number): Promise<UserAccount> => {
    try {
      const res = await api.get<UserAccount>(`/api/admin/users/${id}/`);
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return {} as UserAccount;
  },
};