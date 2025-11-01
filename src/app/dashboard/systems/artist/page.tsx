"use client";

import { motion } from "framer-motion";
import { Music, Video, Users, BarChart2, Palette, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Upload Song", icon: <Music className="w-6 h-6" />, href: "/artist/upload" },
  { title: "Upload Video", icon: <Video className="w-6 h-6" />, href: "/artist/videos/upload" },
  { title: "My Collaborations", icon: <Users className="w-6 h-6" />, href: "/artist/collabs" },
  { title: "Design Artwork", icon: <Palette className="w-6 h-6" />, href: "/artist/design" },
  { title: "Analytics", icon: <BarChart2 className="w-6 h-6" />, href: "/artist/analytics" },
];

const sampleTracks = [
  { name: "Midnight Drive", plays: "120K", likes: "4.8K", status: "Published" },
  { name: "Lost Frequencies", plays: "89K", likes: "3.2K", status: "Published" },
  { name: "Ocean Eyes", plays: "62K", likes: "2.4K", status: "Draft" },
];

const sampleCollabs = [
  { name: "DJ Nova", project: "Remix EP", status: "Ongoing" },
  { name: "Kendra", project: "Music Video", status: "In Review" },
  { name: "Zane", project: "Single Production", status: "Completed" },
];

export default function ArtistDashboard() {
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
            🎨 Artist Hub Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-2">
            Manage your music, visuals, collaborations, and audience insights — all in one hub.
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
          {/* Uploaded Tracks */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">🎧 Uploaded Tracks</h2>
            <ul className="space-y-3">
              {sampleTracks.map((track) => (
                <li
                  key={track.name}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{track.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {track.plays} plays · {track.likes} likes
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                    {track.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/artist/upload"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + Upload New Track
            </Link>
          </motion.div>

          {/* Collaborations */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">🤝 Collaborations</h2>
            <ul className="space-y-3">
              {sampleCollabs.map((collab) => (
                <li
                  key={collab.name}
                  className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition"
                >
                  <p className="font-medium">{collab.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {collab.project} · {collab.status}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/artist/collabs"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + New Collaboration
            </Link>
          </motion.div>

          {/* Analytics Overview */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BarChart2 className="w-10 h-10 text-primary mb-2" />
            <h2 className="text-lg font-semibold mb-2">Performance Analytics</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Track your total streams, fan growth, and community engagement.
            </p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-fuchsia-500">
              2.4M Streams
            </p>
            <p className="text-sm text-muted-foreground mt-1">+8% this week</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
