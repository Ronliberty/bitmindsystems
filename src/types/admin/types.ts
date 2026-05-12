// React App Type
export interface ReactApp {
  id: number;
  name: string;
  identifier: string;
  domain: string;
  is_active: boolean;
  created_at: string; 
}


export interface UserAccount {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;


  react_app: number;


  react_app_detail: ReactApp;

  is_active: boolean;
  is_staff: boolean;
  date_joined: string; 
}


export type UserStats = {
  total_users: number;
  new_users: number;

  admins: number;
  managers: number;
  employees: number;
  coaches: number;
  artists: number;

  date?: string;
};



export type SystemSettings = {
  maintenance_mode: boolean;
  allow_registrations: boolean;
  max_users: number;
  updated_at?: string;
};



export type EmailActionType = "invite" | "revoke";

export interface EmailAction {
  id: string;
  email: string;
  type: EmailActionType;
  description: string;
  status: "sent" | "pending" | "failed";
  createdAt: string;
}