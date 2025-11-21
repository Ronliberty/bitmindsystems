// lib/api.ts
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; 


export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface GymMember {
  id: number;
  user: {
    id: number;
   
    email: string;
    first_name: string;
    last_name: string;
  };
  goals: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  bmi: string | null;
  joined_at: string;
  active: boolean;
  gym: number;
}


export async function fetchCurrentUser() {
  const res = await axios.get("/api/user/me/");
  return res.data; // { id, email, first_name, last_name, user_type }
}

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = (globalThis as any)._access; // access token stored in memory by AuthContext
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  return res;
}

export async function getGymMembers(accessToken: string) {
  const res = await fetch(`${API_BASE}/api//fitness/gym/members/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch gym members: ${res.status}`);
  }

  return res.json();
}