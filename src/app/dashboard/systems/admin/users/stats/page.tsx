"use client";

import { useEffect, useState } from "react";
import { StatsAPI } from "@/app/lib/admin/api";
import { UserStats } from "@/types/admin/types"; 
import { motion } from "framer-motion";

export default function UserStatsPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatsAPI.getUserStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 w-1/3 bg-gray-700 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-800 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

if (error) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-4">

        {/* Icon / Visual */}
        <div className="text-5xl">⚠️</div>

        {/* Title */}
        <h2 className="text-xl font-semibold">
          Failed to load analytics
        </h2>

        {/* Message */}
        <p className="text-sm text-muted-foreground">
          We couldn’t fetch user statistics right now.  
          This could be a server issue or network problem.
        </p>

        {/* Error details (optional but useful for dev) */}
        <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg">
          {error}
        </div>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
        >
          Try Again
        </button>

      </div>
    </div>
  );
}

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Analytics</h1>
        <p className="text-muted-foreground">
          System-wide user insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">Total Users</h2>
          <p className="text-2xl font-bold">{stats?.total_users}</p>
        </motion.div>

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">New Users</h2>
          <p className="text-2xl font-bold">{stats?.new_users}</p>
        </motion.div>

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">Admins</h2>
          <p className="text-2xl font-bold">{stats?.admins}</p>
        </motion.div>

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">Managers</h2>
          <p className="text-2xl font-bold">{stats?.managers}</p>
        </motion.div>

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">Employees</h2>
          <p className="text-2xl font-bold">{stats?.employees}</p>
        </motion.div>

        <motion.div className="p-5 rounded-xl border bg-card">
          <h2 className="text-sm text-muted-foreground">Coaches</h2>
          <p className="text-2xl font-bold">{stats?.coaches}</p>
        </motion.div>

      </div>

    </div>
  );
}