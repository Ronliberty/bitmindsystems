// app/dashboard/system/manager/news/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  Star,
  Shield,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Filter,
  ExternalLink
} from "lucide-react";
import { NewsSource, NewsArticle } from "@/app/lib/api";  // Adjust path as needed

// Mock data - replace with your API calls (e.g., SWR, Tanstack Query, or fetch)
const mockSources: NewsSource[] = [
  { id: 1, name: "BBC News", url: "https://bbc.com", reliability_score: 92 },
  { id: 2, name: "Reuters", url: "https://reuters.com", reliability_score: 95 },
  { id: 3, name: "Al Jazeera", url: "https://aljazeera.com", reliability_score: 88 },
  { id: 4, name: "CNN", url: "https://cnn.com", reliability_score: 78 },
];

const mockArticles: NewsArticle[] = [
  {
    id: 1,
    source: mockSources[0],
    source_id: 1,
    source_reliability_at_fetch: 92,
    title: "Global Markets Surge on Tech Earnings",
    url: "https://bbc.com/news/business-123456",
    summary: "Major indices hit record highs as tech giants report strong quarterly results...",
    language: "en",
    region: "Global",
    topics: [{ id: 1, name: "Finance" }, { id: 2, name: "Tech" }],
    published_at: "2025-12-20T10:00:00Z",
    fetched_at: "2025-12-21T08:00:00Z",
    is_featured: true,
    
  },
  {
    id: 2,
    source: mockSources[1],
    source_id: 2,
    source_reliability_at_fetch: 95,
    title: "Interest Rates to Remain Steady",
    url: "https://reuters.com/article/789",
    summary: "Central banks signal no changes amid stable inflation...",
    language: "en",
    region: "US",
    topics: [{ id: 3, name: "Economy" }],
    published_at: "2025-12-21T14:30:00Z",
    fetched_at: "2025-12-21T15:00:00Z",
    is_featured: false,
  },
  // Add more mock data as needed
];

const reliabilityBadges = (score: number) => {
  if (score >= 90) return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100";
  if (score >= 80) return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100";
  return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100";
};

export default function NewsPage() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [activeTab, setActiveTab] = useState<"sources" | "articles">("articles");
  const [search, setSearch] = useState("");
  const [filterFeatured, setFilterFeatured] = useState(false);

  useEffect(() => {
    // Fetch real data here
    // e.g., const { data: sourcesData } = useSWR('/api/news/sources');
    setSources(mockSources);
    setArticles(mockArticles);
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
                          article.summary.toLowerCase().includes(search.toLowerCase()) ||
                          article.source.name.toLowerCase().includes(search.toLowerCase());
    const matchesFeatured = !filterFeatured || article.is_featured;
    return matchesSearch && matchesFeatured;
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 flex items-center justify-center md:justify-start gap-3">
            <Newspaper className="w-12 h-12" />
            News Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Curate reliable news sources and featured articles for your finance dashboard. Track reliability and manage content.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border-b border-border"
        >
          <div className="flex flex-wrap gap-2 -mb-px">
            <button
              onClick={() => setActiveTab("articles")}
              className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg border-b-2 transition-all ${
                activeTab === "articles"
                  ? "border-primary text-primary bg-card shadow-sm"
                  : "border-transparent hover:border-muted-foreground text-muted-foreground hover:text-foreground"
              }`}
            >
              <Newspaper className="w-5 h-5" />
              Articles
              <span className="ml-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-bold">
                {filteredArticles.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("sources")}
              className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg border-b-2 transition-all ${
                activeTab === "sources"
                  ? "border-primary text-primary bg-card shadow-sm"
                  : "border-transparent hover:border-muted-foreground text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Sources
              <span className="ml-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-bold">
                {sources.length}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles by title, summary, or source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl cursor-pointer group hover:shadow-md transition-all">
              <input
                type="checkbox"
                checked={filterFeatured}
                onChange={(e) => setFilterFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/50"
              />
              <Star className="w-4 h-4 text-primary group-hover:animate-pulse" />
              <span className="text-sm font-medium">Featured Only</span>
            </label>
            <button className="p-3 bg-primary/10 hover:bg-primary text-primary hover:text-background rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium">
              <Plus className="w-5 h-5" />
              Add New
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {/* Featured Articles Cards */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all overflow-hidden">
              <h3 className="text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-100" />
                Featured News
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.filter(a => a.is_featured).slice(0, 4).map((article) => (
                  <motion.div
                    key={article.id}
                    whileHover={{ y: -4 }}
                    className="group cursor-pointer bg-background/50 border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all overflow-hidden"
                  >
                    {article.media?.[0] && (
                      <img
                        src={article.media[0].file}
                        alt={article.media[0].alt || article.title}
                        className="w-full h-32 md:h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${reliabilityBadges(article.source_reliability_at_fetch)}`}>
                        {article.source_reliability_at_fetch}%
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Shield className="w-3 h-3" />
                        {article.source.name}
                      </div>
                    </div>
                    <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        <ExternalLink className="w-3 h-3" />
                        <span className="flex gap-1 text-xs">
                          {article.topics.slice(0, 2).map(t => (
                            <span key={t.id} className="px-2 py-1 bg-muted rounded-full text-muted-foreground">
                              {t.name}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Articles Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold flex items-center gap-2">Recent Articles</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden md:table-cell">Source</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground hidden lg:table-cell">Reliability</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Featured</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.slice(0, 8).map((article) => (
                      <tr key={article.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground line-clamp-1 max-w-xs">{article.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{article.summary}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="font-medium">{article.source.name}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${reliabilityBadges(article.source_reliability_at_fetch)}`}>
                            {article.source_reliability_at_fetch}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(article.published_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-all">
                            <input
                              type="checkbox"
                              checked={article.is_featured}
                              className="w-5 h-5 rounded text-primary focus:ring-primary"
                            />
                            <Star className="w-4 h-4" />
                          </label>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-1">
                          <button className="p-2 hover:bg-muted rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-all">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sources Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <Shield className="w-7 h-7 text-primary" />
                News Sources
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sources.map((source) => (
                  <motion.div
                    key={source.id}
                    whileHover={{ scale: 1.02 }}
                    className="group p-4 bg-background/50 border border-border/50 rounded-xl hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-foreground line-clamp-1 max-w-[140px]">{source.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-bold border ${reliabilityBadges(source.reliability_score)}`}>
                        {source.reliability_score}%
                      </div>
                    </div>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 line-clamp-1"
                      >
                        {source.url.replace("https://", "")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <div className="flex gap-1 mt-3">
                      <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-all flex-1">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all flex-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="mt-4 w-full bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add Source
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}