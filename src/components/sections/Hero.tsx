"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FloatingShapes, Mandala } from "@/components/ui/ShapeDecorations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/SSV-building.jpeg"
        alt="Sairam Sanskruthi Vidhyalaya building"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-navy/60" />
      {/* Gradient overlay for color */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/50" />

      {/* Floating shapes */}
      <FloatingShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
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
              Admissions Open for 2026-27
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-white">Where </span>
            <span className="gradient-text">Play</span>
            <br />
            <span className="text-white">Meets </span>
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
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A premium kindergarten nurturing young minds through{" "}
            <span className="text-saffron-light font-semibold">play-based learning</span> and{" "}
            <span className="text-purple-light font-semibold">rich cultural values</span> in
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
                className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-heading font-semibold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/25 transition-colors"
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
              { number: "500+", label: "Happy Students", color: "text-saffron-light" },
              { number: "15+", label: "Years of Trust", color: "text-purple-light" },
              { number: "50+", label: "Trained Teachers", color: "text-teal-light" },
              { number: "100%", label: "Parent Satisfaction", color: "text-green-light" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20"
              >
                <div className={`font-heading font-bold text-3xl sm:text-4xl ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-white/50 text-sm font-medium mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
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
