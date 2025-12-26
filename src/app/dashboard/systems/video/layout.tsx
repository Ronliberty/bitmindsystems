// layout.tsx
"use client";

import { motion } from "framer-motion";
import { Film, ArrowLeft, CreditCard, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Overview", icon: <LayoutDashboard className="w-6 h-6" />, href: "/dashboard/systems/video" },
    { title: "Tasks", icon: <Film className="w-6 h-6" />, href: "/dashboard/systems/video/tasks" },
    { title: "Payments", icon: <CreditCard className="w-6 h-6" />, href: "/dashboard/systems/video/payment" },
{ title: "All Files", icon: <FileText className="w-6 h-6" />, href: "/dashboard/systems/video/files" },
  
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
            🎬 Video Editing Studio Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-2">
            Manage video projects, track renders, collaborate with editors, and organize uploads — all in one studio.
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
              className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-center mb-2 text-primary">{action.icon}</div>
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


// page.tsx
