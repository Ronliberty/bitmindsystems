"use client";

import { useState } from "react";
import {
  Globe,
  Users,
  MessageSquare,
  TrendingUp,
  Eye,
  MousePointerClick,
} from "lucide-react";

interface AnalyticsData {
  total_websites: number;
  total_visits: number;
  total_clicks: number;
  total_leads: number;
  conversion_rate: number;
  growth_rate: number;
}

const sampleData: AnalyticsData = {
  total_websites: 3,
  total_visits: 40100,
  total_clicks: 11720,
  total_leads: 432,
  conversion_rate: 3.4,
  growth_rate: 17.8,
};

export default function Analytics() {
  const data = sampleData;

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Portfolio Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Overview of all website performance and engagement metrics
        </p>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">

        <div className="bg-card border border-border rounded-2xl p-5">
          <Globe className="w-4 h-4 text-primary" />
          <p className="text-sm text-muted-foreground mt-2">Websites</p>
          <p className="text-xl font-semibold">{data.total_websites}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <Eye className="w-4 h-4 text-blue-500" />
          <p className="text-sm text-muted-foreground mt-2">Total Visits</p>
          <p className="text-xl font-semibold">
            {data.total_visits.toLocaleString()}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <MousePointerClick className="w-4 h-4 text-yellow-500" />
          <p className="text-sm text-muted-foreground mt-2">Clicks</p>
          <p className="text-xl font-semibold">
            {data.total_clicks.toLocaleString()}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <p className="text-sm text-muted-foreground mt-2">Leads</p>
          <p className="text-xl font-semibold">{data.total_leads}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <Users className="w-4 h-4 text-purple-500" />
          <p className="text-sm text-muted-foreground mt-2">Conversion</p>
          <p className="text-xl font-semibold">
            {data.conversion_rate}%
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <p className="text-sm text-muted-foreground mt-2">Growth</p>
          <p className="text-xl font-semibold text-emerald-500">
            +{data.growth_rate}%
          </p>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Performance Insight */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Performance Insight</h2>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              • Your portfolio websites are generating steady traffic growth.
            </p>
            <p>
              • Conversion rate is above industry average (3.4%).
            </p>
            <p>
              • Most engagement comes from mobile visitors.
            </p>
            <p>
              • Lead generation is strongest on agency websites.
            </p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-4">AI Insight</h2>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Your portfolio is performing well, but 2 websites are underutilized.
            </p>
            <p>
              Suggestion: Improve homepage CTAs to increase conversion rate.
            </p>
            <p>
              Best performing site: Creative Hub Studios (highest leads).
            </p>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">System Activity</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

          <div>
            <p className="text-muted-foreground">Active Sessions</p>
            <p className="font-semibold">1,240</p>
          </div>

          <div>
            <p className="text-muted-foreground">Avg Time on Site</p>
            <p className="font-semibold">3m 42s</p>
          </div>

          <div>
            <p className="text-muted-foreground">Bounce Rate</p>
            <p className="font-semibold">38%</p>
          </div>

          <div>
            <p className="text-muted-foreground">Returning Users</p>
            <p className="font-semibold">62%</p>
          </div>
        </div>
      </div>
    </div>
  );
}