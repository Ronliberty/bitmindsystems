"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Upload, Youtube, ChevronDown } from "lucide-react";

export default function UploadVideoPage() {
  const [videoType, setVideoType] = useState<"file" | "youtube">("file");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Music Video", "Visualizer", "Performance", "Behind The Scenes", "Exclusive"];

  const sampleVideos = {
    youtube: [
      { title: "City Lights (Official Visualizer)", views: "85K", status: "Public" },
      { title: "Studio Freestyle", views: "40K", status: "Unlisted" },
    ],
    released: [
      { title: "Dream On (Official Video)", views: "240K", status: "Released" },
      { title: "Echoes", views: "115K", status: "Released" },
    ],
    exclusive: [
      { title: "Behind The Scenes", views: "5.4K", status: "Exclusive" },
      { title: "Live Session Vol. 1", views: "3.2K", status: "Exclusive" },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* === Header === */}
      <header>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold flex items-center gap-2"
        >
          <Video className="w-7 h-7 text-primary" />
          Upload Video
        </motion.h1>
        <p className="text-muted-foreground mt-2">
          Upload a new music video, visualizer, or performance clip — or link your YouTube release.
        </p>
      </header>

      {/* === Upload Form === */}
      <motion.form
        className="bg-card p-6 rounded-2xl border border-border space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* === Upload Type Selector === */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setVideoType("file")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              videoType === "file"
                ? "bg-primary text-white"
                : "border border-border hover:bg-muted/30"
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>

          <button
            type="button"
            onClick={() => setVideoType("youtube")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              videoType === "youtube"
                ? "bg-primary text-white"
                : "border border-border hover:bg-muted/30"
            }`}
          >
            <Youtube className="w-4 h-4" />
            YouTube Link
          </button>
        </motion.div>

        {/* === Conditional Inputs === */}
        {videoType === "file" ? (
          <motion.div
            key="file-upload"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col space-y-2"
          >
            <label className="text-sm font-medium">Video File (4K Supported)</label>
            <input
              type="file"
              accept="video/mp4,video/mov,video/avi,video/mkv"
              className="w-full text-sm text-muted-foreground file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/80"
            />
            <p className="text-xs text-muted-foreground">
              Max size: 2GB. Recommended: MP4 (H.264 or HEVC)
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="youtube-upload"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col space-y-2"
          >
            <label className="text-sm font-medium">YouTube Video URL</label>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </motion.div>
        )}

        {/* === Title === */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">Video Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </motion.div>

        {/* === Description === */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Add a short description for your video..."
            className="w-full p-3 border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary outline-none"
            rows={3}
          />
        </motion.div>

        {/* === Custom Category Dropdown === */}
        <motion.div
          className="flex flex-col space-y-2 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="text-sm font-medium">Category</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between items-center w-full p-3 border rounded-lg bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary transition-all"
          >
            {selectedCategory || "Select category"}
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                dropdownOpen ? "rotate-180 text-primary" : "text-muted-foreground"
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/60 transition ${
                      selectedCategory === cat ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === Thumbnail Upload === */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="text-sm font-medium">Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="w-full text-sm text-muted-foreground file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/80"
          />
        </motion.div>

        {/* === Submit Button === */}
        <motion.button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-medium cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upload Video
        </motion.button>
      </motion.form>

      {/* === Uploaded Videos Section === */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8"
      >
        {Object.entries(sampleVideos).map(([category, videos]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4 capitalize">
              {category === "youtube" && "📺 YouTube"}
              {category === "released" && "🚀 Released"}
              {category === "exclusive" && "🔒 Exclusive"}
            </h2>
            <ul className="space-y-3">
              {videos.map((video) => (
                <li
                  key={video.title}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition"
                >
                  <div>
                    <p className="font-medium">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.views} views</p>
                  </div>
                  <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                    {video.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
}
