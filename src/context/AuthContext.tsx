"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

type AuthContextType = {
  access: string | null;
  user: any | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: any) => Promise<any>;
  refresh: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const hasRefreshed = useRef(false);
  const refreshInFlight = useRef<Promise<boolean> | null>(null); // ← lock

  function syncAccess(token: string | null) {
    (globalThis as any)._access = token;
    setAccess(token);
  }

  /* --------------------- REQUEST INTERCEPTOR --------------------- */
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = (globalThis as any)._access;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
    return () => api.interceptors.request.eject(reqInterceptor);
  }, []);

  /* --------------------- RESPONSE INTERCEPTOR --------------------- */
  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const original = err.config;

        if (original?.url?.includes("/api/auth/refresh/")) {
          return Promise.reject(err);
        }

        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          const success = await refresh();
          if (success) {
            original.headers["Authorization"] = `Bearer ${(globalThis as any)._access}`;
            return api(original);
          }
        }

        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(resInterceptor);
  }, []);

  /* --------------------- REFRESH (with lock) --------------------- */
  async function refresh(): Promise<boolean> {
    // If a refresh is already in flight, reuse the same promise
    if (refreshInFlight.current) {
      return refreshInFlight.current;
    }

    refreshInFlight.current = (async () => {
      try {
        const res = await api.post("/api/auth/refresh/");
        const newAccess = res.data?.access;
        const newUser = res.data?.user;

        if (!newAccess) {
          syncAccess(null);
          setUser(null);
          return false;
        }

        syncAccess(newAccess);
        setUser(newUser ?? null);
        return true;
      } catch {
        syncAccess(null);
        setUser(null);
        return false;
      } finally {
        setLoading(false);
        refreshInFlight.current = null; // ← release lock
      }
    })();

    return refreshInFlight.current;
  }

  /* --------------------- LOGIN --------------------- */
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login/", {
        email,
        password,
        react_app: process.env.NEXT_PUBLIC_APP_UUID,
      });
      syncAccess(res.data.access ?? null);
      setUser(res.data.user ?? null);
    } finally {
      setLoading(false);
    }
  }

  /* --------------------- REGISTER --------------------- */
  async function register(payload: any) {
    setLoading(true);
    try {
      const endpoint = payload.invite ? "/api/register/" : "/api/signup/";
      const res = await api.post(endpoint, {
        ...payload,
        react_app: process.env.NEXT_PUBLIC_APP_UUID,
      });

      if (!payload.invite) {
        syncAccess(res.data.access ?? null);
        setUser(res.data.user ?? null);
      }

      return res.data;
    } finally {
      setLoading(false);
    }
  }

  /* --------------------- LOGOUT --------------------- */
  async function logout() {
    await api.post("/api/logout/");
    syncAccess(null);
    setUser(null);
  }

  /* --------------------- INIT --------------------- */
  useEffect(() => {
    if (!hasRefreshed.current) {
      hasRefreshed.current = true;
      refresh();
    }
  }, []);

  /* --------------------- ACTIVITY REFRESH (once, not twice) --------------------- */
  useEffect(() => {
    let lastRefresh = Date.now();

    const handleActivity = async () => {
      const now = Date.now();
      if (now - lastRefresh > 10 * 60 * 1000) {
        lastRefresh = now; // ← update BEFORE await to prevent double-fire
        await refresh();
      }
    };

    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("focus", handleActivity);

    return () => {
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("focus", handleActivity);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ access, user, loading, isLoggedIn: !!user, login, logout, register, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}