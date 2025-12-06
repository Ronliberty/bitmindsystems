"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const sampleProjects = [
  { title: "Brand Launch Campaign", client: "Nova Agency", category: "Marketing", status: "Published" },
  { title: "Music Video – Rising Star", client: "Indie Artist", category: "Film & Video", status: "In Progress" },
  { title: "Personal Trainer Portfolio", client: "Gym Coach Pro", category: "Web Design", status: "Draft" },
];

const sampleClients = [
  { name: "Nova Agency", projects: 3, rating: "★★★★★" },
  { name: "Indie Artist", projects: 2, rating: "★★★★☆" },
  { name: "Gym Coach Pro", projects: 1, rating: "★★★★★" },
];

const sampleTestimonials = [
  { client: "Nova Agency", feedback: "They elevated our brand image with outstanding visuals!" },
  { client: "Indie Artist", feedback: "Professional editing and creative direction — highly recommended." },
];

export default function PortfolioPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Projects */}
      <motion.div
        className="p-6 bg-card border border-border rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-4">📁 Recent Projects</h2>
        <ul className="space-y-3">
          {sampleProjects.map((proj) => (
            <li
              key={proj.title}
              className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
            >
              <div>
                <p className="font-medium">{proj.title}</p>
                <p className="text-xs text-muted-foreground">
                  {proj.client} · {proj.category}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  proj.status === "Published"
                    ? "bg-green-500/10 text-green-500"
                    : proj.status === "In Progress"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {proj.status}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Clients */}
      <motion.div
        className="p-6 bg-card border border-border rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4">👥 Clients</h2>
        <ul className="space-y-3">
          {sampleClients.map((client) => (
            <li
              key={client.name}
              className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition"
            >
              <p className="font-medium">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.projects} projects</p>
              <p className="text-yellow-400 text-sm">{client.rating}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        className="p-6 bg-card border border-border rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Star className="w-10 h-10 text-primary mb-2 mx-auto" />
        <h2 className="text-lg font-semibold mb-4 text-center">Client Testimonials</h2>
        <ul className="space-y-3">
          {sampleTestimonials.map((t) => (
            <li
              key={t.client}
              className="p-3 rounded-lg bg-muted/30 border border-border"
            >
              <p className="text-sm italic text-muted-foreground mb-1">“{t.feedback}”</p>
              <p className="text-sm font-medium text-right">— {t.client}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}