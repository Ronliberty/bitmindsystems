"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { DollarSign } from "lucide-react";
export default function EcommerceDashboard() {
  

  const products = [
    { name: "Wireless Headphones", stock: 42, price: "$79", status: "Active" },
    { name: "Smartwatch", stock: 12, price: "$149", status: "Low Stock" },
    { name: "Yoga Mat", stock: 0, price: "$25", status: "Out of Stock" },
  ];

  const orders = [
    { id: "#1023", customer: "Alice Johnson", total: "$129.99", status: "Delivered" },
    { id: "#1024", customer: "Mark Lee", total: "$59.99", status: "Processing" },
    { id: "#1025", customer: "Tina Brown", total: "$249.00", status: "Pending" },
  ];

  const sales = {
    today: "$1,250",
    week: "$8,730",
    month: "$32,410",
  };

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Products */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-4">📦 Products</h2>
            <ul className="space-y-3">
              {products.map((product) => (
                <li
                  key={product.name}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.price}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      product.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : product.status === "Low Stock"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/ecommerce/add-product"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + Add New Product
            </Link>
          </motion.div>

          {/* Orders */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">🧾 Recent Orders</h2>
            <ul className="space-y-3">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      order.status === "Delivered"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "Processing"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/ecommerce/orders"
              className="block mt-4 text-sm text-primary hover:underline"
            >
              + View All Orders
            </Link>
          </motion.div>

          {/* Sales Summary */}
          <motion.div
            className="p-6 bg-card border border-border rounded-2xl shadow-sm flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DollarSign className="w-10 h-10 text-primary mb-2" />
            <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Track your revenue and store performance over time.
            </p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600">
              {sales.month}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              +12% this month
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
