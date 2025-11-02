"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Music } from "lucide-react";

const genres = [
  "Pop",
  "Hip Hop",
  "Rock",
  "Electronic",
  "Jazz",
  "R&B",
  "Afrobeat",
  "Other",
];

export default function UploadSongPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* === Header === */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Music className="w-7 h-7 text-primary" />
          Upload Song
        </h1>
        <p className="text-muted-foreground">
          Add your latest track to your artist profile. Fill out the details and upload your audio file.
        </p>
      </motion.header>

      {/* === Upload Form === */}
      <motion.form
        className="bg-card p-6 rounded-2xl border border-border space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Song Title */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium">Song Title</label>
          <input
            type="text"
            placeholder="Enter song title"
            className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Optional description"
            className="w-full p-3 border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary outline-none"
            rows={3}
          />
        </motion.div>

        {/* Lyrics */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">Lyrics</label>
          <textarea
            placeholder="Add your lyrics here"
            className="w-full p-3 border rounded-lg bg-background text-foreground resize-none focus:ring-2 focus:ring-primary outline-none"
            rows={6}
          />
        </motion.div>

        {/* Custom Genre Dropdown */}
        <motion.div
          className="flex flex-col space-y-2 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="text-sm font-medium">Genre</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex justify-between items-center w-full p-3 border rounded-lg bg-background text-foreground hover:border-primary focus:ring-2 focus:ring-primary transition-all"
          >
            {selectedGenre || "Select genre"}
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
                {genres.map((genre) => (
                  <li
                    key={genre}
                    onClick={() => {
                      setSelectedGenre(genre);
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-muted/60 transition ${
                      selectedGenre === genre ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {genre}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Audio File */}
        <motion.div
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="text-sm font-medium">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            className="w-full text-sm text-muted-foreground file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/80"
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-medium cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upload Song
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
