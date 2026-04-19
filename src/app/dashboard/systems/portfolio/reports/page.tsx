"use client";

import { useState } from "react";
import {
  Globe,
  Eye,
  MousePointerClick,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

interface SiteReport {
  id: number;
  site: string;
  visits: number;
  clicks: number;
  leads: number;
  bounce_rate: number;
  growth: number;
  last_updated: string;
}

const sampleReports: SiteReport[] = [
  {
    id: 1,
    site: "Nayo Digital Agency",
    visits: 12450,
    clicks: 3420,
    leads: 128,
    bounce_rate: 42,
    growth: 18.5,
    last_updated: "2026-04-18",
  },
  {
    id: 2,
    site: "BrightTech Solutions",
    visits: 8450,
    clicks: 2100,
    leads: 64,
    bounce_rate: 51,
    growth: 9.2,
    last_updated: "2026-04-17",
  },
  {
    id: 3,
    site: "Creative Hub Studios",
    visits: 19200,
    clicks: 6200,
    leads: 240,
    bounce_rate: 36,
    growth: 24.7,
    last_updated: "2026-04-19",
  },
];

export default function Reports() {
  const [reports] = useState(sampleReports);

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Website Performance Reports</h1>
        <p className="text-sm text-muted-foreground">
          Track traffic, engagement, and leads from all portfolio websites
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Visits</p>
          <p className="text-2xl font-semibold">
            {reports.reduce((sum, r) => sum + r.visits, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-semibold">
            {reports.reduce((sum, r) => sum + r.leads, 0)}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Avg Bounce Rate</p>
          <p className="text-2xl font-semibold">
            {Math.round(
              reports.reduce((sum, r) => sum + r.bounce_rate, 0) /
                reports.length
            )}
            %
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-muted-foreground">Avg Growth</p>
          <p className="text-2xl font-semibold text-emerald-500">
            +
            {(
              reports.reduce((sum, r) => sum + r.growth, 0) / reports.length
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>

      {/* Site Reports */}
      <div className="space-y-4">
        {reports.map((site) => (
          <div
            key={site.id}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition"
          >

            {/* Top */}
            <div className="flex justify-between items-start">

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="font-semibold">{site.site}</h2>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {site.last_updated}
                  </p>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                +{site.growth}% growth
              </span>
            </div>

            {/* Metrics */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">

              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4" />
                {site.visits.toLocaleString()} visits
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MousePointerClick className="w-4 h-4" />
                {site.clicks.toLocaleString()} clicks
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                {site.leads} leads
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                {site.bounce_rate}% bounce
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}