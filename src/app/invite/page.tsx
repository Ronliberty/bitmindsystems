// "use client";

// export const dynamic = "force-dynamic"; // 🔥 prevents prerendering

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { registerUserWithInvite } from "../lib/api"; 

// // optional simple decoder to peek JWT payload (no verification client-side)
// function decodeJwtPayload(token: string) {
//   try {
//     const payload = token.split(".")[1];
//     const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
//     return JSON.parse(decoded);
//   } catch (e) {
//     return null;
//   }
// }

// export default function RegisterPage() {
//   const router = useRouter();
//   const [inviteToken, setInviteToken] = useState<string | null>(null);
//   const [meta, setMeta] = useState<any>(null);
//   const [form, setForm] = useState({
//     email: "",
//     phone_number: "",
//     name: "",
//     passkey: "",
//   });
//   const [error, setError] = useState("");

//   // ✅ Grab query from URL **after hydration**
//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const token = searchParams.get("invite");
//     setInviteToken(token);

//     if (token) {
//       const payload = decodeJwtPayload(token);
//       setMeta(payload);
//       if (payload?.email) setForm((s) => ({ ...s, email: payload.email }));
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!inviteToken) return;

//     try {
//       await registerUserWithInvite({ ...form, invite: inviteToken });
//       router.push("/auth/login");
//     } catch (err: any) {
//       console.error(err.response?.data || err);
//       setError(err.response?.data || "Registration failed");
//     }
//   };

//   if (!inviteToken) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-100">
//         <p className="text-red-600">No invite provided.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
//         <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
//           Register
//         </h1>

//         {meta && (
//           <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-gray-700">
//             <p>
//               Invite role: <strong className="text-blue-700">{meta.role}</strong>
//             </p>
//             {meta.email && (
//               <p>
//                 Invited email: <strong className="text-blue-700">{meta.email}</strong>
//               </p>
//             )}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             name="phone_number"
//             placeholder="Phone number"
//             value={form.phone_number}
//             onChange={handleChange}
//             required
//             className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             name="name"
//             placeholder="Full name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             name="passkey"
//             type="password"
//             placeholder="Password"
//             value={form.passkey}
//             onChange={handleChange}
//             required
//             className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             disabled={!inviteToken}
//             className={`w-full rounded-lg px-4 py-3 font-medium text-white shadow-md transition ${
//               inviteToken
//                 ? "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                 : "cursor-not-allowed bg-gray-400"
//             }`}
//           >
//             Register
//           </button>
//         </form>

//         {error && (
//           <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-red-50 p-3 text-sm text-red-600">
//             {JSON.stringify(error, null, 2)}
//           </pre>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { registerUserWithInvite } from "@/app/lib/api";

function decodeJwtPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export default function InviteRegisterPage() {
  const router = useRouter();
  const search = useSearchParams();
  const inviteToken = search?.get("invite") || "";

  const [meta, setMeta] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inviteToken) return;
    const p = decodeJwtPayload(inviteToken);
    setMeta(p);
    if (p?.email) setForm((prev) => ({ ...prev, email: p.email }));
  }, [inviteToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerUserWithInvite({ ...form, invite: inviteToken });
      router.push("/auth/login");
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

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

      {/* Register Card */}
      <motion.div
        className="w-[90%] max-w-md p-8 rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-white/10 shadow-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
          BitMind Systems
        </h1>
        <p className="text-gray-400 mb-8 text-sm">Create your account</p>

        {meta && (
          <div className="mb-6 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-300">
            <p>
              You’ve been invited as{" "}
              <strong className="text-cyan-400">{meta.role || "member"}</strong>
            </p>
            {meta.email && (
              <p>
                Email: <strong className="text-cyan-300">{meta.email}</strong>
              </p>
            )}
          </div>
        )}

        {!inviteToken && (
          <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-400/30">
            No invite token provided.
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-gray-800/60 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!inviteToken || loading}
            className={`mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Sign-Up */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex items-center justify-center gap-3 w-full border border-gray-700 py-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/70 transition"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </motion.button>

        <p className="text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
}
