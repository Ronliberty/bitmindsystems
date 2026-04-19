



"use client";

import { useEffect, useState } from "react";
import { UserAPI } from "@/app/lib/admin/api";
import { UserAccount } from "@/types/admin/types";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserAPI.getAll();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-muted-foreground">Loading users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      
    
      {/* <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage all system users
        </p>
        <Link
            href="/dashboard/systems/admin/users/stats"
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
          >
            View Analytics
          </Link>
      </div> */}

      {/* Header */}
<div className="flex items-start justify-between gap-4 flex-wrap">

  {/* Left side */}
  <div>
    <h1 className="text-2xl font-bold tracking-tight">
      Users
    </h1>

    <p className="text-sm text-muted-foreground mt-1">
      Manage all system users
    </p>
  </div>

  {/* Right side (CTA button) */}
  <Link
    href="/dashboard/systems/admin/users/stats"
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
               bg-gradient-to-r from-cyan-500 to-blue-500 
               text-black font-semibold shadow-md 
               hover:shadow-lg hover:scale-[1.02] 
               transition-all duration-200"
  >
    📊 View Analytics
  </Link>

</div>

      {/* Users Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={`/dashboard/systems/admin/users/${user.id}`}
              className="block p-5 rounded-2xl border border-border bg-card hover:bg-muted/40 transition shadow-sm hover:shadow-lg"
            >
              <div className="flex flex-col gap-2">
                
                {/* Name */}
                <h2 className="font-semibold text-lg">
                  {user.first_name} {user.last_name}
                </h2>

                {/* Email */}
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>

                {/* Role */}
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary w-fit">
                  {user.user_type}
                </span>

                {/* App */}
                <p className="text-xs text-muted-foreground mt-2">
                  App: {user.react_app_detail?.name || "N/A"}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}