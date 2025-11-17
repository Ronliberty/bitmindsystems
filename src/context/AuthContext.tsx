"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContextType = {
  access: string | null;
  user: any | null;
  loading: boolean;
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

  // ---------------- Constants ----------------
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const APP_UUID = process.env.NEXT_PUBLIC_APP_UUID!;


  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // ---------------- LOGIN ----------------
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login/", {
        email,
        password,
        react_app: APP_UUID,
      });

      setAccess(res.data.access);
      setUser(res.data.user ?? null);
      localStorage.setItem("access_token", res.data.access); // persist access
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      throw err.response?.data || err;
    } finally {
      setLoading(false);
    }
  }

  // ---------------- REGISTER ----------------
  async function register(payload: any) {
    try {
      const res = await api.post("/api/signup/", {
        ...payload,
        react_app: APP_UUID,
      });

      setUser(res.data.user ?? null);
      return res.data;
    } catch (err: any) {
      console.error("Register error:", err.response?.data || err.message);
      throw err.response?.data || err;
    }
  }

  // ---------------- REFRESH ----------------
  async function refresh(): Promise<boolean> {
    try {
      const res = await api.post("/api/auth/refresh/");
      setAccess(res.data.access);
      setUser(res.data.user ?? null);
      localStorage.setItem("access_token", res.data.access);
      return true;
    } catch (err) {
      setAccess(null);
      setUser(null);
      localStorage.removeItem("access_token");
      return false;
    }
  }
async function loadUser() {
  try {
    const res = await api.get("/api/user/me/");
    setUser(res.data);
  } catch (err) {
    setUser(null);
  }
}

// Call after login or refresh

  // ---------------- LOGOUT ----------------
  async function logout() {
    try {
      await api.post("/api/logout/");
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setAccess(null);
      setUser(null);
      localStorage.removeItem("access_token");
    }
  }

  // ---------------- INIT ----------------
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setAccess(storedToken);
      }

      await refresh(); // try to refresh using cookie
      setLoading(false);
    };
    init();
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ access, user, loading, login, logout, register, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to consume AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
