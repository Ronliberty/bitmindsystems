"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Dumbbell, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function AddWorkoutPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    difficulty: "",
    duration: "",
    description: "",
  });

  const [dropdown, setDropdown] = useState({
    category: false,
    difficulty: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = ["Strength", "Cardio", "Flexibility", "Endurance"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({
        name: "",
        category: "",
        difficulty: "",
        duration: "",
        description: "",
      });
    }, 1000);
  };

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* === Header === */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Dumbbell className="text-primary w-8 h-8" />
              Add New Workout
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and publish a new workout routine for your clients.
            </p>
          </div>

         
        </div>

        {/* === Form === */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Workout Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Workout Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Full Body Strength"
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Category + Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* === Category Dropdown === */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Category</label>
              <button
                type="button"
                onClick={() =>
                  setDropdown({
                    ...dropdown,
                    category: !dropdown.category,
                    difficulty: false,
                  })
                }
                className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
              >
                {form.category || "Select category"}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    dropdown.category ? "rotate-180 text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdown.category && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat}
                        onClick={() => {
                          setForm({ ...form, category: cat });
                          setDropdown({ ...dropdown, category: false });
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
                          form.category === cat ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {cat}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* === Difficulty Dropdown === */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <button
                type="button"
                onClick={() =>
                  setDropdown({
                    ...dropdown,
                    difficulty: !dropdown.difficulty,
                    category: false,
                  })
                }
                className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
              >
                {form.difficulty || "Select difficulty"}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    dropdown.difficulty ? "rotate-180 text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>

              <AnimatePresence>
                {dropdown.difficulty && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    {difficulties.map((level) => (
                      <li
                        key={level}
                        onClick={() => {
                          setForm({ ...form, difficulty: level });
                          setDropdown({ ...dropdown, difficulty: false });
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
                          form.difficulty === level ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {level}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g. 45"
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the workout routine and exercises..."
              rows={4}
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Workout"}
          </motion.button>

          {success && (
            <motion.p
              className="text-green-500 text-sm text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Workout added successfully!
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
