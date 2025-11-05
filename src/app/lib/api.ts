// lib/api.ts
import axios from "axios";

// ================================
// 🔧 Axios Base Configuration
// ================================
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bitlymindsystem.pythonanywhere.com/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies (for refresh tokens etc.)
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// 🧱 Helper: Unified Error Handler
// ================================
function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.response?.data?.non_field_errors?.[0] ||
      "An unknown error occurred.";
    throw new Error(`Error ${status || ""}: ${message}`);
  }
  throw error;
}

// ================================
// 🧍 Register User (With Invite)
// ================================
export async function registerUserWithInvite(data: any) {
  try {
    const res = await api.post("/api/register/", data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ================================
// 🔐 Login User
// ================================
export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/api/login/", payload);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ================================
// 🚪 Logout User
// ================================
export async function logoutUser() {
  try {
    const res = await api.post("/api/logout/");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

// ================================
// 🔄 Refresh Token
// ================================
export async function refreshToken() {
  try {
    const res = await api.post("/api/refresh/");
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
