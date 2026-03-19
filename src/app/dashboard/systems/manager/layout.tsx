// // layout.tsx
// "use client";

// import { motion } from "framer-motion";
// import {  
//   LayoutDashboard,
//   DollarSign,
//   PieChart,
//   FileText,
//   BarChart3,
//   ArrowLeft
// } from "lucide-react";
// import Link from "next/link";

// const quickActions = [
//   { title: "Overview", icon: <LayoutDashboard className="w-6 h-6" />, href: "/dashboard/systems/manager" },
//     { title: "Partnership", icon: <DollarSign className="w-6 h-6" />, href: "/dashboard/systems/manager/partnership" },
//     { title: "News", icon: <PieChart className="w-6 h-6" />, href: "/dashboard/systems/manager/news" },
//     { title: "Jobs", icon: <FileText className="w-6 h-6" />, href: "/dashboard/systems/manager/jobs" },
//     { title: "Market", icon: <BarChart3 className="w-6 h-6" />, href: "/dashboard/systems/manager/market" },
//       { title: "Subscription", icon: <BarChart3 className="w-6 h-6" />, href: "/dashboard/systems/manager/subscription" },
// ];

// export default function ManagerLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <header className="mb-8">
//           <motion.h1
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold"
//           >
//              Manager Dashboard
//           </motion.h1>
//           <p className="text-muted-foreground mt-2">
//             Manage your App — all in one place.
//           </p>
//             <Link
//       href="/dashboard"
//       className="inline-flex items-center text-sm text-cyan-400 hover:underline mb-4"
//     >
//       <ArrowLeft className="w-4 h-4 mr-2" />
//       Back
//     </Link>
//         </header>

//         {/* Quick Actions */}
//         <motion.div
//           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {quickActions.map((action) => (
//             <Link
//               key={action.title}
//               href={action.href}
//               className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all"
//             >
//               <div className="flex justify-center mb-2 text-primary">{action.icon}</div>
//               <p className="text-sm font-medium">{action.title}</p>
//             </Link>
//           ))}
//         </motion.div>
//         <main className="mt-8">
//           {children}
//         </main>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  DollarSign,
  PieChart,
  FileText,
  BarChart3,
  Bot,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { title: "AI Assistant", icon: <Bot className="w-5 h-5" />, href: "/dashboard/systems/manager" },
  { title: "Partnership", icon: <DollarSign className="w-5 h-5" />, href: "/dashboard/systems/manager/partnership" },
  { title: "News", icon: <PieChart className="w-5 h-5" />, href: "/dashboard/systems/manager/news" },
  { title: "Jobs", icon: <FileText className="w-5 h-5" />, href: "/dashboard/systems/manager/jobs" },
  { title: "Market", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/systems/manager/market" },
  { title: "Subscription", icon: <BarChart3 className="w-5 h-5" />, href: "/dashboard/systems/manager/subscription" },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-5 hidden md:flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            AI-powered control
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "hover:bg-muted"
                  }
                `}
              >
                {item.icon}
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        
        {/* Header (fixed inside layout) */}
        <header className="h-16 border-b border-border flex items-center px-6 shrink-0 bg-background">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold"
          >
            Manager System
          </motion.h2>
        </header>

        {/* Scrollable Content ONLY */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
