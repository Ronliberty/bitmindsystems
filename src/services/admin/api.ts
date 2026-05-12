import axios from "axios";

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* =========================================================
   TYPES
========================================================= */

export type EmailActionType =
  | "invite"
  | "revoke"
  | "reset_password";

export interface SendEmailPayload {
  email: string;
  type: EmailActionType;
  subject: string;
  message: string;
  react_app?: string; // IMPORTANT for invite flow
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

/* =========================================================
   ACCESS TOKEN
========================================================= */

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return (globalThis as any)._access || null;
}

/* =========================================================
   SEND EMAIL ACTION
========================================================= */

export async function sendEmailAction(
  payload: SendEmailPayload
): Promise<SendEmailResponse> {
  try {
    const token = getAccessToken();

    const response = await api.post(
      "/api/notifications/send/",
      payload,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("SEND EMAIL ERROR:", error);

    if (error.response?.data) {
      throw error.response.data;
    }

    throw {
      success: false,
      message: "Unable to send email",
    };
  }
}