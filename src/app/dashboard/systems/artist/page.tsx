"use client";

import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import Link from "next/link";

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

export default function ArtistDashboardPage() {
  return (
    <div>
      {/* Dashboard Header */}
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
      </header>

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
  );
}
