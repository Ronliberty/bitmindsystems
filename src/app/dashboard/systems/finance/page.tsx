// app/dashboard/system/finance/page.tsx
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Use the correct import path where your PaymentRecord lives
import { Payment } from "@/app/lib/payment/api";  // ← make sure this file exports the interface!

// Strongly typed fetch function
async function getFinanceOverview(): Promise<Payment[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-records/`, {
    cache: "no-store", // always fresh
    next: { revalidate: 0 }, // extra safety
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payments");
  }

  const data = await res.json();
  // DRF returns { results: [...] } or direct array — handle both
  return Array.isArray(data) ? data : (data.results ?? []);
}

export default async function FinanceOverview() {
  const payments = await getFinanceOverview(); // ← TypeScript now KNOWS it's PaymentRecord[]

  // Calculations (safe with fallback)
  const totalPaid = payments
    .filter((p) => p.payment_status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.net_amount || "0"), 0);

  const pendingPayments = payments.filter((p) => p.payment_status === "pending");
  const totalPending = pendingPayments.reduce((sum, p) => sum + parseFloat(p.amount || "0"), 0);

  const currentMonth = format(new Date(), "yyyy-MM");
  const thisMonthPayments = payments.filter((p) => p.payment_date.startsWith(currentMonth));

  const monthlyTotal = thisMonthPayments
    .filter((p) => p.payment_status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.net_amount || "0"), 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance Overview</h1>
        <p className="text-gray-600 mt-1">Track all employee payments, salaries, and earnings</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Paid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${monthlyTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Pending Approval */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                ${totalPending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-1">{pendingPayments.length} payments</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{payments.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
        </div>

        {payments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No payments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.slice(0, 8).map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.employee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.payment_type_display}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${parseFloat(payment.net_amount || "0").toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.payment_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : payment.payment_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : payment.payment_status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {payment.payment_status_display}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(payment.payment_date), "MMM dd, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}