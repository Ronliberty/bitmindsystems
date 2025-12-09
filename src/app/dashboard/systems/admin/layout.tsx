// layout.tsx
"use client";

import { motion } from "framer-motion";
import { Users, BarChart2, Settings, Database, UserPlus,ArrowLeft } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Manage Users", icon: <Users className="w-6 h-6" />, href: "/systems/admin/users" },
  { title: "System Settings", icon: <Settings className="w-6 h-6" />, href: "/systems/admin/settings" },
  { title: "View Analytics", icon: <BarChart2 className="w-6 h-6" />, href: "/systems/admin/analytics" },
  { title: "Add New Admin", icon: <UserPlus className="w-6 h-6" />, href: "/systems/admin/new" },
  { title: "Server Monitor", icon: <Database className="w-6 h-6" />, href: "/systems/admin/servers" },
];

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            🧠 System Owners Dashboard
          </motion.h1>
          <p className="text-gray-400 mt-2">
            Oversee platform analytics, manage users, and ensure smooth operations across all systems.
          </p>
          <Link
      href="/dashboard"
      className="inline-flex items-center text-sm text-cyan-400 hover:underline mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Link>
        </header>

        {/* Quick Actions */}
         <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      href={action.href}
                      className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      <div className="flex justify-center mb-2 text-cyan-400">{action.icon}</div>
                      <p className="text-sm font-medium">{action.title}</p>
                    </Link>
                  ))}
                </motion.div>
        
        {/* Page content injected here */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}



