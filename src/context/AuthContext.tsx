

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

/* --------------------- AXIOS INTERCEPTOR FOR AUTH --------------------- */
axios.interceptors.request.use((config) => {
  const token = (globalThis as any)._access;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  function syncAccess(token: string | null) {
    (globalThis as any)._access = token; // store in memory only
    setAccess(token);
  }

  /* -------------------------- LOGIN -------------------------- */
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login/", {
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

  /* -------------------------- REGISTER ------------------------ */
  async function register(payload: any) {
    setLoading(true);
    try {
      const res = await axios.post("/api/signup/", {
        ...payload,
        react_app: process.env.NEXT_PUBLIC_APP_UUID,
      });

      syncAccess(res.data.access ?? null);
      setUser(res.data.user ?? null);

      return res.data;
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------- REFRESH ------------------------- */
  async function refresh(): Promise<boolean> {
    try {
      const res = await axios.post("/api/auth/refresh/");

      syncAccess(res.data.access ?? null);
      setUser(res.data.user ?? null);

      return true;
    } catch {
      syncAccess(null);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------- LOGOUT -------------------------- */
  async function logout() {
    await axios.post("/api/logout/");
    syncAccess(null);
    setUser(null);
  }

  /* ---- ON PAGE LOAD: try refreshing using HttpOnly cookie ---- */
  useEffect(() => {
    refresh();
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        access,
        user,
        loading,
        isLoggedIn,
        login,
        logout,
        register,
        refresh,
      }}
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
