"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const rolePermissions: Record<string, string[]> = {
  manager: [ "elite", "porta", "manager"], 
  elite: ["elite"],                    
  employee: ["employee"],                       
  coach: ["coach"],
  artist: ["artist"],
  porta: ["porta"],
  finance: ["finance"],
  mod: ["moderator"],
  // add more later like "vip", "pro", etc.
};
const defaultSystems = [
  {
    title: "Fitness Coach",
    desc: "Workout tracking, clients & performance insights",
    href: "/dashboard/systems/fitness",
    gradient: "from-green-400 to-emerald-600",
    icon: "💪",
    requiredType: "coach",
  },
  {
    title: "Artist Hub",
    desc: "Music, visuals & creative collaborations",
    href: "/dashboard/systems/artist",
    gradient: "from-pink-400 to-fuchsia-600",
    icon: "🎨",
    requiredType: "artist",
  },
  {
    title: "Agents & Support",
    desc: "Customer support & ticketing system",
    href: "/dashboard/systems/agents",
    gradient: "from-pink-400 to-blue-600",
    icon: "🛎️",
    requiredType: "employee", // <-- add required type
  },
  {
    title: "Video Editing Studio",
    desc: "Collaborative video editing and publishing tools",
    href: "/dashboard/systems/video",
    gradient: "from-indigo-400 to-blue-600",
    icon: "🎬",
    requiredType: "employee",
  },
  {
    title: "E-Commerce Owners",
    desc: "Online shop management & digital storefronts",
    href: "/dashboard/systems/ecommerce",
    gradient: "from-orange-400 to-amber-600",
    icon: "🛍️",
    requiredType: "elite",
  },
  {
    title: "Portfolio Owners",
    desc: "Production portfolio pages, market your business",
    href: "/dashboard/systems/portfolio",
    gradient: "from-red-400 to-rose-600",
    icon: "🎥",
    requiredType: "porta",
  },
   {
    title: "Finance / Manager",
    desc: "Manage users, billing & analytics",
    href: "/dashboard/systems/finance",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🧠",
    requiredType: "finance",
  },
  {
    title: "Moderator / Manager",
    desc: "Manage users, billing & analytics",
    href: "/dashboard/systems/moderator",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🧠",
    requiredType: "moderator",
  },
];

export default function Dashboard({ systems }: { systems?: any[] }) {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const [requiredRole, setRequiredRole] = useState<string>("");
const userType = user?.user_type;
const canAccess = (requiredType?: string) => {
    if (!requiredType) return true; // no restriction = everyone
    if (!userType) return false;

    const allowedTypes = rolePermissions[userType];
    return allowedTypes ? allowedTypes.includes(requiredType) : false;
  };
  const accessibleSystems = (systems || defaultSystems).filter((sys) =>
    canAccess(sys.requiredType)
  );
    
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleSystemClick = (sys: any) => {
    if (!canAccess(sys.requiredType)) {
      setRequiredRole(sys.requiredType || "restricted");
      setShowPopup(true);
      return;
    }
    router.push(sys.href);
  };

  // Use the prop if provided, else fallback to default
  const activeSystems = systems || defaultSystems;

  return (
  <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

      <motion.div
        className="max-w-5xl w-full text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Welcome back, {user?.name || user?.email}!
        </h1>
        <p className="text-muted-foreground text-lg">
          {accessibleSystems.length === 0
            ? "No systems available for your current role."
            : "Select a workspace to get started."}
        </p>
      </motion.div>

      {accessibleSystems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground mb-4">
            Role: <span className="font-bold capitalize">{userType || "Guest"}</span>
          </p>
          <p>Contact support to upgrade your access.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {accessibleSystems.map((sys, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                onClick={() => handleSystemClick(sys)}
                className="cursor-pointer block p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition relative overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${sys.gradient}`} />
                <div className="relative z-10 flex flex-col gap-3 text-left">
                  <div className="text-5xl">{sys.icon}</div>
                  <h2 className="text-xl font-semibold">{sys.title}</h2>
                  <p className="text-sm text-muted-foreground">{sys.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Access denied popup (fallback) */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-2xl shadow-2xl border border-white/10"
          >
            <div className="text-6xl mb-4">Locked</div>
            <h2 className="text-2xl font-bold mb-3">Restricted Access</h2>
            <p className="text-gray-300 mb-6">
              This system requires <span className="text-cyan-400 font-bold capitalize">{requiredRole}</span> privileges.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-8 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}

      <motion.footer
        className="mt-20 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} BitMind Systems • Role: {userType || "Unknown"}
      </motion.footer>
    </div>
  );
}