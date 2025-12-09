// layout.tsx
"use client";

import { motion } from "framer-motion";
import {  
  Package,
  Users,
  BarChart2,
  PlusCircle,
  Truck,  
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const quickActions = [
  { title: "Add Product", icon: <PlusCircle className="w-6 h-6" />, href: "/ecommerce/add-product" },
    { title: "Manage Orders", icon: <Truck className="w-6 h-6" />, href: "/ecommerce/orders" },
    { title: "View Customers", icon: <Users className="w-6 h-6" />, href: "/ecommerce/customers" },
    { title: "Sales Reports", icon: <BarChart2 className="w-6 h-6" />, href: "/ecommerce/reports" },
    { title: "Products", icon: <Package className="w-6 h-6" />, href: "/ecommerce/products" },
];

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            🛍️ E-Commerce Dashboard
          </motion.h1>
          <p className="text-muted-foreground mt-2">
            Manage your products, orders, and customers — all in one place.
          </p>
            <Link
      href="/dashboard"
      className="inline-flex items-center text-sm text-cyan-400 hover:underline mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Link>
        </header>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="p-4 bg-card border border-border rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-center mb-2 text-primary">{action.icon}</div>
              <p className="text-sm font-medium">{action.title}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



