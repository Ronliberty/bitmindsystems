// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://bitlymindsystem.pythonanywhere.com",
  withCredentials: true, // for cookies/CSRF if needed
});

// Request interceptor: Auto-add auth token from global _access
api.interceptors.request.use((config) => {
  const token = (globalThis as any)._access; // Match your AuthContext storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// Response interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized: clear global token and redirect
      (globalThis as any)._access = null;
      window.location.href = "/auth/login"; // or use router
    } else if (error.response?.status >= 500) {
      console.error("Server error:", error);
      // Optional: global toast notification
    }
    return Promise.reject(error);
  }
);

export default api;