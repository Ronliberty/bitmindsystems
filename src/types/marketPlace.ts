// src/types/marketplace.ts
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

export interface PaginatedMarketplaceItems {
  count: number;
  next: string | null;
  previous: string | null;
  results: MarketplaceItem[];
}