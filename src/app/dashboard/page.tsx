

// "use client";

// import { motion } from "framer-motion";
// import { useAuth } from "@/context/AuthContext";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const rolePermissions: Record<string, string[]> = {
//   manager: ["manager"],
//   elite: ["elite"],
//   employee: ["employee"],
//   agent: ["agent"],
//   editor: ["editor"],
//   coach: ["coach"],
//   artist: ["artist"],
//   porta: ["porta"],
//   finance: ["finance"],
//   mod: ["moderator"],
//   admin: ["admin"],
// };

// const defaultSystems = [
//   {
//     title: "Fitness Coach",
//     desc: "Workout tracking, clients & performance insights",
//     href: "/dashboard/systems/fitness",
//     gradient: "from-green-400 to-emerald-600",
//     icon: "💪",
//     requiredType: "coach",
//   },
//   {
//     title: "Artist Hub",
//     desc: "Music, visuals & creative collaborations",
//     href: "/dashboard/systems/artist",
//     gradient: "from-pink-400 to-fuchsia-600",
//     icon: "🎨",
//     requiredType: "artist",
//   },
//   {
//     title: "Agents & Support",
//     desc: "Customer support & ticketing system",
//     href: "/dashboard/systems/agents",
//     gradient: "from-pink-400 to-blue-600",
//     icon: "🛎️",
//     requiredType: "employee",
//   },
//   {
//     title: "Video Editing Studio",
//     desc: "Collaborative video editing and publishing tools",
//     href: "/dashboard/systems/video",
//     gradient: "from-indigo-400 to-blue-600",
//     icon: "🎬",
//     requiredType: "employee",
//   },
//   {
//     title: "E-Commerce Owners",
//     desc: "Online shop management & digital storefronts",
//     href: "/dashboard/systems/ecommerce",
//     gradient: "from-orange-400 to-amber-600",
//     icon: "🛍️",
//     requiredType: "elite",
//   },
//   {
//     title: "Portfolio Owners",
//     desc: "Production portfolio pages, market your business",
//     href: "/dashboard/systems/portfolio",
//     gradient: "from-red-400 to-rose-600",
//     icon: "🎥",
//     requiredType: "porta",
//   },
//   {
//     title: "Finance / Manager",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/finance",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "finance",
//   },
//   {
//     title: "Moderator / Manager",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/moderator",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "moderator",
//   },
//   {
//     title: "Nayo / Manager",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/manager",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "manager",
//   },
//   {
//     title: "Admin Dashboard",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/admin",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "admin",
//   },
//    {
//     title: "editor",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/video",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "editor",
//   },
//    {
//     title: "Agent Dashboard",
//     desc: "Manage users, billing & analytics",
//     href: "/dashboard/systems/agents",
//     gradient: "from-cyan-400 to-blue-500",
//     icon: "🧠",
//     requiredType: "agent",
//   },
// ];

// export default function Dashboard({ systems }: { systems?: any[] }) {
//   const router = useRouter();
//   const { user, logout, isLoggedIn, loading } = useAuth();

//   const [showPopup, setShowPopup] = useState(false);
//   const [requiredRole, setRequiredRole] = useState("");

//   /* ---------------- 🔒 REDIRECT IF NOT LOGGED IN ---------------- */
//   useEffect(() => {
//     if (!loading && !isLoggedIn) {
//       router.push("/auth/login");
//     }
//   }, [isLoggedIn, loading]);

//   /* ---------------- ⏳ LOADING STATE ---------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center animate-pulse">
      
//       {/* Header skeleton */}
//       <div className="max-w-5xl w-full text-center mb-12">
//         <div className="h-10 w-2/3 mx-auto bg-gray-700 rounded mb-4" />
//         <div className="h-5 w-1/2 mx-auto bg-gray-800 rounded" />
//       </div>

//       {/* Grid skeleton */}
//       <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
//         {[...Array(9)].map((_, i) => (
//           <div
//             key={i}
//             className="p-6 rounded-2xl border border-border bg-card space-y-4"
//           >
//             <div className="h-12 w-12 bg-gray-700 rounded" />
//             <div className="h-5 w-3/4 bg-gray-700 rounded" />
//             <div className="h-4 w-full bg-gray-800 rounded" />
//             <div className="h-4 w-2/3 bg-gray-800 rounded" />
//           </div>
//         ))}
//       </div>
//     </div>
//     );
//   }

//   const userType = user?.user_type;

//   const canAccess = (requiredType?: string) => {
//     if (!requiredType) return true;
//     if (!userType) return false;

//     const allowedTypes = rolePermissions[userType];
//     return allowedTypes ? allowedTypes.includes(requiredType) : false;
//   };

//   const accessibleSystems = (systems || defaultSystems).filter((sys) =>
//     canAccess(sys.requiredType)
//   );

//   const handleLogout = async () => {
//     await logout();
//     router.push("/");
//   };

//   const handleSystemClick = (sys: any) => {
//     if (!canAccess(sys.requiredType)) {
//       setRequiredRole(sys.requiredType || "restricted");
//       setShowPopup(true);
//       return;
//     }
//     router.push(sys.href);
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center">
//       <button
//         onClick={handleLogout}
//         className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//       >
//         Logout
//       </button>

//       <motion.div
//         className="max-w-5xl w-full text-center mb-12"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//           Welcome back, {user?.name || user?.email}!
//         </h1>
//         <p className="text-muted-foreground text-lg">
//           {accessibleSystems.length === 0
//             ? "No systems available for your current role."
//             : "Select a workspace to get started."}
//         </p>
//       </motion.div>

//       {accessibleSystems.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-2xl text-muted-foreground mb-4">
//             Role:{" "}
//             <span className="font-bold capitalize">
//               {userType || "Guest"}
//             </span>
//           </p>
//           <p>Contact support to upgrade your access.</p>
//         </div>
//       ) : (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
//           {accessibleSystems.map((sys, i) => (
//             <motion.div key={i} whileHover={{ scale: 1.05, y: -4 }}>
//               <div
//                 onClick={() => handleSystemClick(sys)}
//                 className="cursor-pointer p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition relative overflow-hidden"
//               >
//                 <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${sys.gradient}`} />
//                 <div className="relative z-10 flex flex-col gap-3 text-left">
//                   <div className="text-5xl">{sys.icon}</div>
//                   <h2 className="text-xl font-semibold">{sys.title}</h2>
//                   <p className="text-sm text-muted-foreground">{sys.desc}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {showPopup && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full text-center">
//             <div className="text-6xl mb-4">🔒</div>
//             <h2 className="text-2xl font-bold mb-3">Restricted Access</h2>
//             <p className="text-gray-300 mb-6">
//               Requires{" "}
//               <span className="text-cyan-400 font-bold capitalize">
//                 {requiredRole}
//               </span>
//             </p>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="px-6 py-2 bg-cyan-500 text-black rounded-xl"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}

//       <footer className="mt-20 text-sm text-muted-foreground">
//         © {new Date().getFullYear()} BitMind Systems • Role:{" "}
//         {userType || "Unknown"}
//       </footer>
//     </div>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const defaultSystems = [
  {
    title: "Fitness Coach",
    desc: "Workout tracking, clients & performance insights",
    href: "/dashboard/systems/fitness",
    gradient: "from-green-400 to-emerald-600",
    icon: "💪",
    requiredGroup: "coach",
  },
  {
    title: "Artist Hub",
    desc: "Music, visuals & creative collaborations",
    href: "/dashboard/systems/artist",
    gradient: "from-pink-400 to-fuchsia-600",
    icon: "🎨",
    requiredGroup: "artist",
  },
  {
    title: "Agents & Support",
    desc: "Customer support & ticketing system",
    href: "/dashboard/systems/agents",
    gradient: "from-pink-400 to-blue-600",
    icon: "🛎️",
    requiredGroup: "employee",
  },
  {
    title: "Video Editing Studio",
    desc: "Collaborative video editing and publishing tools",
    href: "/dashboard/systems/video",
    gradient: "from-indigo-400 to-blue-600",
    icon: "🎬",
    requiredGroup: "employee",
  },
  {
    title: "E-Commerce Owners",
    desc: "Online shop management & digital storefronts",
    href: "/dashboard/systems/ecommerce",
    gradient: "from-orange-400 to-amber-600",
    icon: "🛍️",
    requiredGroup: "elite",
  },
  {
    title: "Portfolio Owners",
    desc: "Production portfolio pages, market your business",
    href: "/dashboard/systems/portfolio",
    gradient: "from-red-400 to-rose-600",
    icon: "🎥",
    requiredGroup: "porta",
  },
  {
    title: "Finance Dashboard",
    desc: "Manage billing, payroll & analytics",
    href: "/dashboard/systems/finance",
    gradient: "from-cyan-400 to-blue-500",
    icon: "💰",
    requiredGroup: "finance",
  },
  {
    title: "Moderator Dashboard",
    desc: "Moderate users and platform content",
    href: "/dashboard/systems/moderator",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🛡️",
    requiredGroup: "moderator",
  },
  {
    title: "Manager Dashboard",
    desc: "Manage teams and operations",
    href: "/dashboard/systems/manager",
    gradient: "from-cyan-400 to-blue-500",
    icon: "📊",
    requiredGroup: "manager",
  },
  {
    title: "Admin Dashboard",
    desc: "Full system administration access",
    href: "/dashboard/systems/admin",
    gradient: "from-cyan-400 to-blue-500",
    icon: "🧠",
    requiredGroup: "admin",
  },
  {
    title: "Editor Dashboard",
    desc: "Video editing and publishing tools",
    href: "/dashboard/systems/video",
    gradient: "from-cyan-400 to-blue-500",
    icon: "✂️",
    requiredGroup: "editor",
  },
  {
    title: "Agent Dashboard",
    desc: "Client support and outreach tools",
    href: "/dashboard/systems/agents",
    gradient: "from-cyan-400 to-blue-500",
    icon: "📞",
    requiredGroup: "agent",
  },
];

export default function Dashboard({
  systems,
}: {
  systems?: any[];
}) {
  const router = useRouter();
  const { user, logout, isLoggedIn, loading } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [requiredGroup, setRequiredGroup] = useState("");

  /* ---------------- 🔒 REDIRECT IF NOT LOGGED IN ---------------- */
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, loading, router]);

  /* ---------------- ⏳ LOADING STATE ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center animate-pulse">
        {/* Header skeleton */}
        <div className="max-w-5xl w-full text-center mb-12">
          <div className="h-10 w-2/3 mx-auto bg-gray-700 rounded mb-4" />
          <div className="h-5 w-1/2 mx-auto bg-gray-800 rounded" />
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card space-y-4"
            >
              <div className="h-12 w-12 bg-gray-700 rounded" />
              <div className="h-5 w-3/4 bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-800 rounded" />
              <div className="h-4 w-2/3 bg-gray-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- 👥 GROUPS ---------------- */
  const userGroups: string[] = user?.groups || [];

  const canAccess = (requiredGroup?: string) => {
    if (!requiredGroup) return true;

    return userGroups.includes(requiredGroup);
  };

  const accessibleSystems = (systems || defaultSystems).filter((sys) =>
    canAccess(sys.requiredGroup)
  );

  /* ---------------- 🚪 LOGOUT ---------------- */
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  /* ---------------- 🖱️ SYSTEM CLICK ---------------- */
  const handleSystemClick = (sys: any) => {
    if (!canAccess(sys.requiredGroup)) {
      setRequiredGroup(sys.requiredGroup || "restricted");
      setShowPopup(true);
      return;
    }

    router.push(sys.href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 flex flex-col items-center">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Header */}
      <motion.div
        className="max-w-5xl w-full text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Welcome back,{" "}
          {user?.first_name || user?.email || "User"}!
        </h1>

        <p className="text-muted-foreground text-lg">
          {accessibleSystems.length === 0
            ? "No systems available for your current groups."
            : "Select a workspace to get started."}
        </p>

        <div className="mt-4 text-sm text-cyan-400">
          Groups:{" "}
          {userGroups.length > 0
            ? userGroups.join(", ")
            : "No Groups"}
        </div>
      </motion.div>

      {/* Empty State */}
      {accessibleSystems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-muted-foreground mb-4">
            Groups:{" "}
            <span className="font-bold capitalize">
              {userGroups.length > 0
                ? userGroups.join(", ")
                : "Guest"}
            </span>
          </p>

          <p>Contact support to upgrade your access.</p>
        </div>
      ) : (
        /* Systems Grid */
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {accessibleSystems.map((sys, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div
                onClick={() => handleSystemClick(sys)}
                className="cursor-pointer p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${sys.gradient}`}
                />

                <div className="relative z-10 flex flex-col gap-3 text-left">
                  <div className="text-5xl">{sys.icon}</div>

                  <h2 className="text-xl font-semibold">
                    {sys.title}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {sys.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Restricted Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🔒</div>

            <h2 className="text-2xl font-bold mb-3">
              Restricted Access
            </h2>

            <p className="text-gray-300 mb-6">
              Requires{" "}
              <span className="text-cyan-400 font-bold capitalize">
                {requiredGroup}
              </span>{" "}
              group
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-cyan-500 text-black rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 text-sm text-muted-foreground">
        © {new Date().getFullYear()} BitMind Systems • Groups:{" "}
        {userGroups.length > 0
          ? userGroups.join(", ")
          : "Unknown"}
      </footer>
    </div>
  );
}