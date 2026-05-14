"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import api from "@/app/lib/general/api";



// Module-level lock — survives React StrictMode's double useEffect invocation.
let globalInitPromise: Promise<boolean> | null = null;

const REFRESH_COOLDOWN_MS = 30 * 1000; // 30 seconds — prevents sequential double-rotation

type AuthContextType = {
  access: string | null;
  user: any | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: any) => Promise<any>;
  refresh: () => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (uid: string, token: string, newPassword: string, confirmPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const initRefreshDone = useRef(false);
  const refreshInFlight = useRef<Promise<boolean> | null>(null);
  const lastRefreshTime = useRef<number>(0);

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
        if (err.response?.status === 429) {
          return Promise.reject(err);
        }

        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;

          // Block until the init refresh has fully settled.
          if (!initRefreshDone.current) {
            await new Promise<void>((resolve) => {
              const interval = setInterval(() => {
                if (initRefreshDone.current) {
                  clearInterval(interval);
                  resolve();
                }
              }, 50);
            });
          }

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

  /* --------------------- REFRESH (with dedup lock + cooldown) --------------------- */
  async function refresh(): Promise<boolean> {
    // If a refresh completed recently, return cached result without hitting the server.
    // Prevents sequential calls from rotating an already-rotated token.
    const now = Date.now();
    if (now - lastRefreshTime.current < REFRESH_COOLDOWN_MS) {
      return !!(globalThis as any)._access;
    }

    // If a refresh is already in flight, reuse the same promise (concurrent dedup).
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
        lastRefreshTime.current = Date.now(); // stamp on success only
        return true;
      } catch {
        syncAccess(null);
        setUser(null);
        return false;
      } finally {
        setLoading(false);
        refreshInFlight.current = null;
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
      lastRefreshTime.current = Date.now(); // login counts as a fresh token
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
  async function requestPasswordReset(email: string) {
  await api.post("/api/auth/password-reset/", { email });
}

async function confirmPasswordReset(
  uid: string,
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  await api.post("/api/auth/password-reset/confirm/", {
    uid,
    token,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
}

  /* --------------------- LOGOUT --------------------- */
  async function logout() {
    await api.post("/api/logout/");
    syncAccess(null);
    setUser(null);
    lastRefreshTime.current = 0; // reset so next login can refresh immediately
    globalInitPromise = null;
  }

  /* --------------------- INIT --------------------- */
  useEffect(() => {
    if (globalInitPromise) {
      globalInitPromise.finally(() => {
        initRefreshDone.current = true;
        const token = (globalThis as any)._access;
        if (token) setAccess(token);
      });
      return;
    }

    globalInitPromise = refresh();
    globalInitPromise.finally(() => {
      initRefreshDone.current = true;
    });
  }, []);

  /* --------------------- ACTIVITY REFRESH --------------------- */
  // Listeners are registered AFTER init completes so that a focus/click
  // during page load cannot trigger a second token rotation.
  useEffect(() => {
    let lastRefresh = Date.now();
    let cleanup: (() => void) | null = null;

    globalInitPromise?.then(() => {
      lastRefresh = Date.now();

      const handleActivity = async () => {
        const now = Date.now();
        if (now - lastRefresh > 10 * 60 * 1000) {
          lastRefresh = now;
          await refresh();
        }
      };

      window.addEventListener("click", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("focus", handleActivity);

      cleanup = () => {
        window.removeEventListener("click", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("focus", handleActivity);
      };
    });

    return () => cleanup?.();
  }, []);

  return (
    <AuthContext.Provider
      value={{ access, user, loading, isLoggedIn: !!user, login, logout, register, refresh, requestPasswordReset, confirmPasswordReset }}
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