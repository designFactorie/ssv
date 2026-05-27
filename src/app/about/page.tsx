"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, FloatingElement } from "@/components/animations/MotionWrapper";
import { Star, Mandala } from "@/components/ui/ShapeDecorations";
import CTA from "@/components/sections/CTA";

const values = [
  {
    title: "Joy in Learning",
    description: "Every lesson is an adventure. We believe children learn best when they're having fun.",
    emoji: "✨",
    color: "bg-saffron/10 border-saffron/20",
  },
  {
    title: "Cultural Pride",
    description: "Rooted in Indian traditions — festivals, slokas, classical arts, and values that shape character.",
    emoji: "🪔",
    color: "bg-purple/10 border-purple/20",
  },
  {
    title: "Respect & Kindness",
    description: "We teach empathy and compassion, helping children become thoughtful human beings.",
    emoji: "🙏",
    color: "bg-teal/10 border-teal/20",
  },
  {
    title: "Curiosity First",
    description: "Questions are celebrated here. We nurture the natural wonder every child is born with.",
    emoji: "🔍",
    color: "bg-green/10 border-green/20",
  },
];

const milestones = [
  { year: "2008", title: "Founded", description: "Started with 15 students and a dream to blend tradition with modern education." },
  { year: "2012", title: "Campus Expansion", description: "Grew to a full-fledged campus with dedicated play areas and classrooms." },
  { year: "2016", title: "500 Students", description: "Crossed 500 students, becoming one of the most trusted names in the area." },
  { year: "2020", title: "Digital Integration", description: "Adopted modern digital tools while keeping our hands-on learning philosophy." },
  { year: "2024", title: "Excellence Award", description: "Recognized for outstanding early childhood education in Bangalore." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 pattern-rangoli" />
        <div className="absolute -right-20 top-20 opacity-20">
          <Mandala size={300} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-saffron/10 text-saffron font-heading font-semibold text-sm rounded-full mb-6">
              Our Story
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-navy mb-6">
              Nurturing Minds,{" "}
              <span className="gradient-text">Shaping Futures</span>
            </h1>
            <p className="text-navy/60 text-lg leading-relaxed">
              Sairam Sanskruthi Vidhyalaya was born from a simple belief: every child
              deserves an education that honours their culture while preparing them for
              tomorrow. Located in the heart of Appa Garden, Bangalore, we&apos;ve been
              a second home to hundreds of families.
            </p>
          </FadeIn>

          {/* Image grid */}
          <FadeIn delay={0.2} className="mt-12 grid grid-cols-3 gap-3 max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 col-span-2">
              <Image
                src="/SSV_images/IMG-20260522-WA0109.jpg"
                alt="School building"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 66vw, 40vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64">
              <Image
                src="/SSV_images/IMG-20260526-WA0115.jpg"
                alt="Flower rangoli with diya"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64">
              <Image
                src="/SSV_images/IMG-20260526-WA0096.jpg"
                alt="Cultural dance performance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 20vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48 sm:h-64 col-span-2">
              <Image
                src="/SSV_images/IMG-20260522-WA0054.jpg"
                alt="Annual Day celebration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 66vw, 40vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn direction="left">
              <div className="bg-gradient-to-br from-saffron/5 to-magenta/5 rounded-3xl p-10 border border-saffron/10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-saffron/10 flex items-center justify-center text-3xl mb-6">
                  🎯
                </div>
                <h2 className="font-heading text-3xl font-bold text-navy mb-4">
                  Our Mission
                </h2>
                <p className="text-navy/60 leading-relaxed text-lg">
                  To create a joyful, inclusive learning environment where young children
                  develop holistically through play-based education rooted in Indian
                  cultural values. We aim to spark curiosity, build confidence, and nurture
                  the whole child — mind, body, and spirit.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="bg-gradient-to-br from-teal/5 to-purple/5 rounded-3xl p-10 border border-teal/10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center text-3xl mb-6">
                  🌟
                </div>
                <h2 className="font-heading text-3xl font-bold text-navy mb-4">
                  Our Vision
                </h2>
                <p className="text-navy/60 leading-relaxed text-lg">
                  To be Bangalore&apos;s most loved and trusted early learning institution —
                  where every graduate enters primary school as a confident, culturally
                  rooted, and curious learner ready to embrace the world with open arms
                  and a compassionate heart.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-heading font-semibold text-sm rounded-full mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy mb-4">
              What We <span className="gradient-text-teal">Stand For</span>
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`rounded-3xl border ${value.color} p-8 h-full`}
                >
                  <span className="text-4xl mb-4 block">{value.emoji}</span>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-navy/55 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-green/10 text-green font-heading font-semibold text-sm rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy">
              Growing <span className="gradient-text">Together</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron via-purple to-teal sm:-translate-x-1/2" />

            {milestones.map((milestone, i) => (
              <FadeIn
                key={milestone.year}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
                className={`relative flex items-center gap-6 mb-12 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 sm:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-saffron sm:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`ml-20 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-16 sm:text-right" : "sm:pl-16"}`}>
                  <div className="bg-cream/50 rounded-2xl p-6 border border-saffron/10">
                    <span className="inline-block px-3 py-1 bg-saffron/10 text-saffron font-heading font-bold text-sm rounded-full mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-navy mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-navy/55 text-sm">{milestone.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading={<>Built on Love,<br />Rooted in Culture</>}
        description="For over 15 years, we've been shaping confident, curious, and culturally grounded young minds. Come visit us and see the values, warmth, and joy that set us apart."
      />
    </>
  );
}
