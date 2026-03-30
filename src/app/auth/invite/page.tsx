"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { registerUserWithInvite } from "@/app/lib/auth/api";
import { useAuth } from "@/context/AuthContext";
function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export default function RegisterPage() {
  const router = useRouter();

  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  const [form, setForm] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("invite");
    setInviteToken(token);

    if (token) {
      const payload = decodeJwtPayload(token);
      setMeta(payload);
      if (payload?.email) {
        setForm((s) => ({ ...s, email: payload.email }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inviteToken) return;

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await register({
        email: form.email,
        phone_number: form.phone_number,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
        invite: inviteToken,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!inviteToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-red-500">
        No invite provided.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 text-white relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[10%] left-[20%] w-[40vmax] h-[40vmax] bg-cyan-500 rounded-full blur-[100px] opacity-20"
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-[35vmax] h-[35vmax] bg-blue-600 rounded-full blur-[120px] opacity-25"
          animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="w-[90%] max-w-md p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent text-center">
          BitMind Systems
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Complete your invite registration
        </p>

        {meta && (
          <div className="mb-6 text-sm bg-blue-500/10 border border-blue-400/20 p-3 rounded-lg">
            {/* <p>
              Role: <span className="text-cyan-400">{meta.role}</span>
            </p> */}
            {meta.email && (
              <p>
                Email: <span className="text-cyan-400">{meta.email}</span>
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="phone_number"
            placeholder="Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            required
            className="input"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="icon-btn"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="input pr-10"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="icon-btn"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-400 hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>

      {/* Reusable styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(31, 41, 55, 0.6);
          border: 1px solid #374151;
          font-size: 14px;
          outline: none;
        }
        .input:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.3);
        }
        .icon-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}