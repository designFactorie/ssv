"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { Mandala } from "@/components/ui/ShapeDecorations";
import CTA from "@/components/sections/CTA";

const programs = [
  {
    id: "nursery",
    title: "Nursery",
    age: "2 - 3 years",
    tagline: "First Steps into Wonder",
    description:
      "A gentle, loving introduction to the world of learning. Our nursery program focuses on sensory exploration, basic motor skills, and building trust in a safe environment. Through songs, stories, and free play, your little one takes their first confident steps outside home.",
    highlights: [
      "Sensory play stations",
      "Circle time with songs & rhymes",
      "Basic motor skill activities",
      "Gentle social interaction",
      "Parent transition support",
      "Safe, child-proofed environment",
    ],
    schedule: "Mon-Fri, 9:00 AM - 12:00 PM",
    color: "from-saffron to-saffron-light",
    bgColor: "bg-saffron/5",
    borderColor: "border-saffron/20",
    textColor: "text-saffron",
    image: "/SSV_images/IMG-20260522-WA0014.jpg",
  },
  {
    id: "playschool",
    title: "Play School",
    age: "3 - 4 years",
    tagline: "Where Imagination Takes Flight",
    description:
      "Learning disguised as fun. Our play school program uses creative arts, music, dramatic play, and hands-on activities to build language skills, creativity, and early academic concepts. Every day is an adventure that sparks curiosity and joy.",
    highlights: [
      "Art & creative expression",
      "Music and movement",
      "Storytelling & drama",
      "Early literacy activities",
      "Outdoor play & nature",
      "Cultural celebrations",
    ],
    schedule: "Mon-Fri, 9:00 AM - 1:00 PM",
    color: "from-magenta to-magenta-light",
    bgColor: "bg-magenta/5",
    borderColor: "border-magenta/20",
    textColor: "text-magenta",
    image: "/SSV_images/IMG-20260522-WA0024.jpg",
  },
  {
    id: "daycare",
    title: "Day Care",
    age: "2 - 6 years",
    tagline: "A Home Away from Home",
    description:
      "Extended care designed for working parents. Our day care combines structured learning activities with free play, nutritious meals, and supervised rest time. Your child stays engaged, happy, and safe throughout the day.",
    highlights: [
      "Nutritious meals & snacks",
      "Structured activity time",
      "Supervised nap/rest time",
      "Indoor & outdoor play",
      "CCTV monitored",
      "Flexible pick-up times",
    ],
    schedule: "Mon-Sat, 8:00 AM - 5:00 PM",
    color: "from-teal to-teal-light",
    bgColor: "bg-teal/5",
    borderColor: "border-teal/20",
    textColor: "text-teal",
    image: "/SSV_images/IMG-20260522-WA0088.jpg",
  },
  {
    id: "lkg",
    title: "LKG",
    age: "4 - 5 years",
    tagline: "Building Strong Foundations",
    description:
      "A structured yet playful program that builds foundational literacy, numeracy, and social skills. Through interactive lessons, hands-on activities, and collaborative projects, children develop the confidence and skills needed for academic success.",
    highlights: [
      "Phonics & early reading",
      "Number concepts & patterns",
      "Science exploration",
      "Yoga & physical fitness",
      "Cultural arts & slokas",
      "Social-emotional learning",
    ],
    schedule: "Mon-Fri, 9:00 AM - 2:30 PM",
    color: "from-purple to-purple-light",
    bgColor: "bg-purple/5",
    borderColor: "border-purple/20",
    textColor: "text-purple",
    image: "/SSV_images/IMG-20260522-WA0115.jpg",
  },
  {
    id: "ukg",
    title: "UKG",
    age: "5 - 6 years",
    tagline: "Ready for the World",
    description:
      "Our most advanced program prepares confident, curious learners for primary school. With a focus on reading fluency, mathematical thinking, and critical reasoning, children graduate ready to thrive in any school environment.",
    highlights: [
      "Advanced reading & writing",
      "Mathematical reasoning",
      "Environmental awareness",
      "Public speaking & confidence",
      "Classical arts & culture",
      "Primary school readiness",
    ],
    schedule: "Mon-Fri, 9:00 AM - 3:00 PM",
    color: "from-green to-green-light",
    bgColor: "bg-green/5",
    borderColor: "border-green/20",
    textColor: "text-green",
    image: "/SSV_images/IMG-20260526-WA0005.jpg",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 pattern-rangoli" />
        <div className="absolute -left-16 top-20 opacity-20">
          <Mandala size={250} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-purple/10 text-purple font-heading font-semibold text-sm rounded-full mb-6">
              Our Programs
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-navy mb-6">
              A Perfect Fit for{" "}
              <span className="gradient-text">Every Child</span>
            </h1>
            <p className="text-navy/60 text-lg leading-relaxed">
              From their first day in nursery to their last day in UKG, we&apos;ve
              designed each program to match your child&apos;s developmental stage
              with the right balance of play, learning, and cultural enrichment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programs.map((program, i) => (
              <FadeIn key={program.id} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  id={program.id}
                  className={`scroll-mt-24 rounded-3xl ${program.bgColor} border ${program.borderColor} overflow-hidden`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image + overlay side */}
                    <div className={`relative min-h-[300px] lg:min-h-[400px] ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-70`} />

                      {/* Floating decorative elements */}
                      <motion.div
                        className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute bottom-10 left-10 w-10 h-10 rounded-lg bg-white/10 rotate-45"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />

                      <div className="relative z-10 p-12 flex flex-col justify-end h-full">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-4 w-fit">
                          {program.age}
                        </span>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
                          {program.title}
                        </h2>
                        <p className="text-white/90 text-xl font-heading">
                          {program.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="p-10 lg:p-12">
                      <p className="text-navy/65 leading-relaxed text-base mb-8">
                        {program.description}
                      </p>

                      <h4 className={`font-heading font-semibold text-sm ${program.textColor} mb-4 uppercase tracking-wider`}>
                        Program Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {program.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} shrink-0`} />
                            <span className="text-navy/60 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-navy/40 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {program.schedule}
                        </div>
                        <Link href="/contact">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 min-h-[44px] bg-gradient-to-r ${program.color} text-white font-heading font-semibold text-sm rounded-xl shadow-md`}
                          >
                            Enquire Now
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading={<>Find the Perfect<br />Program for Your Child</>}
        description="Not sure which program fits best? Book a visit and our team will help you choose the right one based on your child's age, personality, and learning style."
      />
    </>
  );
}
