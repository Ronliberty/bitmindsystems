// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bitlymindsystem.pythonanywhere.com/";

/**
 * Helper to send requests to your backend API.
 */
async function request(endpoint: string, method: string, data?: object) {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const res = await fetch(url, options);

  // Throw an error if response is not OK
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Signup user
 */
export async function signupUser(payload: {
  username: string;
  email: string;
  password: string;
}) {
  return request("/api/signup/", "POST", payload);
}

/**
 * Login user
 */
export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  return request("/api/login/", "POST", payload);
}
