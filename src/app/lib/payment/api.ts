// types/payment.ts
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; 


export const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface Payment {
  id: number;
  created_at: string;
  updated_at: string;

  employee: string;
  contract: string | null;
  tasks: string[];

  payment_type: "salary" | "task_payment" | "commission" | "bonus" | "advance" | "reimbursement" | "other";
  payment_status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  payment_method: "bank_transfer" | "paypal" | "wise" | "payoneer" | "cash" | "mpesa" | "other";

  amount: string;
  currency: string;
  tax_amount: string;
  net_amount: string;

  payment_date: string;
  processed_date: string | null;

  transaction_id: string;
  payment_reference: string;
  notes: string;
  invoice_url: string;
  receipt_url: string;

  // Display fields (always present)
  payment_type_display: string;
  payment_status_display: string;
  payment_method_display: string;
}
// types/marketplace.ts
// TypeScript interfaces matching your MarketplaceItem and ItemMedia models

export type ItemType = "service" | "app" | "website";

export type MediaType = "image" | "video" | "file" | "link";

export interface ItemMedia {
  id: number;
  media_type: MediaType;
  file?: string; // URL if uploaded
  link?: string;
}

export interface MarketplaceItem {
  id: number;
  seller: {
    id: number;
    username: string;
    // add avatar/full_name if you have them
  };
  item_type: ItemType;
  title: string;
  description: string;
  price: number; // decimal as number
  currency: string;
  max_quantity: number;
  tags: string[]; // JSONField list of strings
  active: boolean;
  created_at: string; // ISO datetime
  views_count: number;
  purchases_count: number;
  media: ItemMedia[];
  // Computed (optional, can calculate on frontend if needed)
  available_quantity?: number | "unlimited";
  can_purchase?: boolean;
}
// types/subscription.ts
// TypeScript interfaces for Subscription management

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
  // add features array if needed
}

export interface Subscription {
  id: number;
  user: UserAccount;
  app: {
    id: number;
    name: string;
  };
  plan: Plan;
  start_date: string; // ISO datetime
  end_date: string;   // ISO datetime
  status: "active" | "canceled" | "expired" | "pending";
}

export async function getFiles(accessToken: string) {
  const res = await fetch(`${API_BASE}/api/employee/manager/finance/`, {
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
