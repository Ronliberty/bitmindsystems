"use client";

import ManagerOverviewAI from "@/components/ai/ManagerOverviewAI";
import { motion } from "framer-motion";
import { Star } from "lucide-react";



export default function PortfolioPage() {
  return (
      <div className="h-full flex flex-col">
          <ManagerOverviewAI />
        </div>
  );
}