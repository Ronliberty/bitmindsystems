export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";

export interface Project {
  id: number;

  title: string;
  description: string;

  client: number | null;
  client_name?: string;

  project_lead: number | null;
  project_lead_name?: string;

  status: ProjectStatus;

  currency: string;
  budget: string;

  start_date: string | null;
  end_date: string | null;

  project_type: string;

  total_tasks: number;
  completed_tasks: number;

  created_by: number;

  created_at: string;
  updated_at: string;
}

export interface CreateProjectPayload {
  title: string;
  description?: string;

  client?: number | null;
  project_lead?: number | null;

  status?: ProjectStatus;

  currency?: string;
  budget?: string;

  start_date?: string | null;
  end_date?: string | null;

  project_type?: string;
}

export interface UpdateProjectPayload
  extends Partial<CreateProjectPayload> {}