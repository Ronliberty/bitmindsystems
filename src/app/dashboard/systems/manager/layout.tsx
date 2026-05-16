"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import {
  LayoutDashboard,
  DollarSign,
  PieChart,
  FileText,
  BarChart3,
  Bot,
  ArrowLeft,
  X,
  Menu,
} from "lucide-react";

const navItems = [
  { title: "AI Assistant", icon: <Bot className="w-5 h-5" />, href: "/dashboard/systems/manager" },
  { title: "Project", icon: <DollarSign className="w-5 h-5" />, href: "/dashboard/systems/manager/projects" },
  { title: "Taks", icon: <PieChart className="w-5 h-5" />, href: "/dashboard/systems/manager/tasks" },
  { title: "Jobs", icon: <FileText className="w-5 h-5" />, href: "/dashboard/systems/manager/jobs" },
  { title: "Market", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/systems/manager/market" },
  { title: "Subscription", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/systems/manager/subscription" },
];

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  /* ================= BLOCK RENDER BEFORE REDIRECT ================= */
  if (!user) return null;

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="w-64 border-r border-border bg-card p-5 hidden md:flex flex-col">
        <SidebarContent
          pathname={pathname}
          closeSidebar={() => setSidebarOpen(false)}
        />
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 p-5 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <SidebarContent
                pathname={pathname}
                closeSidebar={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 bg-background">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold"
          >
            Bms System
          </motion.h2>

          {/* spacer */}
          <div className="w-6 md:hidden" />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ================= SIDEBAR CONTENT ================= */

function SidebarContent({
  pathname,
  closeSidebar,
}: {
  pathname: string;
  closeSidebar: () => void;
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          Editor
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
              onClick={closeSidebar}
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
          onClick={closeSidebar}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
    </>
  );
}