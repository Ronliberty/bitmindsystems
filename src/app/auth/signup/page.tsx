"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ArrowRight, Sparkles, Lock } from "lucide-react";

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: ""
  });
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const interests: string[] = [
    "Payment System",
    "Community Management",
    "Meal & Fitness Tracking",
    "Music or Artist Hub",
    "Business Suite",
    "E-commerce Platform",
    "Education & Learning",
    "Health & Wellness",
    "Social Networking",
    "Content Creation",
    "Project Management",
    "Customer Relationship",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Here you would typically send data to your backend
    console.log('Form submitted:', formData);
  };

  const handleInterestSelect = (interest: string) => {
    setFormData({ ...formData, interest });
    setOpen(false);
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1f1f1f] text-white px-6 py-12 relative overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center space-y-8"
        >
          {/* Animated Checkmark */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-black" />
            </motion.div>
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Welcome Aboard!
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Thank you <span className="text-emerald-400">{formData.name}</span>! 
              We're excited to have you. Our team will reach out within{" "}
              <span className="text-emerald-400 font-semibold">48 hours</span>.
            </p>
            
            <div className="bg-[#161616] border border-gray-800 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-emerald-400 mb-2">What's Next?</h3>
              <ul className="text-gray-400 text-left space-y-2">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2" />
                  Personalized onboarding call
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2" />
                  Early access to selected features
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-emerald-400 mr-2" />
                  Exclusive community access
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/landing'}
              className="group bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 px-8 rounded-2xl transition flex items-center justify-center mx-auto"
            >
              Return Home
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1f1f1f] text-white px-6 py-12 relative overflow-auto">
      
      {/* Enhanced Motion Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/30 rounded-full blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-500/20 rounded-full blur-[120px]"
        animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full text-center space-y-8 relative z-10 my-8"
      >
        {/* Header with sparkle */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -top-4 -right-4"
          >
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Join the Future of{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Digital Systems
            </span>
          </h1>
        </div>

        <p className="text-gray-400 text-lg leading-relaxed">
          Be among the first to experience a unified platform for communities,
          payments, and growth. Submit your interest below — we'll reach out
          within <span className="text-emerald-400 font-semibold">48 hours</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name or Business name"
              required
              className="w-full bg-[#161616] border border-gray-700 focus:border-emerald-500 text-white px-5 py-3 rounded-2xl outline-none transition placeholder-gray-500"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              className="w-full bg-[#161616] border border-gray-700 focus:border-emerald-500 text-white px-5 py-3 rounded-2xl outline-none transition placeholder-gray-500"
            />
          </motion.div>

          {/* Enhanced Custom dropdown with hidden scrollbar */}
          <motion.div 
            whileFocus={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`w-full flex justify-between items-center bg-[#161616] border ${
                open ? "border-emerald-500" : "border-gray-700"
              } px-5 py-3 rounded-2xl transition-all duration-200`}
            >
              <span className={`${formData.interest ? "text-white" : "text-gray-300"}`}>
                {formData.interest || "Select your area of interest"}
              </span>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-full bg-[#1e1e1e] border border-gray-700 rounded-2xl shadow-lg z-10 overflow-hidden"
                >
                  <div className="max-h-48 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {interests.map((opt: string) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleInterestSelect(opt)}
                        className="w-full text-left px-5 py-3 hover:bg-emerald-600/10 text-gray-300 transition-colors first:rounded-t-2xl last:rounded-b-2xl border-b border-gray-800 last:border-b-0"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email || !formData.interest}
            whileHover={{ 
              scale: isSubmitting || !formData.name || !formData.email || !formData.interest ? 1 : 1.03 
            }}
            whileTap={{ scale: 0.98 }}
            className={`w-full ${
              isSubmitting || !formData.name || !formData.email || !formData.interest
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            } text-black font-semibold py-3 rounded-2xl transition flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                />
                Processing...
              </>
            ) : (
              "Request Invite"
            )}
          </motion.button>
        </form>

        {/* Trust indicator */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-sm flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Your information is secure and never shared with third parties
        </motion.p>
      </motion.div>
    </section>
  );
}