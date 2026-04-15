"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import {  Globe } from "lucide-react";
import ManagerOverviewAI from "@/components/ai/ManagerOverviewAI";




export default function AdminDashboard() {
  return (
   <div className="h-full flex flex-col">
         <ManagerOverviewAI />
       </div>
  );
}
