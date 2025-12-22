// app/dashboard/system/manager/jobs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Globe,
  Calendar,
  Building2,
  Tag,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  ToggleLeft,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { JobOpportunity, RemoteType } from "@/app/lib/api";// Adjust path

// Mock data - replace with real API fetches
const mockJobs: JobOpportunity[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Senior Full-Stack Engineer",
    company: "FinTech Innovations Inc.",
    board: { id: 1, name: "LinkedIn" },
    url: "https://linkedin.com/jobs/view/123456",
    description: "We're looking for an experienced engineer to lead our trading platform development...",
    location: "New York, NY",
    remote_type: "hybrid",
    currency: "USD",
    salary_min: 180000,
    salary_max: 240000,
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Python" },
      { id: 4, name: "AWS" },
    ],
    posted_at: "2025-12-20T10:00:00Z",
    expires_at: "2026-01-20T00:00:00Z",
    is_active: true,
  },
  {
    id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
    title: "Quantitative Analyst",
    company: "HedgeFund Alpha",
    board: null,
    url: "",
    description: "Develop and backtest trading strategies using advanced statistical models...",
    location: "Remote",
    remote_type: "remote",
    currency: "USD",
    salary_min: 200000,
    salary_max: 300000,
    skills: [{ id: 5, name: "Python" }, { id: 6, name: "Pandas" }, { id: 7, name: "Machine Learning" }],
    posted_at: "2025-12-18T14:30:00Z",
    expires_at: null,
    is_active: true,
  },
  // Add more as needed
];

const remoteBadges: Record<RemoteType, { label: string; class: string; icon: React.ReactNode }> = {
  remote: {
    label: "Remote",
    class: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100",
    icon: <Globe className="w-3 h-3" />,
  },
  hybrid: {
    label: "Hybrid",
    class: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100",
    icon: <Building2 className="w-3 h-3" />,
  },
  onsite: {
    label: "On-site",
    class: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100",
    icon: <MapPin className="w-3 h-3" />,
  },
};

const formatSalary = (min?: number | null, max?: number | null, currency = "USD") => {
  if (!min && !max) return "Competitive";
  if (min && max) return `${(min / 1000).toFixed(0)}k–${(max / 1000).toFixed(0)}k ${currency}`;
  if (min) return `From ${(min / 1000).toFixed(0)}k ${currency}`;
  if (max) return `Up to ${(max / 1000).toFixed(0)}k ${currency}`;
  return "Not disclosed";
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [remoteFilter, setRemoteFilter] = useState<RemoteType | "all">("all");
  const [activeOnly, setActiveOnly] = useState(true);

  useEffect(() => {
    // Replace with real fetch: useSWR('/api/jobs/opportunities/')
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.name.toLowerCase().includes(search.toLowerCase()));

    const matchesRemote = remoteFilter === "all" || job.remote_type === remoteFilter;
    const matchesActive = !activeOnly || job.is_active;

    return matchesSearch && matchesRemote && matchesActive;
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-3">
            <Briefcase className="w-12 h-12" />
            Job Opportunities Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Curate and manage high-quality finance and tech job listings for your community.
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, company, skills, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={remoteFilter}
              onChange={(e) => setRemoteFilter(e.target.value as RemoteType | "all")}
              className="px-5 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>

            <label className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-xl cursor-pointer hover:shadow-md transition-all">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="w-5 h-5 rounded text-primary focus:ring-primary"
              />
              <ToggleLeft className="w-5 h-5 text-primary" />
              <span className="font-medium">Active Only</span>
            </label>

            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Job
            </button>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {(["remote", "hybrid", "onsite"] as RemoteType[]).map((type) => {
            const count = jobs.filter((j) => j.remote_type === type && j.is_active).length;
            const badge = remoteBadges[type];
            return (
              <div key={type} className="bg-card border border-border rounded-xl p-5 text-center">
                <div className="flex justify-center mb-2">{badge.icon}</div>
                <p className="text-3xl font-bold text-foreground">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">{type} Jobs</p>
              </div>
            );
          })}
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-3xl font-bold text-foreground">
              {jobs.filter((j) => j.is_active).length}
            </p>
            <p className="text-sm text-muted-foreground">Total Active</p>
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredJobs.map((job) => {
            const remoteInfo = remoteBadges[job.remote_type];
            const isExpired =
              job.expires_at && new Date(job.expires_at) < new Date();

            return (
              <motion.div
                key={job.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative bg-card border ${isExpired || !job.is_active ? "opacity-60" : ""} 
                  border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden`}
              >
                {/* Status Badge */}
                {(isExpired || !job.is_active) && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-200">
                    {isExpired ? "Expired" : "Inactive"}
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    {job.company && (
                      <p className="text-lg text-muted-foreground mt-1 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${remoteInfo.class}`}>
                      {remoteInfo.icon}
                      {remoteInfo.label}
                    </span>
                    {job.location && job.location !== "Remote" && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <DollarSign className="w-5 h-5" />
                    {formatSalary(job.salary_min, job.salary_max, job.currency)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Posted {new Date(job.posted_at).toLocaleDateString()}
                    {job.expires_at && (
                      <>
                        {" • "}
                        <Clock className="w-4 h-4" />
                        Expires {new Date(job.expires_at).toLocaleDateString()}
                      </>
                    )}
                  </div>
                </div>

                {/* Skills */}
                {job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {job.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-muted/50 border border-border rounded-full text-xs font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {job.skills.length > 6 && (
                      <span className="text-xs text-muted-foreground">
                        +{job.skills.length - 6} more
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex gap-2">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={job.is_active}
                      readOnly
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No jobs found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}