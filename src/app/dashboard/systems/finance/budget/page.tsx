"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface BudgetItem {
  id: number;
  category: string;
  allocated: number;
  spent: number;
}

const sampleBudgets: BudgetItem[] = [
  { id: 1, category: "Salaries", allocated: 1200000, spent: 950000 },
  { id: 2, category: "Marketing", allocated: 400000, spent: 310000 },
  { id: 3, category: "Operations", allocated: 300000, spent: 210000 },
  { id: 4, category: "Software", allocated: 200000, spent: 175000 },
  { id: 5, category: "Misc", allocated: 100000, spent: 45000 },
];

export default function BudgetPage() {
  const [budgets] = useState(sampleBudgets);

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const remaining = totalAllocated - totalSpent;

  const usage = (totalSpent / totalAllocated) * 100;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KSH",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Budget Intelligence</h1>
        <p className="text-sm text-muted-foreground">
          Financial allocation and spending analysis
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Donut Chart */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            
            {/* Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={502}
                strokeDashoffset={502 - (502 * usage) / 100}
                className="text-primary transition-all"
                fill="transparent"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">
                {usage.toFixed(0)}%
              </span>
              <span className="text-xs text-muted-foreground">
                used
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {formatCurrency(totalSpent)} spent of{" "}
              {formatCurrency(totalAllocated)}
            </p>
          </div>
        </div>

        {/* Financial Cards */}
        <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Allocated</p>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(totalAllocated)}
                </p>
              </div>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(remaining)}
                </p>
              </div>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-card border border-border rounded-2xl">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="font-semibold">Category Breakdown</h2>
        </div>

        <div className="p-6 space-y-5">
          {budgets.map((b) => {
            const percent = (b.spent / totalSpent) * 100;

            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{b.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(b.spent)}
                  </p>
                </div>

                {/* mini bar */}
                <div className="w-1/2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm font-medium w-16 text-right">
                  {percent.toFixed(0)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}