// app/dashboard/system/manager/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Briefcase,
  Newspaper,
  DollarSign,
  PieChart,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";

// Mock overview data - replace with real API fetches later
const stats = {
  totalNews: 48,
  featuredNews: 12,
  totalJobs: 36,
  activeJobs: 29,
  totalPartnerships: 18,
  activePartnerships: 15,
  totalSubscriptions: 842,
  newThisMonth: 124,
};

const recentActivity = [
  { id: 1, type: "news", title: "Global Markets Surge on Tech Earnings", time: "2 hours ago", icon: Newspaper },
  { id: 2, type: "job", title: "Senior Full-Stack Engineer posted", time: "5 hours ago", icon: Briefcase },
  { id: 3, type: "partnership", title: "New partnership with FinTech Alpha", time: "1 day ago", icon: Users },
  { id: 4, type: "subscription", title: "124 new premium subscribers", time: "This month", icon: DollarSign },
];

const quickMetrics = [
  { title: "News Articles", value: stats.totalNews, change: +8, icon: Newspaper, color: "text-blue-600 dark:text-blue-400" },
  { title: "Featured News", value: stats.featuredNews, change: +3, icon: PieChart, color: "text-yellow-600 dark:text-yellow-400" },
  { title: "Job Listings", value: stats.totalJobs, change: +12, icon: Briefcase, color: "text-green-600 dark:text-green-400" },
  { title: "Active Jobs", value: stats.activeJobs, change: -2, icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400" },
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-4">
            <LayoutDashboard className="w-12 h-12" />
            System Overview
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Welcome back! Here's a snapshot of your finance ecosystem performance and content activity.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {quickMetrics.map((metric, i) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  {metric.change > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">+{metric.change}</span>
                    </>
                  ) : metric.change < 0 ? (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">{metric.change}</span>
                    </>
                  ) : (
                    <span>No change</span>
                  )}
                  {" "}since last week
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Partnerships */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Partnerships
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Active collaborations and sponsors
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">
                {stats.activePartnerships}/{stats.totalPartnerships}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Active / Total</p>
            </div>
          </div>

          {/* Subscriptions */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                Subscriptions
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Premium members growth
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">{stats.totalSubscriptions}</div>
              <p className="text-sm text-green-500 flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" />
                +{stats.newThisMonth} new this month
              </p>
            </div>
          </div>

          {/* Content Health */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                Content Status
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Items needing attention
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expired Jobs</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Inactive Partnerships</span>
                <span className="font-medium text-red-600 dark:text-red-400">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending Review</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">14</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              Recent Activity
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Latest updates across all sections
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-full">
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-8"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Everything looks healthy! Keep curating great content for your community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Content
            </button>
            <button className="px-6 py-3 bg-card border border-border hover:shadow-md rounded-xl font-medium transition-all">
              View Full Reports
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}