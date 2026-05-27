"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, FloatingElement } from "@/components/animations/MotionWrapper";
import { Star, Circle, Plus, Triangle } from "@/components/ui/ShapeDecorations";

interface CTAProps {
  heading?: React.ReactNode;
  description?: string;
}

export default function CTA({ heading, description }: CTAProps) {
  return (
    <section className="pt-24 pb-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-90" />

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement className="absolute top-[10%] left-[8%]" delay={0} amplitude={20}>
          <Star size={30} color="rgba(255,255,255,0.3)" />
        </FloatingElement>
        <FloatingElement className="absolute top-[20%] right-[12%]" delay={1} amplitude={15}>
          <Circle className="opacity-20" color="sunshine" size={50} />
        </FloatingElement>
        <FloatingElement className="absolute bottom-[20%] left-[15%]" delay={0.5} amplitude={18}>
          <Plus size={25} color="rgba(255,255,255,0.25)" />
        </FloatingElement>
        <FloatingElement className="absolute bottom-[30%] right-[8%]" delay={1.5} amplitude={12}>
          <Triangle size={35} color="rgba(255,255,255,0.2)" />
        </FloatingElement>
        <FloatingElement className="absolute top-[50%] left-[50%]" delay={2} amplitude={16}>
          <Star size={20} color="rgba(255,255,255,0.2)" />
        </FloatingElement>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {heading ?? (<>Give Your Child the<br />Best Start in Life</>)}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {description ?? "Join the Sairam Sanskruthi family. Schedule a visit to experience our vibrant campus, meet our teachers, and see why hundreds of parents trust us."}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-navy font-heading font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
              >
                Book a Visit Today
              </motion.button>
            </Link>
            <Link href="/programs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/15 backdrop-blur-sm text-white font-heading font-semibold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/25 transition-colors"
              >
                View Programs
              </motion.button>
            </Link>
          </div>
        </FadeIn>

        {/* Trust badges */}
        <FadeIn delay={0.6}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>4.9/5 Parent Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>CCTV Monitored</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>500+ Happy Families</span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Wave transition into footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,40 L1440,100 L0,100 Z"
            fill="#1A1A2E"
          />
        </svg>
      </div>
    </section>
  );
}
