"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Download,
  Filter,
  Eye,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Employee {
  id: number;
  full_name: string;
}

interface PaymentRecord {
  id: number;
  employee: Employee;
  payment_type: string;
  payment_status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  amount: number;
  currency: string;
  tax_amount: number;
  net_amount: number;
  contract?: {
    title: string;
    contract_type: string;
  };
  payment_date: string;
  payment_method: string;
  transaction_id?: string;
  notes?: string;
}

const samplePayments: PaymentRecord[] = [
  {
    id: 1,
    employee: { id: 101, full_name: "John Doe" },
    payment_type: "salary",
    payment_status: "completed",
    amount: 250000,
    currency: "KSH",
    tax_amount: 25000,
    net_amount: 225000,
    contract: {
      title: "Senior Software Engineer - Monthly Salary",
      contract_type: "monthly",
    },
    payment_date: "2026-03-31",
    payment_method: "bank_transfer",
    transaction_id: "TXN-987654",
    notes: "March salary + performance bonus",
  },
  // (keep rest of your data unchanged)
];

export default function PayslipsPage() {
  const [payments] = useState<PaymentRecord[]>(samplePayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | "completed" | "pending" | "processing">("all");
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentRecord | null>(null);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.employee.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.payment_type
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.payment_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      processing:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      failed:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      cancelled:
        "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    }[status];

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}
      >
        {status === "completed" && <CheckCircle2 className="w-3 h-3" />}
        {status === "pending" && <Clock className="w-3 h-3" />}
        {status === "processing" && <AlertCircle className="w-3 h-3" />}
        {(status === "failed" || status === "cancelled") && (
          <XCircle className="w-3 h-3" />
        )}
        {status}
      </span>
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6 overflow-x-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Employee Payments</h1>
          <p className="text-sm text-muted-foreground">
            Payslips • Contracts • Disbursements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted">
            <Download className="w-4 h-4" />
            Export
          </button>

          <button className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90">
            <DollarSign className="w-4 h-4" />
            Generate
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Payslips</p>
          <p className="text-2xl font-semibold mt-1">{payments.length}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-semibold mt-1">
            {payments.filter((p) => p.payment_status === "completed").length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-semibold mt-1">
            {payments.filter((p) => p.payment_status === "pending").length}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="text-2xl font-semibold mt-1">
            {payments.filter((p) => p.payment_status === "processing").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 border border-border rounded-xl bg-card text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
          {["all", "completed", "pending", "processing"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-4 py-1.5 text-sm rounded-lg ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {status}
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
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-right">Net</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelectedPayment(p)}
                  className="border-b border-border last:border-none cursor-pointer hover:bg-muted/50 transition"
                >
                  <td className="px-6 py-5 font-medium">
                    {p.employee.full_name}
                  </td>
                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {p.payment_date}
                  </td>
                  <td className="px-6 py-5 capitalize text-sm">
                    {p.payment_type}
                  </td>
                  <td className="px-6 py-5 text-right font-semibold text-emerald-600">
                    {formatCurrency(p.net_amount, p.currency)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    {getStatusBadge(p.payment_status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card w-full max-w-xl rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              {selectedPayment.employee.full_name}
            </h2>

            <p className="text-sm text-muted-foreground mb-2">
              {selectedPayment.payment_type}
            </p>

            <p className="text-2xl font-bold text-emerald-600">
              {formatCurrency(
                selectedPayment.net_amount,
                selectedPayment.currency
              )}
            </p>

            <button
              onClick={() => setSelectedPayment(null)}
              className="mt-6 px-4 py-2 bg-primary text-white rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}