"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/app/lib/api"; // You’ll create an API call similar to getTasks
import { PaymentRecord } from "@/app/lib/api";
import { motion } from "framer-motion";
import { Loader2, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EmployeePaymentsPage() {
  const { access, user } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const data = await getPayments(access);
        setPayments(data);
      } catch (e) {
        console.error("Failed to load payments:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [access]);

  // Calculate total balance
  const totalDue = payments.reduce((acc, p) => acc + parseFloat(p.net_amount), 0);

  return (
    <section>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-primary" />
          Payment Records
        </h2>
        <p className="text-gray-400 mt-1">
          Review all payments, balances, and task-based earnings.
        </p>
        <p className="text-gray-400 mt-1 font-medium">
          Total Balance: ${totalDue.toFixed(2)}
        </p>
      </motion.div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
        </div>
      )}

      {/* No payments */}
      {!loading && payments.length === 0 && (
        <p className="text-gray-400 text-center py-10">
          No payment records available.
        </p>
      )}

      {/* Payment list */}
      <div className="space-y-4">
        {payments.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 border border-gray-800 rounded-xl bg-[#1a1a1a] hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{p.payment_type}</h3>
              <span className="text-sm text-gray-400">{p.payment_status}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
              <div>
                <span className="font-medium">Amount:</span> ${p.amount} {p.currency}
              </div>
              <div>
                <span className="font-medium">Net:</span> ${p.net_amount} {p.currency}
              </div>
              <div>
                <span className="font-medium">Tax:</span> ${p.tax_amount} {p.currency}
              </div>
              <div>
                <span className="font-medium">Payment Method:</span> {p.payment_method}
              </div>
            </div>

            {/* Task links */}
            {p.tasks.length > 0 && (
              <div className="text-sm text-gray-400 mb-2">
                <p className="font-medium">Related Tasks:</p>
                <ul className="list-disc list-inside">
                  {p.tasks.map((t) => (
                    <li key={t.id}>{t.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Invoice / Receipt */}
            <div className="flex flex-wrap gap-4 text-sm">
              {p.invoice_url && (
                <a
                  href={p.invoice_url}
                  target="_blank"
                  className="text-cyan-400 underline"
                >
                  View Invoice
                </a>
              )}
              {p.receipt_url && (
                <a
                  href={p.receipt_url}
                  target="_blank"
                  className="text-cyan-400 underline"
                >
                  View Receipt
                </a>
              )}
            </div>

            {/* Notes */}
            {p.notes && (
              <p className="text-gray-400 mt-2 text-sm">
                <span className="font-medium">Notes:</span> {p.notes}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
