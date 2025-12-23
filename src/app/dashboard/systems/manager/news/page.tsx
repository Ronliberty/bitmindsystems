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
  ExternalLink,
  X
} from "lucide-react";
import { newsService } from "@/services/newsService"; // Adjust path
import { NewsSource, NewsArticle } from "@/types/news"; // Adjust path

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"article" | "source">("article");
  const [modalAction, setModalAction] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<NewsArticle | NewsSource | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchData();
  }, [search, filterFeatured, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "articles") {
        const articleParams = {
          search: search || undefined,
          featured: filterFeatured || undefined,
        };
        const articleResponse = await newsService.getAll(articleParams);
        setArticles(articleResponse.results || []);
      } else {
        // Fetch sources (assuming endpoint /news/sources/)
        const sourceResponse = await newsService.getAllSources();
        setSources(sourceResponse.results || []);
      }
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
                          article.summary.toLowerCase().includes(search.toLowerCase()) ||
                          article.source.name.toLowerCase().includes(search.toLowerCase());
    const matchesFeatured = !filterFeatured || article.is_featured;
    return matchesSearch && matchesFeatured;
  });

  // Modal handlers
  const openModal = (type: "article" | "source", action: "add" | "edit", item?: NewsArticle | NewsSource) => {
    setModalType(type);
    setModalAction(action);
    setSelectedItem(item || null);
    setFormData(item || {});
    setMediaFiles(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
    setMediaFiles(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let data = { ...formData };
      if (modalType === "article" && mediaFiles) {
        const formDataObj = new FormData();
        for (const key in data) {
          formDataObj.append(key, data[key]);
        }
        for (let i = 0; i < mediaFiles.length; i++) {
          formDataObj.append('media', mediaFiles[i]);
        }
        data = formDataObj;
      }

      if (modalType === "article") {
        if (modalAction === "add") {
          await newsService.create(data);
        } else if (selectedItem) {
          await newsService.update((selectedItem as NewsArticle).id, data);
        }
      } else if (modalType === "source") {
        if (modalAction === "add") {
          await newsService.createSource(data);
        } else if (selectedItem) {
          await newsService.updateSource((selectedItem as NewsSource).id, data);
        }
      }
      closeModal();
      fetchData();
    } catch (err) {
      alert("Operation failed. Please try again.");
      console.error(err);
    }
  };

  const handleDelete = async (type: "article" | "source", id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      if (type === "article") {
        await newsService.delete(id);
      } else {
        await newsService.deleteSource(id);
      }
      fetchData();
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    }
  };

  const handleToggleFeatured = async (id: number, is_featured: boolean) => {
    try {
      await newsService.toggleFeatured(id, !is_featured);
      fetchData();
    } catch (err) {
      alert("Toggle failed.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

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
            <button onClick={() => openModal(activeTab, "add")} className="p-3 bg-primary/10 hover:bg-primary text-primary hover:text-background rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium">
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
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "articles" ? (
              <>
                {/* Featured Articles Cards */}
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
                            <button onClick={() => openModal("article", "edit", article)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete("article", article.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
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
                                  onChange={() => handleToggleFeatured(article.id, article.is_featured)}
                                  className="w-5 h-5 rounded text-primary focus:ring-primary"
                                />
                                <Star className="w-4 h-4" />
                              </label>
                            </td>
                            <td className="px-6 py-4 text-right flex justify-end gap-1">
                              <button onClick={() => openModal("article", "edit", article)} className="p-2 hover:bg-muted rounded-lg transition-all">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => openModal("article", "edit", article)} className="p-2 hover:bg-muted rounded-lg transition-all">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete("article", article.id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold flex items-center gap-3 mb-6 text-foreground">
                  <BookOpen className="w-8 h-8" />
                  News Sources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sources.map((source) => (
                    <motion.div
                      key={source.id}
                      whileHover={{ y: -4 }}
                      className="group cursor-pointer bg-background/50 border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-lg">{source.name}</h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${reliabilityBadges(source.reliability_score)}`}>
                          {source.reliability_score}%
                        </div>
                      </div>
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {source.url}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <div className="flex items-center gap-2 mt-4">
                        <button onClick={() => openModal("source", "edit", source)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete("source", source.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
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
                      <button onClick={() => openModal("source", "edit", source)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-all flex-1">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDelete("source", source.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all flex-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => openModal("source", "add")} className="mt-4 w-full bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add Source
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-6 rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {modalAction.charAt(0).toUpperCase() + modalAction.slice(1)} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === "article" ? (
                <>
                  <input
                    name="title"
                    value={formData.title || ""}
                    onChange={handleFormChange}
                    placeholder="Title"
                    className="w-full p-2 bg-background border border-border rounded"
                    required
                  />
                  <input
                    name="url"
                    value={formData.url || ""}
                    onChange={handleFormChange}
                    placeholder="URL"
                    className="w-full p-2 bg-background border border-border rounded"
                    required
                  />
                  <textarea
                    name="summary"
                    value={formData.summary || ""}
                    onChange={handleFormChange}
                    placeholder="Summary"
                    className="w-full p-2 bg-background border border-border rounded h-24"
                    required
                  />
                  <input
                    name="source_id"
                    type="number"
                    value={formData.source_id || ""}
                    onChange={handleFormChange}
                    placeholder="Source ID"
                    className="w-full p-2 bg-background border border-border rounded"
                    required
                  />
                  <input
                    name="published_at"
                    type="datetime-local"
                    value={formData.published_at ? new Date(formData.published_at).toISOString().slice(0, 16) : ""}
                    onChange={handleFormChange}
                    placeholder="Published At"
                    className="w-full p-2 bg-background border border-border rounded"
                    required
                  />
                  {/* Add topics as comma-separated IDs or select */}
                  <input
                    name="topics"
                    value={formData.topics ? formData.topics.map((t: Topic) => t.id).join(",") : ""}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, topics: e.target.value.split(",").map(Number) }))}
                    placeholder="Topics IDs (comma separated)"
                    className="w-full p-2 bg-background border border-border rounded"
                  />
                  <input type="file" multiple onChange={handleFileChange} />
                  {/* Add other fields: language, region, etc. */}
                </>
              ) : (
                <>
                  <input
                    name="name"
                    value={formData.name || ""}
                    onChange={handleFormChange}
                    placeholder="Name"
                    className="w-full p-2 bg-background border border-border rounded"
                    required
                  />
                  <input
                    name="url"
                    value={formData.url || ""}
                    onChange={handleFormChange}
                    placeholder="URL"
                    className="w-full p-2 bg-background border border-border rounded"
                  />
                  <input
                    name="reliability_score"
                    type="number"
                    value={formData.reliability_score || 70}
                    onChange={handleFormChange}
                    placeholder="Reliability Score (0-100)"
                    className="w-full p-2 bg-background border border-border rounded"
                    min={0}
                    max={100}
                    required
                  />
                </>
              )}
              <button type="submit" className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 transition-all">
                {modalAction === "add" ? "Create" : "Update"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}