"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  function validate(email: string, password: string) {
    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";

    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate(email, password);
    if (validationError) {
      setErr(validationError);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      await login(email, password);
      // console.log("✅ Login successful, redirecting...");
      router.push("/dashboard");
    } catch (e: any) {
      // console.error("❌ Login failed:", e);
       if (e?.response?.status === 401) {
        setErr("Invalid email or password");
      } else if (e?.response?.status === 400) {
        setErr(e?.response?.data?.detail || "Invalid request");
      } else if (e?.message === "Network Error") {
        setErr("Network error. Check your internet connection.");
      } else {
        setErr("Something went wrong. Try again.");
      }
      // setErr(e?.error || e?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }
 function handleGoogleLogin() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/`;
  }
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white relative overflow-hidden">
  
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
        <p className="text-gray-400 mb-8 text-sm">Welcome back! Please log in.</p>

        <form className="flex flex-col gap-4 text-left" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@example.com"
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-300">Password</label>
              <Link href="/auth/forgot" className="text-xs text-cyan-400 hover:text-cyan-300 transition">
                Forgot password?
              </Link>
            </div>
        
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              required
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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

         {/* <button
          onClick={handleGoogleLogin}
          className="mt-6 flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button> */}

       
      </motion.div>
    </div>
  );
}
