// api.ts

"use client";

import axios from "axios";
import {
  Task,
  Payment,
  TaskCreateResponse,
  PaymentProcessResponse,
} from "./types";

/* --------------------- AXIOS INSTANCE --------------------- */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* --------------------- REQUEST INTERCEPTOR --------------------- */
api.interceptors.request.use((config) => {
  const token = (globalThis as any)._access;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

/* --------------------- RESPONSE INTERCEPTOR (401 → REFRESH) --------------------- */
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`,
          {},
          { withCredentials: true }
        );

        const newAccess = refreshRes.data?.access;

        if (!newAccess) throw new Error("No access token");

        (globalThis as any)._access = newAccess;

        original.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(original);
      } catch (refreshErr) {
        (globalThis as any)._access = null;
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

/* ============================================================
   TASKS
============================================================ */

export const getMyTasks = async (): Promise<Task[]> => {
  const res = await api.get("/api/project/tasks/");
  return res.data;
};

export const createTask = async (payload: Task): Promise<TaskCreateResponse> => {
  const res = await api.post("/api/employee/tasks/create/", payload);
  return res.data;
};

export const updateTask = async (
  id: number,
  payload: Partial<Task>
): Promise<Task> => {
  const res = await api.patch(`/api/employee/tasks/${id}/update/`, payload);
  return res.data;
};

export const completeTask = async (id: number): Promise<any> => {
  const res = await api.post(`/api/employee/tasks/${id}/complete/`);
  return res.data;
};

/* ============================================================
   PAYMENTS
============================================================ */

export const processPayment = async (
  payload: Payment
): Promise<PaymentProcessResponse> => {
  const res = await api.post("/payments/process/", payload);
  return res.data;
};

/* ============================================================
   EMPLOYEES
============================================================ */

export const refreshEmployeePerformance = async (
  employeeId: number
): Promise<any> => {
  const res = await api.post(
    `/api/employee/employees/${employeeId}/refresh-performance/`
  );
  return res.data;
};

/* ============================================================
   EXPORT INSTANCE (optional for reuse)
============================================================ */

export default api;