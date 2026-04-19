import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ReactApp, SystemSettings, UserAccount, UserStats } from "@/types/admin/types";

// =========================
// 🔹 CONFIG
// =========================
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// =========================
// 🔹 AXIOS INSTANCE
// =========================
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ IMPORTANT for cookies
});

// =========================
// 🔹 REQUEST INTERCEPTOR (ACCESS TOKEN)
// =========================
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = (globalThis as any)._access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// 🔹 AUTO REFRESH LOGIC
// =========================
let isRefreshing = false;
let queue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  queue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // 🔥 HANDLE 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${API_URL}/api/auth/refresh/`,
          {},
          { withCredentials: true }
        );

        const newAccess = res.data?.access;

        if (!newAccess) throw new Error("No access token returned");

        // ✅ store new access
        (globalThis as any)._access = newAccess;

        processQueue(null, newAccess);

        // ✅ retry original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        (globalThis as any)._access = null;

        // 🔥 HARD LOGOUT
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

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
// 🔹 REACT APPS API
// =========================
export const AppAPI = {
  getAll: async (): Promise<ReactApp[]> => {
    try {
      const res = await api.get("/api/apps/");
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return [];
  },

  getOne: async (id: number): Promise<ReactApp> => {
    try {
      const res = await api.get(`/api/apps/${id}/`);
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return {} as ReactApp;
  },
};

// =========================
// 🔹 USER API
// =========================
export const UserAPI = {
  getAll: async (): Promise<UserAccount[]> => {
    try {
      const res = await api.get("/api/admin/users/");
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return [];
  },

  getOne: async (id: number): Promise<UserAccount> => {
    try {
      const res = await api.get(`/api/admin/users/${id}/`);
      return res.data;
    } catch (error: any) {
      handleError(error);
    }
    return {} as UserAccount;
  },
};

export const StatsAPI = {
  getUserStats: async (): Promise<UserStats> => {
    const res = await fetch("/api/users/stats/");
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  },
};



export const SettingsAPI = {
  getSettings: async (appId: string): Promise<SystemSettings> => {
    const res = await fetch(`/api/system/settings/?app_id=${appId}`);

    if (!res.ok) {
      throw new Error("Failed to load system settings");
    }

    return res.json();
  },
};