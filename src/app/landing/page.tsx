"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* ===== Navbar ===== */}
      <motion.nav
        className="w-full flex justify-between items-center px-8 py-6 border-b border-border bg-card/30 backdrop-blur-md sticky top-0 z-50"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          BitMind Systems
        </h1>
        <div className="flex gap-8 text-sm font-medium">
          <Link href="#about" className="hover:text-cyan-400 transition">About</Link>
          <Link href="#services" className="hover:text-cyan-400 transition">Services</Link>
          <Link href="#pricing" className="hover:text-cyan-400 transition">Pricing</Link>
          <Link href="#usecases" className="hover:text-cyan-400 transition">Use Cases</Link>
          <Link href="/auth/login" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition">
            Enter App
          </Link>
        </div>
      </motion.nav>

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-8 relative overflow-hidden">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Power Your <span className="text-cyan-400">Workflow</span> <br /> with BitMind Systems
        </motion.h1>
        <motion.p
          className="max-w-2xl text-gray-400 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          A modular digital system built for creators, trainers, editors, and business owners — all in one secure, intelligent platform.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/auth/login"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-semibold text-white shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="py-24 px-8 bg-card/40 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About BitMind Systems</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            BitMind Systems is a unified platform that helps you run your digital operations smarter — whether you're managing fitness clients, editing videos, or building a digital community.
            It adapts to your workflow, integrates your tools, and enhances your productivity with intelligence.
          </p>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "AI-Powered Analytics", desc: "Understand patterns, clients, and progress through intelligent data." },
              { title: "Integrated Media Tools", desc: "Upload, edit, and manage videos, music, or documents all in one hub." },
              { title: "Community Management", desc: "Engage users, schedule content, and monitor performance effortlessly." },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:shadow-cyan-500/10 transition"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Use Cases ===== */}
      <section id="usecases" className="py-24 px-8 bg-card/30 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Built for Every Industry</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { role: "Gym Owners", desc: "Manage memberships, track workouts, and create online programs." },
              { role: "Coaches", desc: "Schedule sessions, communicate with clients, and monitor progress." },
              { role: "Artists", desc: "Showcase projects, manage releases, and connect with fans." },
              { role: "Editors", desc: "Organize footage, collaborate, and deliver media faster." },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-cyan-400">{r.role}</h3>
                <p className="text-gray-400 mt-3">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="py-24 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Flexible Pricing</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { plan: "Starter", price: "$9/mo", desc: "For individuals and creators starting out." },
              { plan: "Pro", price: "$29/mo", desc: "For teams and professionals growing their audience." },
              { plan: "Enterprise", price: "Custom", desc: "Tailored solutions for organizations and studios." },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:shadow-cyan-500/10 transition"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2">{p.plan}</h3>
                <p className="text-4xl font-bold mb-4 text-cyan-400">{p.price}</p>
                <p className="text-gray-400 mb-6">{p.desc}</p>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full text-white font-semibold hover:opacity-90 transition">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-8 border-t border-border text-center text-gray-400">
        <p>© {new Date().getFullYear()} BitMind Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
