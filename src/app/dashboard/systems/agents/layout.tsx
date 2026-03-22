

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
   LayoutDashboard,
  // DollarSign,
  // PieChart,
  // FileText,
  // BarChart3,
  Bot,
   ArrowLeft,
  CheckCircle, ListChecks, CreditCard, FileText
} from "lucide-react";

const navItems = [
   { title: "AI Assistant", icon: <Bot className="w-5 h-5" />, href: "/dashboard/systems/agents" },
  { title: "Agent Tasks", icon: <ListChecks className="w-6 h-6" />, href: "/dashboard/systems/agents/tasks" },

  { title: "Payments", icon: <CreditCard className="w-6 h-6" />, href: "/dashboard/systems/agents/payment" },
  { title: "All Files", icon: <FileText className="w-6 h-6" />, href: "/dashboard/systems/agents/files" },
  { title: "Completed Tasks", icon: <CheckCircle className="w-6 h-6" />, href: "/dashboard/systems/agents/tasks/completed" },
];

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-5 hidden md:flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            AI-powered control
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "hover:bg-muted"
                  }
                `}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        
        {/* Header (fixed inside layout) */}
        <header className="h-16 border-b border-border flex items-center px-6 shrink-0 bg-background">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold"
          >
            Manager System
          </motion.h2>
        </header>

        {/* Scrollable Content ONLY */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
