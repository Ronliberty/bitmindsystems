// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, PlusCircle, ChevronDown } from "lucide-react";
// import Link from "next/link";

// export default function AddMealPlanPage() {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     goal: "",
//     calories: "",
//     description: "",
//   });

//   const [dropdown, setDropdown] = useState({
//     type: false,
//     goal: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
//   const goals = ["Weight Loss", "Muscle Gain", "Maintenance"];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//       setForm({
//         name: "",
//         type: "",
//         goal: "",
//         calories: "",
//         description: "",
//       });
//     }, 1000);
//   };

//   return (
//     <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
//       <div className="max-w-3xl mx-auto">
//         {/* === Header === */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold flex items-center gap-2">
//               <PlusCircle className="text-primary w-8 h-8" />
//               Add New Meal Plan
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Create and share a custom meal plan for your community.
//             </p>
//           </div>

          
//         </div>

//         {/* === Form === */}
//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           {/* Meal Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Meal Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               placeholder="e.g. High Protein Breakfast"
//               className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           {/* Type + Goal */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* === Meal Type Dropdown === */}
//             <div className="relative">
//               <label className="block text-sm font-medium mb-2">Meal Type</label>
//               <button
//                 type="button"
//                 onClick={() =>
//                   setDropdown({
//                     ...dropdown,
//                     type: !dropdown.type,
//                     goal: false,
//                   })
//                 }
//                 className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
//               >
//                 {form.type || "Select type"}
//                 <ChevronDown
//                   className={`w-5 h-5 transition-transform ${
//                     dropdown.type ? "rotate-180 text-primary" : "text-muted-foreground"
//                   }`}
//                 />
//               </button>

//               <AnimatePresence>
//                 {dropdown.type && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: -5 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -5 }}
//                     transition={{ duration: 0.15 }}
//                     className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
//                   >
//                     {mealTypes.map((type) => (
//                       <li
//                         key={type}
//                         onClick={() => {
//                           setForm({ ...form, type });
//                           setDropdown({ ...dropdown, type: false });
//                         }}
//                         className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
//                           form.type === type ? "bg-primary/10 text-primary" : ""
//                         }`}
//                       >
//                         {type}
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* === Goal Dropdown === */}
//             <div className="relative">
//               <label className="block text-sm font-medium mb-2">Goal</label>
//               <button
//                 type="button"
//                 onClick={() =>
//                   setDropdown({
//                     ...dropdown,
//                     goal: !dropdown.goal,
//                     type: false,
//                   })
//                 }
//                 className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
//               >
//                 {form.goal || "Select goal"}
//                 <ChevronDown
//                   className={`w-5 h-5 transition-transform ${
//                     dropdown.goal ? "rotate-180 text-primary" : "text-muted-foreground"
//                   }`}
//                 />
//               </button>

//               <AnimatePresence>
//                 {dropdown.goal && (
//                   <motion.ul
//                     initial={{ opacity: 0, y: -5 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -5 }}
//                     transition={{ duration: 0.15 }}
//                     className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
//                   >
//                     {goals.map((goal) => (
//                       <li
//                         key={goal}
//                         onClick={() => {
//                           setForm({ ...form, goal });
//                           setDropdown({ ...dropdown, goal: false });
//                         }}
//                         className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
//                           form.goal === goal ? "bg-primary/10 text-primary" : ""
//                         }`}
//                       >
//                         {goal}
//                       </li>
//                     ))}
//                   </motion.ul>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Calories */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Calories (approx.)</label>
//             <input
//               type="number"
//               value={form.calories}
//               onChange={(e) => setForm({ ...form, calories: e.target.value })}
//               placeholder="e.g. 600"
//               className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Description</label>
//             <textarea
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               placeholder="Describe the meal plan, included foods, macros, etc..."
//               rows={4}
//               className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <motion.button
//             type="submit"
//             whileTap={{ scale: 0.97 }}
//             disabled={loading}
//             className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
//           >
//             {loading ? "Saving..." : "Save Meal Plan"}
//           </motion.button>

//           {success && (
//             <motion.p
//               className="text-green-500 text-sm text-center font-medium"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               ✅ Meal plan added successfully!
//             </motion.p>
//           )}
//         </motion.form>
//       </div>
//     </section>
//   );
// }




"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PlusCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createMealPlan } from "@/app/lib/api";

export default function AddMealPlanPage() {
  const { access } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "",
    goal: "",
    calories: "",
    description: "",
  });

  const [dropdown, setDropdown] = useState({ type: false, goal: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const goals = ["Weight Loss", "Muscle Gain", "Maintenance"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!access) return setError("You must be logged in.");

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.name,
        description: form.description || "",
        total_calories: Number(form.calories),
        is_active: true,
      };

      await createMealPlan(access, payload);

      // Redirect to meal plans list after success
      router.push("/dashboard/systems/fitness/meals");
    } catch (err: any) {
      console.error(err);
      setError("Failed to create meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <PlusCircle className="text-primary w-8 h-8" />
              Add New Meal Plan
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and share a custom meal plan for your community.
            </p>
          </div>
          <Link
            href="/fitness/meals"
            className="text-primary hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Meal Plans
          </Link>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card border border-border rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Meal Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Meal Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. High Protein Breakfast"
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Type + Goal Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meal Type */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Meal Type</label>
              <button
                type="button"
                onClick={() => setDropdown({ ...dropdown, type: !dropdown.type, goal: false })}
                className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
              >
                {form.type || "Select type"}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    dropdown.type ? "rotate-180 text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
              <AnimatePresence>
                {dropdown.type && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    {mealTypes.map((type) => (
                      <li
                        key={type}
                        onClick={() => {
                          setForm({ ...form, type });
                          setDropdown({ ...dropdown, type: false });
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
                          form.type === type ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {type}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Goal */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Goal</label>
              <button
                type="button"
                onClick={() => setDropdown({ ...dropdown, goal: !dropdown.goal, type: false })}
                className="flex items-center justify-between w-full px-4 py-2.5 border border-border rounded-lg bg-muted/30 focus:ring-2 focus:ring-primary"
              >
                {form.goal || "Select goal"}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    dropdown.goal ? "rotate-180 text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
              <AnimatePresence>
                {dropdown.goal && (
                  <motion.ul
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    {goals.map((goal) => (
                      <li
                        key={goal}
                        onClick={() => {
                          setForm({ ...form, goal });
                          setDropdown({ ...dropdown, goal: false });
                        }}
                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/50 ${
                          form.goal === goal ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {goal}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium mb-2">Calories (approx.)</label>
            <input
              type="number"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
              placeholder="e.g. 600"
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the meal plan, included foods, macros, etc..."
              rows={4}
              className="w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Meal Plan"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
