export type TaskStatus =
  | "pending"
  | "in_progress"
  | "in_review"
  | "completed"
  | "cancelled"
  | "queued";

export type TaskPriority = "low" | "high" | "critical";

export type TaskPaymentStatus =
  | "unpaid"
  | "pending"
  | "processing"
  | "paid"
  | "partial";

export type TaskAssignmentMode = "auto" | "manual" | "suggested" | "queued";

export interface TaskCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Task {
  id: number;

  title: string;
  description: string;

  project: number | null;
  project_title?: string;

  category: number | null;
  category_name?: string;

  assigned_to: number | null;
  assigned_to_name?: string;

  assigned_by: number | null;
  assigned_by_name?: string;

  status: TaskStatus;
  priority: TaskPriority;

  payment_status: TaskPaymentStatus;
  assignment_mode: TaskAssignmentMode;

  allowed_positions: string[];

  estimated_hours: string;
  actual_hours: string;

  progress_percentage: number;
  complexity_score: number;
  difficulty: number;

  revision_count: number;
  revision_notes: string;

  quality_rating: number;
  assignment_confidence: number | null;

  task_detaild: Record<string, unknown>;

  due_date: string | null;
  deadline: string | null;
  completed_at: string | null;

  created_by: number;
  created_at: string;
  updated_at: string;
}

// ── Payloads ────────────────────────────────────────────────────────────────

export interface CreateTaskPayload {
  title: string;
  description?: string;
  project?: number | null;
  category?: number | null;
  assigned_to?: number | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  payment_status?: TaskPaymentStatus;
  assignment_mode?: TaskAssignmentMode;
  allowed_positions?: string[];
  estimated_hours?: string;
  actual_hours?: string;
  progress_percentage?: number;
  revision_notes?: string;
  quality_rating?: number;
  task_detaild?: Record<string, unknown>;
  due_date?: string | null;
  deadline?: string | null;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

// ── Assignment ───────────────────────────────────────────────────────────────

export type AssignMode = "manual" | "auto" | "suggested" | "confirm_suggested";

export interface AssignTaskPayload {
  mode: AssignMode;
  employee_id?: number;
}

export interface TaskCandidate {
  employee_id: number;
  name: string;
  email: string;
  active_tasks: number | null;
  score: number;
  groups: string[];
}

export interface SuggestedAssignmentResponse {
  mode: "suggested";
  candidates: TaskCandidate[];
}

// ── Filters ──────────────────────────────────────────────────────────────────

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  payment_status?: TaskPaymentStatus;
  assigned_to?: number;
  project?: number;
  category?: number;
  assignment_mode?: TaskAssignmentMode;
  search?: string;
  ordering?: string;
  page?: number;
}

// ── Category Payloads ────────────────────────────────────────────────────────

export interface CreateTaskCategoryPayload {
  name: string;
  slug: string;
}

export type UpdateTaskCategoryPayload = Partial<CreateTaskCategoryPayload>;