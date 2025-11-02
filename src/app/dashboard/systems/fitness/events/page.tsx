"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  PlusCircle,
  Edit2,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  type: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      name: "Fitness Bootcamp",
      date: "2025-11-10",
      location: "Nairobi Gym Center",
      type: "Outdoor",
      description:
        "A fun and intensive fitness session with certified trainers.",
    },
    {
      id: 2,
      name: "Nutrition Workshop",
      date: "2025-11-20",
      location: "Mombasa Wellness Hub",
      type: "Indoor",
      description:
        "Learn about meal planning, hydration, and recovery strategies.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [formData, setFormData] = useState<Omit<EventData, "id">>({
    name: "",
    date: "",
    location: "",
    type: "",
    description: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const eventTypes = ["Indoor", "Outdoor", "Virtual"];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...formData, id: ev.id } : ev
        )
      );
    } else {
      setEvents((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setFormData({
      name: "",
      date: "",
      location: "",
      type: "",
      description: "",
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (event: EventData) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date,
      location: event.location,
      type: event.type,
      description: event.description,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleSelectType = (type: string) => {
    setFormData({ ...formData, type });
    setIsDropdownOpen(false);
  };

  return (
    <section className="min-h-screen w-full bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Calendar className="w-8 h-8 text-primary" />
            Fitness Events
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingEvent(null);
            }}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/80 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add Event
          </button>
        </motion.div>

        {/* Event List */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">
                  📅 {event.date}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  📍 {event.location}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  🏷️ {event.type}
                </p>
                <p className="text-sm">{event.description}</p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(event)}
                  className="p-2 rounded-md bg-muted hover:bg-muted/70 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Event Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-card p-8 rounded-2xl shadow-xl w-full max-w-md relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-6">
                  {editingEvent ? "Edit Event" : "Create Event"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border focus:ring-2 focus:ring-primary outline-none"
                    required
                  />

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border focus:ring-2 focus:ring-primary outline-none"
                    required
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border focus:ring-2 focus:ring-primary outline-none"
                    required
                  />

                  {/* === Custom Dropdown === */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-muted/20 border border-border focus:ring-2 focus:ring-primary outline-none"
                    >
                      <span
                        className={
                          formData.type ? "" : "text-muted-foreground"
                        }
                      >
                        {formData.type || "Select Event Type"}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute z-30 w-full mt-2 rounded-xl border border-border 
                                     bg-gradient-to-br from-muted/90 to-background backdrop-blur-sm
                                     shadow-xl overflow-hidden"
                        >
                          {eventTypes.map((type) => (
                            <li
                              key={type}
                              onClick={() => handleSelectType(type)}
                              className={`px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors duration-150
                                ${
                                  formData.type === type
                                    ? "bg-primary/15 text-primary"
                                    : "text-foreground hover:bg-primary/10 hover:text-primary"
                                }`}
                            >
                              {type}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted/20 border border-border focus:ring-2 focus:ring-primary outline-none resize-none"
                    rows={3}
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-medium"
                  >
                    {editingEvent ? "Update Event" : "Create Event"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
