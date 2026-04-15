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