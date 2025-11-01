"use client";

import { motion } from "framer-motion";
import { Dumbbell, Utensils, Users, Calendar, BarChart2, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Add Workout", icon: <Dumbbell className="w-6 h-6" />, href: "/fitness/workouts/new" },
  { title: "Add Meal Plan", icon: <PlusCircle className="w-6 h-6" />, href: "/fitness/meals/new" },
  { title: "View Users", icon: <Users className="w-6 h-6" />, href: "/fitness/users" },
  { title: "Community", icon: <BarChart2 className="w-6 h-6" />, href: "/fitness/community" },
  { title: "Events", icon: <Calendar className="w-6 h-6" />, href: "/fitness/events" },
];

const sampleMealPlans = [
  { name: "Lean Muscle Plan", calories: "2,200 kcal", meals: 5, goal: "Muscle Gain" },
  { name: "Fat Loss Plan", calories: "1,800 kcal", meals: 4, goal: "Fat Reduction" },
  { name: "Maintenance Plan", calories: "2,000 kcal", meals: 3, goal: "Balance" },
];

const sampleUsers = [
  { name: "Alex Mwangi", goal: "Muscle Gain", progress: "70%" },
  { name: "Jane Wanjiru", goal: "Fat Loss", progress: "45%" },
  { name: "Kevin Otieno", goal: "Endurance", progress: "60%" },
];

export default function FitnessDashboard() {
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

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Active Users */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">👥 Active Clients</h2>
            <ul className="space-y-3">
              {sampleUsers.map((user) => (
                <li
                  key={user.name}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.goal}</p>
                  </div>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                    {user.progress}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Meal Plans */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">🥗 Meal Plans</h2>
            <ul className="space-y-3">
              {sampleMealPlans.map((plan) => (
                <li
                  key={plan.name}
                  className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition"
                >
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {plan.calories} · {plan.meals} meals/day · {plan.goal}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/fitness/meals/new"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + Add New Meal Plan
            </Link>
          </motion.div>

          {/* Progress Chart Placeholder */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BarChart2 className="w-10 h-10 text-primary mb-2" />
            <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
            <p className="text-sm text-muted-foreground">
              Visual stats and progress charts coming soon.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
