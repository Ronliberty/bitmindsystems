

// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";

// type AuthContextType = {
//   access: string | null;
//   user: any | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (payload: any) => Promise<any>;
//   refresh: () => Promise<boolean>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [access, setAccess] = useState<string | null>(null);
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   // ------------------ LOGIN ------------------
//   async function login(email: string, password: string) {
//     setLoading(true);
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email,
//           password,
//           react_app: process.env.NEXT_PUBLIC_APP_UUID,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw data;

//       setAccess(data.access);
//       setUser(data.user ?? null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ------------------ REGISTER ------------------
//   async function register(payload: any) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         ...payload,
//         react_app: process.env.NEXT_PUBLIC_APP_UUID,
//       }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw data;
//     return data;
//   }

//   // ------------------ REFRESH (manual use only) ------------------
//   async function refresh(): Promise<boolean> {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, {
//         method: "POST",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         setAccess(null);
//         setUser(null);
//         return false;
//       }

//       const data = await res.json();
//       setAccess(data.access);
//       setUser(data.user ?? null);
//       return true;
//     } catch {
//       setAccess(null);
//       setUser(null);
//       return false;
//     }
//   }

//   // ------------------ LOGOUT ------------------
//   async function logout() {
//     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
//       method: "POST",
//       credentials: "include",
//     });
//     setAccess(null);
//     setUser(null);
//   }

//   // ------------------ INIT ------------------
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ access, user, loading, login, logout, register, refresh }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Hook for consuming AuthContext
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
//   return ctx;
// }
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

  // ✅ Direct constants (no .env)
  const API_URL = "https://ron44.pythonanywhere.com";
  const APP_UUID = "6a78b1cb-1be4-42e7-ba98-dd31a9898687";

  // ✅ Create preconfigured Axios instance
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ------------------ LOGIN ------------------
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
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      throw err.response?.data || err;
    } finally {
      setLoading(false);
    }
  }

  // ------------------ REGISTER ------------------
  async function register(payload: any) {
    try {
      const res = await api.post("/api/auth/register/", {
        ...payload,
        react_app: APP_UUID,
      });
      return res.data;
    } catch (err: any) {
      console.error("Register error:", err.response?.data || err.message);
      throw err.response?.data || err;
    }
  }

  // ------------------ REFRESH ------------------
  async function refresh(): Promise<boolean> {
    try {
      const res = await api.post("/api/auth/refresh/");
      setAccess(res.data.access);
      setUser(res.data.user ?? null);
      return true;
    } catch (err) {
      setAccess(null);
      setUser(null);
      return false;
    }
  }

  // ------------------ LOGOUT ------------------
  async function logout() {
    try {
      await api.post("/api/auth/logout/");
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setAccess(null);
      setUser(null);
    }
  }

  // ------------------ INIT ------------------
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ access, user, loading, login, logout, register, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for consuming AuthContext
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
