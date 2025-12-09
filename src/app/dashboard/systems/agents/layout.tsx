// layout.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, ListChecks, CreditCard, FileText } from "lucide-react";
import Link from "next/link";

const taskCategories = [
{ title: "Agent Tasks", icon: <ListChecks className="w-6 h-6" />, href: "/dashboard/systems/agents/tasks" },

  { title: "Payments", icon: <CreditCard className="w-6 h-6" />, href: "/dashboard/systems/agents/payment" },
  { title: "All Files", icon: <FileText className="w-6 h-6" />, href: "/dashboard/systems/agents/files" },
  { title: "Completed Tasks", icon: <CheckCircle className="w-6 h-6" />, href: "/dashboard/systems/agents/tasks/completed" },
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
            🛠️ Agent Task Hub
          </motion.h1>
          <p className="text-gray-400 mt-2">
            Manage customer tickets, create emails/designs, and track production tasks.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-cyan-400 hover:underline mt-2"
          >
            ← Back
          </Link>
        </header>

        {/* Quick Actions */}
         <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {taskCategories.map((cat) => (
                    <Link
                      key={cat.title}
                      href={cat.href}
                      className="p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                      <div className="flex justify-center mb-2 text-cyan-400">{cat.icon}</div>
                      <p className="text-sm font-medium">{cat.title}</p>
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



