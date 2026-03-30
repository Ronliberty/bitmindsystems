// types/task.ts

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

export type TaskType =
  | "general"
  | "editing"
  | "script"
  | "agent"
  | "creative"
  | "admin"
  | "client"
  | "marketing"
  | "other";

export interface EmployeeMini {
  id: number;
  full_name: string;
  position: string;
}

export interface FileReference {
  id: number;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  storage_provider: string;
  uploaded_by: {
    id: number;
    username: string;
    full_name: string;
  };
  context_type: string;
  tags: string[];
  description: string;
  version: number;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  task_type: TaskType;

  assigned_to?: EmployeeMini | null;
  assigned_to_id?: number | null;

  client_name: string;
  client_email: string;
  project_id: string;
  project_name: string;

  estimated_hours: number;
  actual_hours: number;
  deadline?: string | null;
  due_date?: string | null;
  started_at?: string | null;
  completed_at?: string | null;

  reward_amount: number;
  payment_status: "unpaid" | "pending" | "processing" | "paid";

  progress_percentage: number;

  revision_count: number;
  revision_notes: string;

  quality_rating: number;

  task_details: Record<string, any>;
  task_details_display: Record<string, any>;

  files?: Array<Partial<FileReference>>; // For creating/uploading new files
  attached_files: FileReference[];

  created_at: string;
  updated_at: string;
}