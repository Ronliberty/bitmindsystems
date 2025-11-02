"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowLeft, User, Activity, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sampleMembers = [
  {
    id: 1,
    name: "Alex Mwangi",
    email: "alex.mwangi@example.com",
    plan: "Free",
    joined: "2025-01-12",
    lastLogin: "2025-10-30",
    workoutsCompleted: 12,
    progress: "70%",
    location: "Nairobi, Kenya",
    bio: "Alex is working on building muscle mass and improving endurance.",
  },
  {
    id: 2,
    name: "Jane Wanjiru",
    email: "jane.wanjiru@example.com",
    plan: "Premium",
    joined: "2025-02-05",
    lastLogin: "2025-10-29",
    workoutsCompleted: 28,
    progress: "85%",
    location: "Mombasa, Kenya",
    bio: "Jane focuses on high-intensity workouts and maintaining healthy eating habits.",
  },
  {
    id: 3,
    name: "Kevin Otieno",
    email: "kevin.otieno@example.com",
    plan: "Pro",
    joined: "2025-03-18",
    lastLogin: "2025-10-27",
    workoutsCompleted: 33,
    progress: "92%",
    location: "Kisumu, Kenya",
    bio: "Kevin is a dedicated member aiming to compete professionally in fitness events.",
  },
];

export default function MemberProfilePage() {
  const { id } = useParams();
  const member = sampleMembers.find((m) => m.id === Number(id));
  const [tab, setTab] = useState("overview");

  if (!member) {
    return (
      <section className="min-h-screen flex items-center justify-center text-center text-muted-foreground">
        <p>User not found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* === Header === */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <User className="text-primary w-7 h-7" />
              {member.name}
            </h1>
            <p className="text-muted-foreground text-sm">{member.email}</p>
          </div>

          <Link
            href="/dashboard/systems/fitness/members/list"
            className="inline-flex items-center text-sm text-cyan-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to list
          </Link>
        </div>

        {/* === Profile Card === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 bg-card border border-border rounded-2xl shadow-sm mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Plan</p>
              <p className="text-lg font-semibold">{member.plan}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Progress</p>
              <p className="text-lg font-semibold">{member.progress}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Joined</p>
              <p className="text-lg font-semibold">{member.joined}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Last Login</p>
              <p className="text-lg font-semibold">{member.lastLogin}</p>
            </div>
          </div>
        </motion.div>

        {/* === Tabs === */}
        <div className="flex gap-3 mb-6 border-b border-border pb-2">
          <button
            onClick={() => setTab("overview")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === "overview"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("activity")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === "activity"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setTab("subscription")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              tab === "subscription"
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            Subscription
          </button>
        </div>

        {/* === Tab Content === */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          {tab === "overview" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">🏋️‍♂️ Member Overview</h2>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold">Workouts Completed:</span>{" "}
                  {member.workoutsCompleted}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {member.location}
                </p>
              </div>
            </div>
          )}

          {tab === "activity" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">📅 Recent Activity</h2>
              <ul className="space-y-3 text-sm">
                <li>• Completed “Chest & Back Burn” workout - 3 days ago</li>
                <li>• Joined “Nutrition & Wellness” event - 1 week ago</li>
                <li>• Updated weight tracking - 2 weeks ago</li>
              </ul>
            </div>
          )}

          {tab === "subscription" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">💳 Subscription Details</h2>
              {member.plan === "Free" ? (
                <p className="text-muted-foreground text-sm">
                  This user is currently on the <strong>Free Plan</strong>. Upgrade
                  available to unlock more features.
                </p>
              ) : (
                <div className="text-sm space-y-3">
                  <p>
                    <span className="font-semibold">Current Plan:</span>{" "}
                    {member.plan}
                  </p>
                  <p>
                    <span className="font-semibold">Renewal Date:</span>{" "}
                    2025-12-01
                  </p>
                  <p>
                    <span className="font-semibold">Payment Method:</span>{" "}
                    Visa ending in 4242
                  </p>
                  <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition text-sm">
                    Manage Subscription
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
