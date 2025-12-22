// app/dashboard/systems/manager/marketplace/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Tag,
  DollarSign,
  ShoppingCart,
  Eye,
  Clock,
  Infinity,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Package,
  Code,
  Globe,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { MarketplaceItem, ItemType } from "@/app/lib/payment/api";// Adjust path

// Mock data - replace with real API
const mockItems: MarketplaceItem[] = [
  {
    id: 1,
    seller: { id: 101, username: "devmaster" },
    item_type: "service",
    title: "Custom FinTech Dashboard Development",
    description: "Professional React + Next.js dashboard with real-time data integration, charts, and admin panel.",
    price: 2999.0,
    currency: "USD",
    max_quantity: 0,
    tags: ["React", "Next.js", "Tailwind", "Finance", "Dashboard"],
    active: true,
    created_at: "2025-12-15T10:00:00Z",
    views_count: 342,
    purchases_count: 18,
    media: [
      { id: 1, media_type: "image", file: "/api/media/marketplace/1/dashboard-preview.jpg" },
      { id: 2, media_type: "image", file: "/api/media/marketplace/1/chart-example.jpg" },
    ],
  },
  {
    id: 2,
    seller: { id: 102, username: "appbuilder_pro" },
    item_type: "app",
    title: "Crypto Portfolio Tracker Mobile App",
    description: "Full-source React Native app with live prices, alerts, and portfolio analytics.",
    price: 1499.0,
    currency: "USD",
    max_quantity: 10,
    tags: ["React Native", "Crypto", "Mobile", "API"],
    active: true,
    created_at: "2025-12-10T14:30:00Z",
    views_count: 567,
    purchases_count: 7,
    media: [{ id: 3, media_type: "image", file: "/api/media/marketplace/2/app-screenshot.png" }],
  },
  {
    id: 3,
    seller: { id: 103, username: "websitedesigner" },
    item_type: "website",
    title: "Premium Finance Landing Page Template",
    description: "Fully responsive HTML + Tailwind template for investment/finance websites.",
    price: 299.0,
    currency: "USD",
    max_quantity: 0,
    tags: ["HTML", "Tailwind", "Landing Page", "Finance"],
    active: false,
    created_at: "2025-11-28T09:00:00Z",
    views_count: 891,
    purchases_count: 42,
    media: [],
  },
  // Add more as needed
];

const itemTypeIcons: Record<ItemType, React.ReactNode> = {
  service: <Users className="w-5 h-5" />,
  app: <Package className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />,
};

const itemTypeBadges: Record<ItemType, { label: string; class: string }> = {
  service: { label: "Service", class: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100" },
  app: { label: "App", class: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100" },
  website: { label: "Website", class: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100" },
};

const formatPrice = (price: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ItemType | "all">("all");
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    // Replace with real fetch: useSWR('/api/marketplace/items/')
    setItems(mockItems);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      item.seller.username.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" || item.item_type === typeFilter;
    const matchesActive = !activeOnly || item.active;

    return matchesSearch && matchesType && matchesActive;
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-3">
            <Store className="w-12 h-12" />
            Marketplace Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Manage digital products, services, and apps sold in your finance community marketplace.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, description, tags, or seller..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ItemType | "all")}
              className="px-5 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="service">Services</option>
              <option value="app">Apps</option>
              <option value="website">Websites</option>
            </select>

            <label className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl cursor-pointer hover:shadow-md transition-all">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="w-5 h-5 rounded text-primary focus:ring-primary"
              />
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium">Active Only</span>
            </label>

            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">{items.length}</p>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-3xl font-bold text-foreground">
              {items.filter((i) => i.active).length}
            </p>
            <p className="text-sm text-muted-foreground">Active Listings</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
            <p className="text-3xl font-bold text-foreground">
              {items.reduce((sum, i) => sum + i.purchases_count, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Purchases</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-3xl font-bold text-foreground">
              {items.reduce((sum, i) => sum + i.views_count, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
        </motion.div>

        {/* Item Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => {
            const typeInfo = itemTypeBadges[item.item_type];
            const isUnlimited = item.item_type === "service" || item.max_quantity === 0;
            const isSoldOut = !isUnlimited && item.max_quantity - item.purchases_count <= 0;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative bg-card border ${!item.active || isSoldOut ? "opacity-70" : ""} 
                  border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden`}
              >
                {/* Status Badges */}
                <div className="flex gap-2 absolute top-4 right-4 z-10">
                  {!item.active && (
                    <div className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                      Inactive
                    </div>
                  )}
                  {isSoldOut && (
                    <div className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full border border-orange-200">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Media Preview */}
                {item.media.length > 0 && item.media[0].file ? (
                  <div className="relative overflow-hidden rounded-xl mb-5 h-48 bg-muted">
                    <img
                      src={item.media[0].file}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.media.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        +{item.media.length - 1} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-muted/50 border-2 border-dashed border-border rounded-xl mb-5 flex items-center justify-center">
                    <Store className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {itemTypeIcons[item.item_type]}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${typeInfo.class}`}>
                        {typeInfo.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(item.price, item.currency)}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      {isUnlimited ? (
                        <>
                          <Infinity className="w-4 h-4" />
                          Unlimited
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          {item.max_quantity - item.purchases_count} left
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{item.tags.length - 4}</span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      by <span className="font-medium text-foreground">@{item.seller.username}</span>
                      {" • "}
                      <Clock className="w-3 h-3 inline" /> {new Date(item.created_at).toLocaleDateString()}
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Store className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No marketplace items found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}