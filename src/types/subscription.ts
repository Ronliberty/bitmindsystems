// src/types/subscription.ts
export interface UserAccount {
  id: number;
  email: string;
  username?: string;
  full_name?: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  currency: string;
  interval: "monthly" | "yearly";
}

export interface ReactApp {
  id: number;
  name: string;
}

export interface Subscription {
  id: number;
  user: UserAccount;
  app: ReactApp;
  plan: Plan;
  start_date: string; // ISO datetime
  end_date: string;   // ISO datetime
  status: "active" | "canceled" | "expired" | "pending";
}

export interface PaginatedSubscriptions {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subscription[];
}