// src/types/partnership.ts
export enum ProfitSplitType {
  NONE = "none",
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export interface PartnershipCategory {
  id: number;
  name: string;
  description?: string | null;
  created_at?: string;
}

export interface Partnership {
  id: number;
  title: string;
  slug: string;
  description: string;
  category?: PartnershipCategory | null;
  is_active: boolean;
  monetary: boolean;
  profit_split_type: ProfitSplitType;
  profit_share_percentage?: number | null; // 0-100
  fixed_share_amount?: number | null;
  is_contract_based: boolean;
  contract_template?: string | null; // URL to file
  created_by: {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
  view_count: number;
}

export interface PaginatedPartnerships {
  count: number;
  next: string | null;
  previous: string | null;
  results: Partnership[];
}