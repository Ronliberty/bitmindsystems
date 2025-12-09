"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import {  Globe } from "lucide-react";


const userStats = [
  { label: "Active Users", value: "12,480", change: "+4.2%" },
  { label: "New Signups", value: "1,024", change: "+8.1%" },
  { label: "Churn Rate", value: "2.3%", change: "-0.4%" },
];

const systemsOverview = [
  { name: "Community", users: 5460, status: "Stable" },
  { name: "E-Commerce", users: 3270, status: "Stable" },
  { name: "Meals", users: 1420, status: "Maintenance" },
  { name: "Workouts", users: 2330, status: "Stable" },
];

export default function AdminDashboard() {
  return (
    <section className="min-h-screen w-full bg-[#0d0d0d] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
      

        {/* Quick Actions */}
       
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Stats */}
          <motion.div
            className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">👥 User Statistics</h2>
            <ul className="space-y-4">
              {userStats.map((stat) => (
                <li key={stat.label} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{stat.label}</p>
                    <p className="text-xs text-gray-400">{stat.change} this week</p>
                  </div>
                  <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Systems Overview */}
          <motion.div
            className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">🧩 Systems Overview</h2>
            <ul className="space-y-3">
              {systemsOverview.map((system) => (
                <li
                  key={system.name}
                  className="flex justify-between items-center p-3 rounded-lg bg-[#222] hover:bg-[#2a2a2a] transition"
                >
                  <div>
                    <p className="font-medium">{system.name}</p>
                    <p className="text-xs text-gray-400">{system.users.toLocaleString()} users</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      system.status === "Stable"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {system.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Analytics Overview */}
          <motion.div
            className="p-6 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Globe className="w-10 h-10 text-cyan-400 mb-2" />
            <h2 className="text-lg font-semibold mb-2">Global Analytics</h2>
            <p className="text-sm text-gray-400 mb-3">
              Track user engagement, uptime, and cross-system performance metrics.
            </p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              99.98% Uptime
            </p>
            <p className="text-sm text-gray-400 mt-1">+1.2% from last month</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
