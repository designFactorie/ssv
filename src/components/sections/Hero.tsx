"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FloatingShapes, Mandala } from "@/components/ui/ShapeDecorations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-rangoli" />

      {/* Mandala decoration */}
      <div className="absolute -right-24 -top-24 opacity-30">
        <Mandala size={400} />
      </div>
      <div className="absolute -left-16 -bottom-16 opacity-20">
        <Mandala size={300} />
      </div>

      {/* Floating shapes */}
      <FloatingShapes />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-saffron/20 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-sm font-medium text-navy/70">
              Admissions Open for 2025-26
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-navy">Where </span>
            <span className="gradient-text">Play</span>
            <br />
            <span className="text-navy">Meets </span>
            <motion.span
              className="gradient-text-teal inline-block"
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Culture
            </motion.span>
          </motion.h1>

          {/* Squiggle decoration */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mb-8"
          >
            <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
              <path
                d="M2 10C14 2 26 18 38 10C50 2 62 18 74 10C86 2 98 18 110 10C122 2 134 18 148 10"
                stroke="url(#squiggle-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="squiggle-gradient" x1="0" y1="0" x2="150" y2="0">
                  <stop stopColor="#FF6B35" />
                  <stop offset="0.5" stopColor="#E91E63" />
                  <stop offset="1" stopColor="#7B2FF7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg sm:text-xl text-navy/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A premium kindergarten nurturing young minds through{" "}
            <span className="text-saffron font-semibold">play-based learning</span> and{" "}
            <span className="text-purple font-semibold">rich cultural values</span> in
            the heart of Bangalore.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,53,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-saffron to-magenta text-white font-heading font-bold text-lg rounded-2xl shadow-lg shadow-saffron/25 transition-shadow"
              >
                Book a School Visit
              </motion.button>
            </Link>
            <Link href="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-navy font-heading font-semibold text-lg rounded-2xl border-2 border-navy/10 hover:border-saffron/30 transition-colors"
              >
                Explore Programs
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { number: "500+", label: "Happy Students", color: "text-saffron" },
              { number: "15+", label: "Years of Trust", color: "text-purple" },
              { number: "50+", label: "Trained Teachers", color: "text-teal" },
              { number: "100%", label: "Parent Satisfaction", color: "text-green" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm"
              >
                <div className={`font-heading font-bold text-3xl sm:text-4xl ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-navy/50 text-sm font-medium mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
