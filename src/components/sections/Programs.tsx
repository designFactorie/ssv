"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const programs = [
  {
    title: "Nursery",
    age: "2 - 3 years",
    description:
      "A gentle introduction to structured play and social interaction in a warm, safe environment.",
    color: "from-saffron to-saffron-light",
    bgColor: "bg-saffron/5",
    borderColor: "border-saffron/20",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Play School",
    age: "3 - 4 years",
    description:
      "Learning through play with creative activities, storytelling, music, and art exploration.",
    color: "from-magenta to-magenta-light",
    bgColor: "bg-magenta/5",
    borderColor: "border-magenta/20",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Day Care",
    age: "2 - 6 years",
    description:
      "Extended care with balanced activities, nutritious meals, and rest time for working parents.",
    color: "from-teal to-teal-light",
    bgColor: "bg-teal/5",
    borderColor: "border-teal/20",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "LKG",
    age: "4 - 5 years",
    description:
      "Building foundational literacy, numeracy, and social skills through interactive and engaging methods.",
    color: "from-purple to-purple-light",
    bgColor: "bg-purple/5",
    borderColor: "border-purple/20",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "UKG",
    age: "5 - 6 years",
    description:
      "Preparing confident learners for primary school with advanced reading, writing, and critical thinking.",
    color: "from-green to-green-light",
    bgColor: "bg-green/5",
    borderColor: "border-green/20",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-saffron/10 text-saffron font-heading font-semibold text-sm rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy mb-4">
            A Program for Every{" "}
            <span className="gradient-text">Little Explorer</span>
          </h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            From first steps to school-ready, we have the perfect nurturing
            environment for every stage of your child&apos;s early years.
          </p>
        </FadeIn>

        {/* Program Cards */}
        <StaggerContainer className="flex flex-wrap justify-center gap-6" staggerDelay={0.1}>
          {programs.map((program) => (
            <StaggerItem key={program.title} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative rounded-3xl ${program.bgColor} border ${program.borderColor} p-8 h-full cursor-pointer overflow-hidden`}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
                    <div className="text-navy/70 group-hover:text-white transition-colors">
                      {program.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-heading font-bold text-xl text-navy group-hover:text-white transition-colors">
                      {program.title}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 text-navy/60 group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                      {program.age}
                    </span>
                  </div>

                  <p className="text-navy/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors mb-6">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-navy/40 group-hover:text-white/90 transition-colors">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn className="text-center mt-12" delay={0.3}>
          <Link href="/programs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-navy text-white font-heading font-semibold rounded-2xl hover:bg-navy-light transition-colors"
            >
              View All Programs
            </motion.button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
