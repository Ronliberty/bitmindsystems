"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);



   async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await login(email, password);
      console.log("✅ Login successful, redirecting...");
      router.push("/dashboard");
    } catch (e: any) {
      console.error("❌ Login failed:", e);
      setErr(e?.error || e?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white relative overflow-hidden">
      {/* Background Animated Lights */}
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

      {/* Login Card */}
      <motion.div
        className="w-[90%] max-w-md p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
          BitMind Systems
        </h1>
        <p className="text-gray-400 mb-8 text-sm">Welcome back! Please log in.</p>

        {/* Form */}
        <form className="flex flex-col gap-4 text-left">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
               required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              value={password}
             onChange={(e) => setPassword(e.target.value)}
            // placeholder="Password"
              placeholder="••••••••"
              required

              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>
          <button
            type="submit"
             disabled={loading}
            className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition"
          >
            
             {loading ? "Signing in..." : "Sign in"}
          </button>
           {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Sign-In */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center justify-center gap-3 w-full border border-gray-700 py-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/70 transition"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </motion.button>

        <p className="text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-cyan-400 hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

