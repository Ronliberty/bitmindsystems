"use client";

import { useState, useEffect } from "react";
import { GymMember } from "@/app/lib/api";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MemberListPage() {
  const { access } = useAuth(); // get the bearer token
  const [members, setMembers] = useState<GymMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access) return; // wait until access token is available

    async function fetchMembers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fitness/gym/members/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch members");

        const data: GymMember[] = await res.json();
        setMembers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [access]);

  if (loading) return <p>Loading...</p>;
  if (!members.length) return <p>No members found.</p>;

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {members.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <User className="text-primary w-7 h-7" />
              <div>
                <p className="font-semibold text-lg">
                  {member.user.first_name} {member.user.last_name}
                </p>
                <p className="text-muted-foreground text-sm">{member.user.email}</p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            
              <p><span className="font-semibold">Goals:</span> {member.goals || "Not set"}</p>
              <p><span className="font-semibold">Height:</span> {member.height_cm || "-"} cm</p>
              <p><span className="font-semibold">Weight:</span> {member.weight_kg || "-"} kg</p>
              <p><span className="font-semibold">BMI:</span> {member.bmi || "-"}</p>
              <p><span className="font-semibold">Joined At:</span> {new Date(member.joined_at).toLocaleString()}</p>
              <p><span className="font-semibold">Active:</span> {member.active ? "Yes" : "No"}</p>
             
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
