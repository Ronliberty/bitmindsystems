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
