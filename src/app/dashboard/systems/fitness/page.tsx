// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { BarChart2 } from "lucide-react";

// const sampleMealPlans = [
//   { name: "Lean Muscle Plan", calories: "2,200 kcal", meals: 5, goal: "Muscle Gain" },
//   { name: "Fat Loss Plan", calories: "1,800 kcal", meals: 4, goal: "Fat Reduction" },
//   { name: "Maintenance Plan", calories: "2,000 kcal", meals: 3, goal: "Balance" },
// ];

// const sampleUsers = [
//   { name: "Alex Mwangi", goal: "Muscle Gain", progress: "70%" },
//   { name: "Jane Wanjiru", goal: "Fat Loss", progress: "45%" },
//   { name: "Kevin Otieno", goal: "Endurance", progress: "60%" },
// ];

// export default function FitnessDashboardPage() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {/* Active Users */}
//       <motion.div
//         className="p-6 bg-card border border-border rounded-2xl shadow-sm"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <h2 className="text-lg font-semibold mb-4">👥 Active Clients</h2>
//         <ul className="space-y-3">
//           {sampleUsers.map((user) => (
//             <li
//               key={user.name}
//               className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
//             >
//               <div>
//                 <p className="font-medium">{user.name}</p>
//                 <p className="text-xs text-muted-foreground">{user.goal}</p>
//               </div>
//               <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
//                 {user.progress}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </motion.div>

//       {/* Meal Plans */}
//       <motion.div
//         className="p-6 bg-card border border-border rounded-2xl shadow-sm"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <h2 className="text-lg font-semibold mb-4">🥗 Meal Plans</h2>
//         <ul className="space-y-3">
//           {sampleMealPlans.map((plan) => (
//             <li
//               key={plan.name}
//               className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition"
//             >
//               <p className="font-medium">{plan.name}</p>
//               <p className="text-xs text-muted-foreground">
//                 {plan.calories} · {plan.meals} meals/day · {plan.goal}
//               </p>
//             </li>
//           ))}
//         </ul>
//         <Link
//           href="/fitness/meals/new"
//           className="block mt-4 text-sm text-primary hover:underline"
//         >
//           + Add New Meal Plan
//         </Link>
//       </motion.div>

//       {/* Progress Chart Placeholder */}
//       <motion.div
//         className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <BarChart2 className="w-10 h-10 text-primary mb-2" />
//         <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
//         <p className="text-sm text-muted-foreground">
//           Visual stats and progress charts coming soon.
//         </p>
//       </motion.div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getGymMembers, getMealPlans, GymMember, MealPlan } from "@/app/lib/api";

export default function FitnessDashboardPage() {
  const { access } = useAuth();
  const [members, setMembers] = useState<GymMember[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access) return; // guard against null

    async function fetchData() {
      try {
        setLoading(true);

        // fetch members
        const membersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fitness/gym/members/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (!membersRes.ok) throw new Error("Failed to fetch members");
        const membersData: GymMember[] = await membersRes.json();

        // fetch meal plans
        const mealPlansRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fitness/plans/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (!mealPlansRes.ok) throw new Error("Failed to fetch meal plans");
        const mealPlansData: MealPlan[] = await mealPlansRes.json();

        setMembers(membersData);
        setMealPlans(mealPlansData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [access]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Active Clients */}
      <motion.div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">👥 Active Clients</h2>
        <ul className="space-y-3">
          {members.map((user) => (
            <li key={user.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">{user.user.first_name} {user.user.last_name}</p>
                <p className="text-xs text-muted-foreground">{user.goals}</p>
              </div>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                BMI: {user.bmi || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Meal Plans */}
      <motion.div className="p-6 bg-card border border-border rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">🥗 Meal Plans</h2>
        <ul className="space-y-3">
          {mealPlans.map((plan) => (
            <li key={plan.id} className="p-3 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition">
              <p className="font-medium">{plan.title}</p>
              <p className="text-xs text-muted-foreground">{plan.total_calories} kcal · {plan.items.length} meals</p>
            </li>
          ))}
        </ul>
        <Link href="/fitness/meals/new" className="block mt-4 text-sm text-primary hover:underline">
          + Add New Meal Plan
        </Link>
      </motion.div>

      {/* Progress Chart Placeholder */}
      <motion.div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
        <BarChart2 className="w-10 h-10 text-primary mb-2" />
        <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
        <p className="text-sm text-muted-foreground">Visual stats and progress charts coming soon.</p>
      </motion.div>
    </div>
  );
}
