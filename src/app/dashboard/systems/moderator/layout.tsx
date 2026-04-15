

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
   LayoutDashboard,
    DollarSign,
    
    History,
    Timer,
    CircleCheck,
    CheckSquare,

   ArrowLeft,
 
} from "lucide-react";

const navItems = [
  { title: "Orverview", icon: <LayoutDashboard className="w-6 h-6" />, href: "/dashboard/systems/moderator" },
    { title: "My Tasks", icon: <CheckSquare className="w-6 h-6" />, href: "/dashboard/systems/moderator/tasks" },
    { title: "Approved Tasks", icon: <CircleCheck className="w-6 h-6" />, href: "/dashboard/systems/moderator/approved" },
    { title: "Ongoing projects", icon: <Timer className="w-6 h-6" />, href: "/dashboard/systems/moderator/active-projects" },
    { title: "History", icon: <History className="w-6 h-6" />, href: "/dashboard/systems/moderator/history" },
    { title: "Earnings", icon: <DollarSign className="w-6 h-6" />, href: "/dashboard/systems/moderator/earnings" },
];

export default function ModeratorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-5 hidden md:flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Agent
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
             Bms System
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
