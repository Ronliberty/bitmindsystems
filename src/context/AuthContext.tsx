

// "use client";

// import React, { createContext, useContext, useState, useEffect, useRef } from "react";
// import axios from "axios";

// type AuthContextType = {
//   access: string | null;
//   user: any | null;
//   loading: boolean;
//   isLoggedIn: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (payload: any) => Promise<any>;
//   refresh: () => Promise<boolean>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// /* --------------------- AXIOS INTERCEPTOR --------------------- */
// axios.interceptors.request.use((config) => {
//   const token = (globalThis as any)._access;
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [access, setAccess] = useState<string | null>(null);
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   const hasRefreshed = useRef(false); // ✅ prevent double refresh

//   function syncAccess(token: string | null) {
//     (globalThis as any)._access = token;
//     setAccess(token);
//   }

//   /* -------------------------- LOGIN -------------------------- */
//   async function login(email: string, password: string) {
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/login/", {
//         email,
//         password,
//         react_app: process.env.NEXT_PUBLIC_APP_UUID,
//       });

//       syncAccess(res.data.access ?? null);
//       setUser(res.data.user ?? null); // ✅ direct
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* -------------------------- REGISTER -------------------------- */
//   async function register(payload: any) {
//     setLoading(true);
//     try {
//       const endpoint = payload.invite
//         ? "/api/register/"
//         : "/api/signup/";

//       const res = await axios.post(endpoint, {
//         ...payload,
//         react_app: process.env.NEXT_PUBLIC_APP_UUID,
//       });

//       if (!payload.invite) {
//         syncAccess(res.data.access ?? null);
//         setUser(res.data.user ?? null);
//       }

//       return res.data;
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* -------------------------- REFRESH -------------------------- */
//   async function refresh(): Promise<boolean> {
//     try {
//       const res = await axios.post("/api/auth/refresh/");

//       const access = res.data?.access;
//       const user = res.data?.user;

//       if (!access) {
//         syncAccess(null);
//         setUser(null);
//         return false;
//       }

//       syncAccess(access);
//       setUser(user ?? null); // ✅ NO /me call

//       return true;
//     } catch {
//       syncAccess(null);
//       setUser(null);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* -------------------------- LOGOUT -------------------------- */
//   async function logout() {
//     await axios.post("/api/logout/");
//     syncAccess(null);
//     setUser(null);
//   }

//   /* -------------------------- INIT -------------------------- */
//   useEffect(() => {
//     if (!hasRefreshed.current) {
//       hasRefreshed.current = true;
//       refresh();
//     }
//   }, []);

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider
//       value={{
//         access,
//         user,
//         loading,
//         isLoggedIn,
//         login,
//         logout,
//         register,
//         refresh,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }




"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

/* --------------------- AXIOS INSTANCE --------------------- */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* --------------------- TYPES --------------------- */
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

/* --------------------- PROVIDER --------------------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const hasRefreshed = useRef(false);

  /* --------------------- TOKEN SYNC --------------------- */
  function syncAccess(token: string | null) {
    (globalThis as any)._access = token; // keep for now
    setAccess(token);
  }

  /* --------------------- REQUEST INTERCEPTOR --------------------- */
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = (globalThis as any)._access;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });

    return () => {
      api.interceptors.request.eject(reqInterceptor);
    };
  }, []);

  /* --------------------- RESPONSE INTERCEPTOR (401) --------------------- */
  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const original = err.config;

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

    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);

  /* -------------------------- LOGIN -------------------------- */
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

  /* -------------------------- REGISTER -------------------------- */
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

  /* -------------------------- REFRESH -------------------------- */
  async function refresh(): Promise<boolean> {
    try {
      const res = await api.post("/api/auth/refresh/");

      const access = res.data?.access;
      const user = res.data?.user;

      if (!access) {
        syncAccess(null);
        setUser(null);
        return false;
      }

      syncAccess(access);
      setUser(user ?? null);

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
    await api.post("/api/logout/");
    syncAccess(null);
    setUser(null);
  }

  /* -------------------------- INIT (ON LOAD) -------------------------- */
  useEffect(() => {
    if (!hasRefreshed.current) {
      hasRefreshed.current = true;
      refresh();
    }
  }, []);

  /* --------------------- ACTIVITY REFRESH --------------------- */
  useEffect(() => {
    let lastRefresh = Date.now();

    const handleActivity = async () => {
      const now = Date.now();

      if (now - lastRefresh > 10 * 60 * 1000) {
        await refresh();
        lastRefresh = now;
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

  /* --------------------- STATE --------------------- */
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

/* --------------------- HOOK --------------------- */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}