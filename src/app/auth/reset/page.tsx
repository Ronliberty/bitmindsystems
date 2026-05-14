"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const { confirmPasswordReset } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!uid || !token) {
      setErr("Invalid or missing reset link. Please request a new one.");
    }
  }, [uid, token]);

  function validate() {
    if (!newPassword) return "Password is required";
    if (newPassword.length < 8) return "Password must be at least 8 characters";
    if (newPassword !== confirmPassword) return "Passwords do not match";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setErr(validationError);
    if (!uid || !token) return setErr("Invalid reset link.");

    setLoading(true);
    setErr(null);
    try {
      await confirmPasswordReset(uid, token, newPassword, confirmPassword);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (e: any) {
      const detail = e?.response?.data?.detail;
      if (e?.response?.status === 400) {
        setErr(detail || "Invalid or expired reset link. Please request a new one.");
      } else if (e?.message === "Network Error") {
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

        {success ? (
          <motion.div
            className="flex flex-col items-center gap-4 py-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle size={48} className="text-cyan-400" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Password reset successful! Redirecting you to login...
            </p>
          </motion.div>
        ) : (
          <>
            <p className="text-gray-400 mb-8 text-sm">
              Enter your new password below.
            </p>

            {/* Invalid link state */}
            {(!uid || !token) ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <AlertCircle size={40} className="text-red-400" />
                <p className="text-red-400 text-sm">
                  Invalid or missing reset link. Please request a new one.
                </p>
                <Link
                  href="/forgot-password"
                  className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition text-sm"
                >
                  Request New Link
                </Link>
              </div>
            ) : (
              <form className="flex flex-col gap-4 text-left" onSubmit={onSubmit}>
                {/* New Password */}
                <div>
                  <label className="text-sm text-gray-300">New Password</label>
                  <div className="relative mt-1">
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type={showNew ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pr-10 pl-3 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm text-gray-300">Confirm Password</label>
                  <div className="relative mt-1">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pr-10 pl-3 py-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Password strength hint */}
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters.
                </p>

                {err && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {err}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </>
        )}

        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </motion.div>
    </div>
  );
}

// useSearchParams requires Suspense in Next.js 13+
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}