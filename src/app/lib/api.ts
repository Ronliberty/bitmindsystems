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

export interface MealPlan {
  id: number;
  title: string;
  description: string | null;
  total_calories: number;
  is_active: boolean;
  items: MealItem[];
}

export interface MealItem {
  id: number;
  name: string;
  calories: number;
  protein_g: string;
  carbs_g: string;
  fats_g: string;
  meal_time: string;
}

export interface PortaSubmission {
  id: number;
  react_app: number;
  name: string;
  email: string;
  contact: string;
  country: string;
  address: string;
  created_at: string;
}
export interface Task {
  id: number;
  title: string;
  assigned_to: string | null;
  task_type: string;

  client_name: string;
  client_email: string;
  project_id: string;
  project_name: string;

  estimated_hours: string;
  actual_hours: string;

  reward_amount: string;
  payment_status: string;

  task_details: Record<string, any>;

  get_task_details_display: Record<string, any>;

  progress_percentage: number;
  revision_count: number;
  revision_notes: string;
  quality_rating: number;

  priority: string;
  status: string;
  due_date: string;
  created_at: string;
}
export interface PaymentRecord {
  id: number;
  employee: string; // Employee full name or identifier
  payment_type: string;
  payment_status: string;

  amount: string;
  currency: string;
  tax_amount: string;
  net_amount: string;

  contract?: string | null; // optional contract identifier

  tasks: {
    id: number;
    title: string;
  }[];

  payment_date: string;
  processed_date?: string | null;

  payment_method: string;
  transaction_id: string;
  payment_reference: string;

  notes: string;
  invoice_url?: string;
  receipt_url?: string;

  created_at: string;
  updated_at: string;
}
export interface FileReference {
  id: number;
  file_name: string;
  file_type: string;
  file_size: number; // in bytes
  file_url: string;
  storage_provider: string;

  uploaded_by: string | null; // user full name
  context_type: string;

  object_id: number;
  description: string;
  tags: string[];

  version: number;
  is_current: boolean;
  replaces?: number | null; // id of replaced file

  is_public: boolean;
  access_password?: string;

  created_at: string;
  updated_at: string;
}
// types/task.ts  (or app/lib/api.ts)
export interface TaskMode {
  id: number;
  created_at: string;     // ISO string
  updated_at: string;

  title: string;
  description: string;

  status:
    | "draft"
    | "pending"
    | "assigned"
    | "in_progress"
    | "submitted"
    | "review"
    | "approved"
    | "revision"
    | "completed"
    | "cancelled";

  priority: "low" | "normal" | "high" | "urgent";

  deadline: string | null;        // ISO datetime or null
  started_at: string | null;
  completed_at: string | null;
  due_date: string | null;        // "YYYY-MM-DD" or null

  // Auto-generated display fields (Django adds these when using choices)
  status_display: string;
  priority_display: string;
}
// types/news.ts
// TypeScript interfaces exported from Django serializers for News management

export interface NewsSource {
  id: number;
  name: string;
  url?: string;
  reliability_score: number;
}

export interface Media {
  file: string;
  alt?: string | null;
  caption?: string | null;
}

export interface Topic {
  id: number;
  name: string;
}

export interface NewsArticle {
  id: number;
  source: NewsSource;
  source_id: number;
  source_reliability_at_fetch: number;
  title: string;
  url: string;
  summary: string;
  language: string;
  region: string;
  topics: Topic[];
  published_at: string; // ISO datetime string
  fetched_at: string; // ISO datetime string
  is_featured: boolean;
  media?: Media[];
}

// types/jobs.ts
// TypeScript interfaces matching your JobOpportunity model and related

export type RemoteType = "remote" | "hybrid" | "onsite";

export interface SkillTag {
  id: number;
  name: string;
  // add color/slug if you have them
}

export interface Media {
  id: number;
  file: string;
  alt?: string | null;
  caption?: string | null;
}

export interface JobBoard {
  id: number;
  name: string;
  url?: string;
}

export interface JobOpportunity {
  id: string; // UUID as string
  title: string;
  company: string;
  board?: JobBoard | null;
  url?: string;
  description: string;
  location: string;
  remote_type: RemoteType;
  currency: string;
  media?: Media[];
  salary_min?: number | null;
  salary_max?: number | null;
  skills: SkillTag[];
  posted_at: string; // ISO datetime
  expires_at?: string | null; // ISO datetime
  is_active: boolean;
}


// types/partnership.ts
// TypeScript interfaces matching your Partnership and PartnershipCategory models

export enum ProfitSplitType {
  NONE = "none",
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export interface PartnershipCategory {
  id: number;
  name: string;
  description?: string | null;
  created_at?: string;
}

export interface Partnership {
  id: number;
  title: string;
  slug: string;
  description: string;
  category?: PartnershipCategory | null;
  is_active: boolean;
  monetary: boolean;
  profit_split_type: ProfitSplitType;
  profit_share_percentage?: number | null; // 0-100
  fixed_share_amount?: number | null;
  is_contract_based: boolean;
  contract_template?: string | null; // URL to file
  created_by: {
    id: number;
    username: string;
    // add full_name/avatar if available
  };
  created_at: string;
  updated_at: string;
  view_count: number;
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
  const res = await fetch(`${API_BASE}/api/fitness/gym/members/`, {
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



export async function getMealPlans(accessToken: string): Promise<MealPlan[]> {
  const res = await fetch(`${API_BASE}/api/fitness/plans/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch meal plans: ${res.status}`);
  }

  return res.json();
}



export async function createMealPlan(
  accessToken: string,
  data: {
    title: string;
    description?: string;
    total_calories: number;
    is_active: boolean;
  }
): Promise<MealPlan> {
  const res = await fetch(`${API_BASE}/api/fitness/plans/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create meal plan: ${res.status}`);
  }

  return res.json();
}


export async function updateMealPlan(
  accessToken: string,
  mealPlanId: number,
  data: Partial<{
    title: string;
    description: string;
    total_calories: number;
    is_active: boolean;
  }>
): Promise<MealPlan> {
  const res = await fetch(`${API_BASE}/api/fitness/plans/${mealPlanId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update meal plan: ${res.status}`);
  }

  return res.json();
}


export async function getPortaSubmissions(accessToken: string): Promise<PortaSubmission[]> {
  const res = await fetch(`${API_BASE}/api/portfolio/porta/submissions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch porta submissions: ${res.status}`);
  }

  return res.json();
}




export async function getTasks(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/tasks/`, {
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



export async function getPayments(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/payments/`, {
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


export async function getFiles(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/files/`, {
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

export async function getTask(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/task/`, {
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


export async function getNews(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/task/`, {
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