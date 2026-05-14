"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return setErr("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setErr("Invalid email format");

    setLoading(true);
    setErr(null);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (e: any) {
      if (e?.message === "Network Error") {
        setErr("Network error. Check your internet connection.");
      } else {
        setErr("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[10%] left-[20%] w-[40vmax] h-[40vmax] bg-cyan-500 rounded-full blur-[100px] opacity-20"
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-[35vmax] h-[35vmax] bg-blue-600 rounded-full blur-[120px] opacity-25"
          animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      <motion.div
        className="w-[90%] max-w-md p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
          BitMind Systems
        </h1>

        {!sent ? (
          <>
            <p className="text-gray-400 mb-8 text-sm">
              Enter your email and we'll send you a reset link.
            </p>

            <form className="flex flex-col gap-4 text-left" onSubmit={onSubmit}>
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="your@example.com"
                    className="w-full pl-9 pr-3 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
                  />
                </div>
              </div>

              {err && <p className="text-red-500 text-sm">{err}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-4 py-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={48} className="text-cyan-400" />
            <p className="text-gray-300 text-sm leading-relaxed">
              If <span className="text-cyan-400">{email}</span> is registered,
              you'll receive a password reset link shortly. Check your inbox and spam folder.
            </p>
          </motion.div>
        )}

        <Link
          href="/auth/login"
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </motion.div>
    </div>
  );
}