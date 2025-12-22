// app/dashboard/systems/manager/subscription/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  DollarSign,
  UserCheck,
  Eye,
  Edit3,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Subscription } from "@/app/lib/payment/api"; 

// Mock data - replace with real API
const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    user: { id: 101, email: "john.doe@example.com", username: "johndoe" },
    app: { id: 1, name: "Finance Pro" },
    plan: { id: 1, name: "Premium Monthly", price: 29.99, currency: "USD", interval: "monthly" },
    start_date: "2025-01-15T00:00:00Z",
    end_date: "2026-01-15T00:00:00Z",
    status: "active",
  },
  {
    id: 2,
    user: { id: 102, email: "alice.smith@example.com" },
    app: { id: 1, name: "Finance Pro" },
    plan: { id: 2, name: "Pro Yearly", price: 299.0, currency: "USD", interval: "yearly" },
    start_date: "2025-03-20T00:00:00Z",
    end_date: "2026-03-20T00:00:00Z",
    status: "active",
  },
  {
    id: 3,
    user: { id: 103, email: "bob.jones@example.com" },
    app: { id: 2, name: "Crypto Tracker" },
    plan: { id: 1, name: "Premium Monthly", price: 29.99, currency: "USD", interval: "monthly" },
    start_date: "2025-06-10T00:00:00Z",
    end_date: "2025-12-10T00:00:00Z",
    status: "expired",
  },
  // Add more...
];

// Mock chart data: New subscriptions per month in 2025
const monthlyData = [
  { month: "Jan", new: 45, active: 320 },
  { month: "Feb", new: 52, active: 365 },
  { month: "Mar", new: 68, active: 410 },
  { month: "Apr", new: 59, active: 445 },
  { month: "May", new: 73, active: 490 },
  { month: "Jun", new: 81, active: 540 },
  { month: "Jul", new: 92, active: 600 },
  { month: "Aug", new: 88, active: 650 },
  { month: "Sep", new: 105, active: 710 },
  { month: "Oct", new: 98, active: 780 },
  { month: "Nov", new: 115, active: 850 },
  { month: "Dec", new: 124, active: 920 },
];

const planDistribution = [
  { name: "Premium Monthly", value: 620, fill: "#8b5cf6" },
  { name: "Pro Yearly", value: 300, fill: "#10b981" },
];

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "expired" | "canceled">("all");

  useEffect(() => {
    // Replace with real fetch: useSWR('/api/subscriptions/')
    setSubscriptions(mockSubscriptions);
  }, []);

  const filteredSubs = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.user.email.toLowerCase().includes(search.toLowerCase()) ||
      (sub.user.username?.toLowerCase().includes(search.toLowerCase()) ?? false);

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const totalRevenue = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.plan.price, 0);

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-3">
            <CreditCard className="w-12 h-12" />
            Subscription Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Monitor active subscribers, track growth, and manage premium memberships across your apps.
          </p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">{subscriptions.length}</span>
            </div>
            <p className="text-muted-foreground">Total Subscribers</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">{activeCount}</span>
            </div>
            <p className="text-muted-foreground">Active Subscriptions</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold">+124</span>
            </div>
            <p className="text-muted-foreground">New This Month</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-bold">${totalRevenue.toFixed(0)}</span>
            </div>
            <p className="text-muted-foreground">Monthly Recurring</p>
          </div>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Growth Chart */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Subscription Growth (2025)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Line type="monotone" dataKey="new" stroke="#8b5cf6" strokeWidth={3} name="New Subs" />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={3} name="Total Active" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Plan Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={planDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by email or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-5 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="canceled">Canceled</option>
            <option value="pending">Pending</option>
          </select>
        </motion.div>

        {/* Subscribers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              Subscriber List
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">App</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Period</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{sub.user.email}</p>
                        {sub.user.username && <p className="text-sm text-muted-foreground">@{sub.user.username}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{sub.app.name}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{sub.plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${sub.plan.price} / {sub.plan.interval}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(sub.start_date).toLocaleDateString()} → {new Date(sub.end_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          sub.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100"
                            : sub.status === "expired"
                            ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100"
                            : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}