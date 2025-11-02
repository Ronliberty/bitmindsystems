"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Send, ChevronDown } from "lucide-react";

export default function CollaborationsPage() {
  const [selectedType, setSelectedType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const collabTypes = [
    "Singer",
    "Producer",
    "Songwriter",
    "Videographer",
    "Instrumentalist",
  ];

  const collaborations = [
    {
      name: "Luna Ray",
      role: "Singer / Songwriter",
      project: "Dream On (Acoustic)",
      status: "In Progress",
    },
    {
      name: "DJ Crave",
      role: "Producer",
      project: "Echoes (Remix)",
      status: "Pending",
    },
    {
      name: "Ava Noir",
      role: "Videographer",
      project: "Midnight Visualizer",
      status: "Completed",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* === Header === */}
      <motion.header
        className="space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-7 h-7 text-primary" />
          Collaborations
        </h1>
        <p className="text-muted-foreground">
          Connect, collaborate, and create with other artists.
        </p>
      </motion.header>

      {/* === Collaboration Form === */}
      <motion.form
        className="bg-card p-8 rounded-2xl border border-border space-y-6 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2
          className="text-xl font-semibold mb-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Plus className="w-5 h-5 text-primary" />
          Start a New Collaboration
        </motion.h2>

        {/* === Project Title === */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium">Project Title</label>
          <input
            type="text"
            placeholder="Enter project name"
            className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </motion.div>

        {/* === Collaboration Type (Custom Dropdown) === */}
        <motion.div
          className="flex flex-col space-y-2 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm font-medium">Collaboration Type</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between items-center w-full p-3 border rounded-lg bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary transition-all"
          >
            {selectedType || "Select type"}
            <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                >
                <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                    dropdownOpen ? "text-primary" : "text-muted-foreground"
                    }`}
                />
                </motion.div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                {collabTypes.map((type) => (
                  <li
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/60 transition ${
                      selectedType === type ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {type}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === Message === */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">Message</label>
          <textarea
            placeholder="Describe your project and what you’re looking for..."
            className="w-full p-3 border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary outline-none"
            rows={5}
          />
        </motion.div>

        {/* === Action Buttons === */}
        <motion.div
          className="flex items-center justify-end gap-4 pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="reset"
            className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted/40 transition font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-medium flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
            Send Request
          </motion.button>
        </motion.div>
      </motion.form>

      {/* === Collaboration List === */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold">Your Collaborations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborations.map((collab) => (
            <motion.div
              key={collab.name}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              whileHover={{ y: -3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{collab.name}</h3>
                  <p className="text-sm text-muted-foreground">{collab.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium">{collab.project}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded ${
                      collab.status === "Completed"
                        ? "bg-green-500/10 text-green-500"
                        : collab.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {collab.status}
                  </span>
                  <button className="text-sm text-primary hover:underline">View Details</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
