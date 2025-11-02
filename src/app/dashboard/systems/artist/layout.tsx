"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Video, Users, BarChart2, Palette, ArrowLeft } from "lucide-react";

const quickActions = [
  { title: "Upload Song", icon: <Music className="w-6 h-6" />, href: "/dashboard/systems/artist/upload" },
  { title: "Upload Video", icon: <Video className="w-6 h-6" />, href: "/dashboard/systems/artist/videos/" },
  { title: "My Collaborations", icon: <Users className="w-6 h-6" />, href: "/dashboard/systems/artist/collabs" },

  { title: "Analytics", icon: <BarChart2 className="w-6 h-6" />, href: "/dashboard/systems/artist/analytics" },
    { title: "Overview", icon: <Palette className="w-6 h-6" />, href: "/dashboard/systems/artist" },
];

export default function ArtistLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Quick Actions Navigation */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
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

        {/* Page content */}
        {children}
      </div>
    </section>
  );
}
