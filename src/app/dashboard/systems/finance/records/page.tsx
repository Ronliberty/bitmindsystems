"use client";

import { useState } from "react";
import { Search, Filter, FileText } from "lucide-react";

interface RecordItem {
  id: number;
  title: string;
  type: "invoice" | "expense" | "payment";
  amount: number;
  status: "completed" | "pending";
  date: string;
}

const sampleRecords: RecordItem[] = [
  {
    id: 1,
    title: "Client Invoice - Web Dev",
    type: "invoice",
    amount: 150000,
    status: "completed",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "Office Rent",
    type: "expense",
    amount: 50000,
    status: "completed",
    date: "2026-04-03",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    type: "expense",
    amount: 80000,
    status: "pending",
    date: "2026-04-05",
  },
  {
    id: 4,
    title: "Salary Disbursement",
    type: "payment",
    amount: 300000,
    status: "completed",
    date: "2026-04-10",
  },
];

export default function RecordsPage() {
  const [records] = useState(sampleRecords);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "invoice" | "expense" | "payment">("all");

  const filtered = records.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || r.type === filter;
    return matchesSearch && matchesFilter;
  });

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
        <h1 className="text-2xl font-semibold">Finance Records</h1>
        <p className="text-sm text-muted-foreground">
          Track invoices, expenses, and payments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-xl bg-card text-sm"
          />
        </div>

        <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
          {["all", "invoice", "expense", "payment"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-4 py-1.5 text-sm rounded-lg ${
                filter === t
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0" />

        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-border last:border-none hover:bg-muted/50 transition"
                >
                  <td className="px-6 py-5 font-medium">{r.title}</td>

                  <td className="px-6 py-5 text-sm capitalize">
                    {r.type}
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {r.date}
                  </td>

                  <td className="px-6 py-5 text-right font-semibold">
                    {formatCurrency(r.amount)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        r.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
}