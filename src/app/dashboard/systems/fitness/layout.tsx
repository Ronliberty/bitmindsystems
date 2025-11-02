"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Dumbbell,
  Utensils,
  Users,
  Calendar,
  BarChart2,
  PlusCircle,
  ArrowLeft,
} from "lucide-react";

const quickActions = [
  { title: "Add Workout", icon: <Dumbbell className="w-6 h-6" />, href: "/dashboard/systems/fitness/workouts/new" },
  { title: "Add Meal Plan", icon: <PlusCircle className="w-6 h-6" />, href: "/dashboard/systems/fitness/meals/new" },
  { title: "View Users", icon: <Users className="w-6 h-6" />, href: "/dashboard/systems/fitness/members/list" },
  { title: "Community", icon: <BarChart2 className="w-6 h-6" />,  href: "https://fitness-six-pied.vercel.app/",  external: true },
  { title: "Events", icon: <Calendar className="w-6 h-6" />, href: "/dashboard/systems/fitness/events" },
];

export default function FitnessLayout({ children }: { children: React.ReactNode }) {
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
            🏋️‍♂️ Fitness Coach Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-2">
            Manage your clients, workout programs, and nutrition plans in one place.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-cyan-400 hover:underline mt-4"
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
          {quickActions.map((action) => action.external ? (
            <a
      key={action.title}
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all block"
    >
      <div className="flex justify-center mb-2 text-primary">{action.icon}</div>
      <p className="text-sm font-medium">{action.title}</p>
    </a>
  ) : (
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

        {/* Page Content */}
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
