// src/types/news.ts
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

export interface PaginatedNews {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsArticle[];
}

export interface PaginatedSources {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsSource[];
}