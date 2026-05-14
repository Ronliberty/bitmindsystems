export type ProjectStatus =
  | "planning"
  | "active"
  | "on_hold"
  | "completed"
  | "cancelled";


export type ProjectType = "client" | "internal";
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

  project_type: ProjectType;

  total_tasks: number;
  completed_tasks: number;

  created_by: number;

  created_at: string;
  updated_at: string;
}

export interface CreateProjectPayload {
  title: string;
  description?: string;
  project_type: ProjectType;

  client?: number | null;
  project_lead?: number | null;

  status?: ProjectStatus;

  currency?: string;
  budget?: string;

  start_date?: string | null;
  end_date?: string | null;

  
}

export interface UpdateProjectPayload
  extends Partial<CreateProjectPayload> {}