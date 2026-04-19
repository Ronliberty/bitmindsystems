"use client";

import { useState } from "react";
import { TrendingUp, AlertTriangle, Brain } from "lucide-react";

interface DataPoint {
  month: string;
  value: number;
}

const monthlyData: DataPoint[] = [
  { month: "Jan", value: 400000 },
  { month: "Feb", value: 520000 },
  { month: "Mar", value: 610000 },
  { month: "Apr", value: 720000 },
  { month: "May", value: 680000 },
  { month: "Jun", value: 810000 },
];

const categoryData = [
  { name: "Salaries", value: 65 },
  { name: "Marketing", value: 18 },
  { name: "Operations", value: 10 },
  { name: "Tools", value: 7 },
];

export default function AnalysisPage() {
  const [data] = useState(monthlyData);

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Financial Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Insights, trends, and spending intelligence
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-lg font-semibold">+18.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Risk</p>
              <p className="text-lg font-semibold">High Marketing Spend</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">AI Insight</p>
              <p className="text-lg font-semibold">
                Budget may exceed in 12 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Spending Trend</h2>

          <div className="h-64 flex items-end gap-4">
            {data.map((d, i) => {
              const height = (d.value / maxValue) * 100;

              return (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  
                  <div className="w-full bg-muted rounded-xl h-full flex items-end">
                    <div
                      className="w-full bg-primary rounded-xl transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Spending Breakdown</h2>

          <div className="space-y-4">
            {categoryData.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span>{c.value}%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}