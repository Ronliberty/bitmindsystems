"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const systems = [
  {
    title: "Fitness Coach",
    desc: "Workout tracking, clients & performance insights",
    href: "/dashboard/systems/fitness",
    gradient: "from-green-400 to-emerald-600",
    icon: "💪",
  },
  {
    title: "Artist Hub",
    desc: "Music, visuals & creative collaborations",
    href: "/dashboard/systems/artist",
    gradient: "from-pink-400 to-fuchsia-600",
    icon: "🎨",
  },
  {
    title: "Video Editing Studio",
    desc: "Collaborative video editing and publishing tools",
    href: "/dashboard/systems/video",
    gradient: "from-indigo-400 to-blue-600",
    icon: "🎬",
  },
  {
    title: "E-Commerce Owners",
    desc: "Online shop management & digital storefronts",
    href: "/dashboard/systems/ecommerce",
    gradient: "from-orange-400 to-amber-600",
    icon: "🛍️",
  },
  {
    title: "Portfolio Owners",
    desc: "Production  portfolio pages, market your business",
    href: "/dashboard/systems/portfolio",
    gradient: "from-red-400 to-rose-600",
    icon: "🎥",
  },
  {
    title: "Admins / System Owners",
    desc: "Manage users, billing & analytics",
    href: "/dashboard/systems/admin",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🧠",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center">
      <motion.div
        className="max-w-5xl w-full text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Welcome to BitMind Systems
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose a workspace to begin — each system is tailored for a specific domain.
        </p>
      </motion.div>

      {/* Grid of System Cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {systems.map((sys, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link
              href={sys.href}
              className={`block p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition relative overflow-hidden`}
            >
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${sys.gradient}`}
              ></div>
              <div className="relative z-10 flex flex-col gap-3 text-left">
                <div className="text-4xl">{sys.icon}</div>
                <h2 className="text-xl font-semibold">{sys.title}</h2>
                <p className="text-sm text-muted-foreground">{sys.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.footer
        className="mt-16 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        © {new Date().getFullYear()} BitMind Systems. All rights reserved.
      </motion.footer>
    </div>
  );
}
