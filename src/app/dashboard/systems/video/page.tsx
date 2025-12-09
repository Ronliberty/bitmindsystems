"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Film, Users, Upload, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VideoEditingDashboard() {
  const [projects] = useState([
    { title: "Music Video - Rise Up", status: "In Progress", duration: "3m 42s" },
    { title: "Brand Ad Campaign", status: "Completed", duration: "45s" },
    { title: "Short Film: The Journey", status: "Rendering", duration: "12m 08s" },
  ]);

  const [editors] = useState([
    { name: "Alex Morgan", role: "Lead Editor", active: true },
    { name: "Jamie Lee", role: "Color Grader", active: false },
    { name: "Chris Tan", role: "Sound Engineer", active: true },
  ]);

  const [recentUploads] = useState([
    { file: "scene1.mov", size: "1.2GB", uploaded: "2 hours ago" },
    { file: "intro_clip.mp4", size: "320MB", uploaded: "Yesterday" },
  ]);

  const [renderQueue] = useState([
    { name: "Documentary Cut v3", progress: 70 },
    { name: "Behind The Scenes", progress: 40 },
  ]);

 

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
       

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Projects */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">🎞️ Active Projects</h2>
            <ul className="space-y-3">
              {projects.map((proj) => (
                <li
                  key={proj.title}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{proj.title}</p>
                    <p className="text-xs text-muted-foreground">{proj.duration}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      proj.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : proj.status === "Rendering"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {proj.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/video/new"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + Create New Project
            </Link>
          </motion.div>

          {/* Editors */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">👥 Team Editors</h2>
            <ul className="space-y-3">
              {editors.map((editor) => (
                <li
                  key={editor.name}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{editor.name}</p>
                    <p className="text-xs text-muted-foreground">{editor.role}</p>
                  </div>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      editor.active ? "bg-green-400" : "bg-gray-500"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Render Queue */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">⚙️ Render Queue</h2>
            <ul className="space-y-4">
              {renderQueue.map((item) => (
                <li key={item.name}>
                  <p className="font-medium mb-1">{item.name}</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-600"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.progress}% complete
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recent Uploads */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold mb-4">📂 Recent Uploads</h2>
            <ul className="space-y-3">
              {recentUploads.map((file) => (
                <li
                  key={file.file}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{file.file}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {file.uploaded}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/video/upload"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + Upload New Footage
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
