// types.ts

export type TaskStatus =
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

export type TaskPriority = "low" | "normal" | "high" | "urgent";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  difficulty?: number;
  complexity_score?: number;
  deadline?: string;
  due_date?: string;

  assigned_to?: number | null;
  task_type?: string;

  estimated_hours?: number;
  actual_hours?: number;

  reward_amount?: number;
  payment_status?: "unpaid" | "pending" | "processing" | "paid";

  task_details?: Record<string, any>;

  progress_percentage?: number;
  revision_count?: number;
  revision_notes?: string;

  quality_rating?: number;

  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id?: number;
  employee: number;

  payment_type:
    | "salary"
    | "task_payment"
    | "commission"
    | "bonus"
    | "advance"
    | "reimbursement"
    | "other";

  payment_status?: "pending" | "processing" | "completed" | "failed";

  amount: number;
  currency?: string;

  tax_amount?: number;
  net_amount?: number;

  tasks?: number[];

  payment_method?: string;
  transaction_id?: string;

  notes?: string;

  created_at?: string;
}

export interface Employee {
  id: number;
  user: number;

  position:
    | "video_editor"
    | "script_writer"
    | "agent"
    | "manager"
    | "admin"
    | "creative"
    | "other";

  position_title?: string;

  work_email?: string;
  work_phone?: string;

  skills?: string[];
  employment_status?: "active" | "on_leave" | "probation" | "terminated";

  created_at?: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: any;
}

export interface TaskCreateResponse {
  task: Task;
  system: any;
}

export interface PaymentProcessResponse {
  payment: Payment;
  system: any;
}