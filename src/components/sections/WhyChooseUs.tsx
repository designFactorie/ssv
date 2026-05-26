"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const features = [
  {
    title: "Play-Based Learning",
    description:
      "Children learn best through play. Our curriculum weaves academic concepts into joyful, hands-on activities.",
    icon: "🎨",
    color: "bg-saffron/10 border-saffron/20",
    iconBg: "bg-saffron/20",
  },
  {
    title: "Cultural Roots",
    description:
      "We celebrate Indian traditions — festivals, music, dance, and values — so children grow with a strong sense of identity.",
    icon: "🪔",
    color: "bg-purple/10 border-purple/20",
    iconBg: "bg-purple/20",
  },
  {
    title: "Safe & Nurturing",
    description:
      "CCTV-monitored campus, trained staff, and a warm atmosphere where every child feels secure and loved.",
    icon: "🛡️",
    color: "bg-teal/10 border-teal/20",
    iconBg: "bg-teal/20",
  },
  {
    title: "Holistic Development",
    description:
      "Beyond academics — yoga, art, music, and outdoor play for balanced physical, emotional, and cognitive growth.",
    icon: "🌱",
    color: "bg-green/10 border-green/20",
    iconBg: "bg-green/20",
  },
  {
    title: "Experienced Educators",
    description:
      "Passionate, trained teachers who understand each child's unique learning style and nurture their potential.",
    icon: "👩‍🏫",
    color: "bg-magenta/10 border-magenta/20",
    iconBg: "bg-magenta/20",
  },
  {
    title: "Parent Partnership",
    description:
      "Regular updates, open communication, and events that keep parents involved in their child's learning journey.",
    icon: "🤝",
    color: "bg-sunshine/10 border-sunshine/20",
    iconBg: "bg-sunshine/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-dots pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-magenta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple/10 text-purple font-heading font-semibold text-sm rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy mb-4">
            What Makes Us{" "}
            <span className="gradient-text">Special</span>
          </h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            We don&apos;t just teach — we inspire. Here&apos;s why families in Bangalore
            trust us with their most precious little ones.
          </p>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl border ${feature.color} p-7 h-full backdrop-blur-sm`}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center text-2xl mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-navy/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
