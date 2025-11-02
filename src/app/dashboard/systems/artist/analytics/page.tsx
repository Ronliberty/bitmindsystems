"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Music, Video, DollarSign, PieChart as PieIcon } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { title: "Community Members", value: "12,540", icon: <Users className="w-6 h-6 text-blue-500" /> },
    { title: "Subscribers", value: "3,210", icon: <DollarSign className="w-6 h-6 text-green-500" /> },
    { title: "Free Plan Users", value: "9,330", icon: <PieIcon className="w-6 h-6 text-yellow-500" /> },
    { title: "Songs Released", value: "48", icon: <Music className="w-6 h-6 text-purple-500" /> },
    { title: "Videos Uploaded", value: "26", icon: <Video className="w-6 h-6 text-pink-500" /> },
  ];

  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1500 },
    { month: "Mar", revenue: 1800 },
    { month: "Apr", revenue: 2400 },
    { month: "May", revenue: 3100 },
    { month: "Jun", revenue: 4000 },
  ];

  return (
    <motion.div
      className="p-6 min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Artist Analytics
      </motion.h1>

      {/* === Stats Overview === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div>
              <h3 className="text-sm text-muted-foreground">{item.title}</h3>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
            <div className="p-3 bg-muted rounded-xl">{item.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* === Revenue Chart === */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue Growth</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  borderRadius: "10px",
                  border: "1px solid #333",
                }}
              />
              <Bar dataKey="revenue" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
