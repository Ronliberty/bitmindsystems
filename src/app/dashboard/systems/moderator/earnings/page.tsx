"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

interface Earning {
  id: number;
  task: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
}

const sampleEarnings: Earning[] = [
  { id: 1, task: "Content moderation batch", amount: 1200, date: "2026-04-18", status: "paid" },
  { id: 2, task: "Flagged posts review", amount: 800, date: "2026-04-17", status: "paid" },
  { id: 3, task: "AI audit", amount: 1500, date: "2026-04-16", status: "pending" },
  { id: 4, task: "User verification", amount: 600, date: "2026-04-15", status: "paid" },
];

const monthlyTrend = [500, 900, 1200, 1800, 1500, 2100];

export default function EarningsPage() {
  const [earnings] = useState(sampleEarnings);

  const total = earnings.reduce((s, e) => s + e.amount, 0);
  const paid = earnings.filter((e) => e.status === "paid").reduce((s, e) => s + e.amount, 0);
  const pending = earnings.filter((e) => e.status === "pending").reduce((s, e) => s + e.amount, 0);

  const maxTrend = Math.max(...monthlyTrend);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KSH",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Earnings</h1>
        <p className="text-sm text-muted-foreground">
          Track your income and payouts
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Earned</p>
          <p className="text-2xl font-semibold mt-1">
            {formatCurrency(total)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Paid</p>
          <p className="text-2xl font-semibold mt-1 text-emerald-600">
            {formatCurrency(paid)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-semibold mt-1 text-yellow-500">
            {formatCurrency(pending)}
          </p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Earnings Trend</h2>

        <div className="h-48 flex items-end gap-3">
          {monthlyTrend.map((value, i) => {
            const height = (value / maxTrend) * 100;

            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full h-full bg-muted rounded-lg flex items-end">
                  <div
                    className="w-full bg-primary rounded-lg"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  M{i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="bg-card border border-border rounded-2xl">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Recent Earnings</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            This week
          </span>
        </div>

        <div className="divide-y">
          {earnings.map((e) => (
            <div
              key={e.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
            >
              
              {/* Left */}
              <div>
                <p className="font-medium">{e.task}</p>
                <p className="text-xs text-muted-foreground">{e.date}</p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(e.amount)}
                </p>
                <p
                  className={`text-xs ${
                    e.status === "paid"
                      ? "text-emerald-500"
                      : "text-yellow-500"
                  }`}
                >
                  {e.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}