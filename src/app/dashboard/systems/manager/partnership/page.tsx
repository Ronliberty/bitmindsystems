// app/dashboard/systems/manager/partnership/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HandshakeIcon,
  DollarSign,
  FileText,
  Eye,
  Clock,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Percent,
  Tag,
  User,
} from "lucide-react";
import { Partnership, ProfitSplitType,  } from "@/app/lib/api"; // Adjust path

// Mock data - replace with real API
const mockPartnerships: Partnership[] = [
  {
    id: 1,
    title: "Premium Broker Integration Partnership",
    slug: "premium-broker-integration",
    description: "Collaborate with leading brokers to offer seamless account funding and trading directly within our platform. Revenue share on deposits and trades.",
    category: { id: 1, name: "Broker Partnerships", description: "Integrations with brokerage firms" },
    is_active: true,
    monetary: true,
    profit_split_type: ProfitSplitType.PERCENTAGE,
    profit_share_percentage: 35.0,
    fixed_share_amount: null,
    is_contract_based: true,
    contract_template: "/media/partnerships/contracts/broker-agreement.pdf",
    created_by: { id: 101, username: "admin" },
    created_at: "2025-12-01T10:00:00Z",
    updated_at: "2025-12-15T14:30:00Z",
    view_count: 245,
  },
  {
    id: 2,
    title: "Content Creator Affiliate Program",
    slug: "content-creator-affiliate",
    description: "Finance influencers and educators earn commissions by referring premium users to our platform.",
    category: { id: 2, name: "Affiliate Programs", description: null },
    is_active: true,
    monetary: true,
    profit_split_type: ProfitSplitType.FIXED,
    profit_share_percentage: null,
    fixed_share_amount: 50.0,
    is_contract_based: false,
    contract_template: null,
    created_by: { id: 102, username: "marketing" },
    created_at: "2025-11-20T09:00:00Z",
    updated_at: "2025-12-10T11:00:00Z",
    view_count: 412,
  },
  {
    id: 3,
    title: "Educational Institution Collaboration",
    slug: "educational-collaboration",
    description: "Partner with universities and finance courses to provide students with premium access and co-branded certifications.",
    category: { id: 3, name: "Non-Monetary", description: "Brand exposure and community partnerships" },
    is_active: false,
    monetary: false,
    profit_split_type: ProfitSplitType.NONE,
    profit_share_percentage: null,
    fixed_share_amount: null,
    is_contract_based: true,
    contract_template: "/media/partnerships/contracts/university-mou.pdf",
    created_by: { id: 101, username: "admin" },
    created_at: "2025-10-15T12:00:00Z",
    updated_at: "2025-11-01T08:00:00Z",
    view_count: 189,
  },
];

const profitTypeBadge = (type: ProfitSplitType, percentage?: number | null, fixed?: number | null) => {
  switch (type) {
    case ProfitSplitType.PERCENTAGE:
      return {
        label: `${percentage}% Revenue Share`,
        class: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100",
        icon: <Percent className="w-4 h-4" />,
      };
    case ProfitSplitType.FIXED:
      return {
        label: `$${fixed} Fixed per Referral`,
        class: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100",
        icon: <DollarSign className="w-4 h-4" />,
      };
    default:
      return {
        label: "Non-Monetary",
        class: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100",
        icon: <HandshakeIcon className="w-4 h-4" />,
      };
  }
};

export default function PartnershipPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    // Replace with real fetch: useSWR('/api/partnerships/')
    setPartnerships(mockPartnerships);
  }, []);

  const filteredPartnerships = partnerships.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.name.toLowerCase().includes(search.toLowerCase()) ?? false);

    const matchesActive = !activeOnly || p.is_active;

    return matchesSearch && matchesActive;
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-3">
            <HandshakeIcon className="w-12 h-12" />
            Partnership Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Manage affiliate programs, broker integrations, sponsorships, and strategic collaborations.
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
              placeholder="Search by title, description, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3">
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
              Add Partnership
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
            <HandshakeIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-foreground">{partnerships.length}</p>
            <p className="text-sm text-muted-foreground">Total Partnerships</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-3xl font-bold text-foreground">
              {partnerships.filter((p) => p.is_active).length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
            <p className="text-3xl font-bold text-foreground">
              {partnerships.filter((p) => p.monetary).length}
            </p>
            <p className="text-sm text-muted-foreground">Monetary</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="text-3xl font-bold text-foreground">
              {partnerships.filter((p) => p.is_contract_based).length}
            </p>
            <p className="text-sm text-muted-foreground">With Contract</p>
          </div>
        </motion.div>

        {/* Partnership List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredPartnerships.map((partnership) => {
            const profitInfo = profitTypeBadge(
              partnership.profit_split_type,
              partnership.profit_share_percentage,
              partnership.fixed_share_amount
            );

            return (
              <motion.div
                key={partnership.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative bg-card border ${!partnership.is_active ? "opacity-70" : ""} 
                  border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden`}
              >
                {/* Status Badge */}
                {!partnership.is_active && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                    Inactive
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <HandshakeIcon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {partnership.title}
                      </h3>
                      {partnership.category && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Tag className="w-4 h-4" />
                          {partnership.category.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                  {partnership.description}
                </p>

                {/* Profit Type Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border mb-4 ${profitInfo.class}`}>
                  {profitInfo.icon}
                  {profitInfo.label}
                </div>

                {/* Meta Info */}
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Created by <span className="font-medium text-foreground">@{partnership.created_by.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(partnership.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {partnership.view_count} views
                  </div>
                  {partnership.is_contract_based && (
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <FileText className="w-4 h-4" />
                      Contract Attached
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border">
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

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={partnership.is_active}
                      readOnly
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredPartnerships.length === 0 && (
          <div className="text-center py-20">
            <HandshakeIcon className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No partnerships found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}