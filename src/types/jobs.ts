// src/types/jobs.ts
export type RemoteType = "remote" | "hybrid" | "onsite";

export interface SkillTag {
  id: number;
  name: string;
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

export interface PaginatedJobs {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobOpportunity[];
}