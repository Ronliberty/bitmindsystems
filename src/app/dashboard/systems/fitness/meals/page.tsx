"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { MealPlan } from "@/app/lib/api";

export default function MealsPage() {
  const { access } = useAuth(); // access token from context
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!access) return; // exit if token is null

    async function fetchMealPlans() {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fitness/plans/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`, // assert access is string
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch meal plans");

        const data: MealPlan[] = await res.json();
        setMealPlans(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load meal plans. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMealPlans();
  }, [access]);

  if (!access) return <p className="text-center mt-8">Please log in to view meal plans.</p>;
  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PlusCircle className="text-primary w-8 h-8" />
            Meal Plans
          </h1>
          <Link
            href="/fitness/meals/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            + Add New Meal Plan
          </Link>
        </div>

        {/* Meal Plan List */}
        {mealPlans.length === 0 ? (
          <p className="text-center text-muted-foreground">No meal plans found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mealPlans.map((plan) => (
              <motion.div
                key={plan.id}
                className="p-4 bg-card border border-border rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-semibold text-lg">{plan.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {plan.total_calories} kcal · {plan.items.length} meals
                </p>
                {plan.description && (
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
