"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Parent of Ananya (UKG)",
    content:
      "My daughter has completely transformed since joining Sairam Samskruthi. Her confidence, creativity, and love for learning have blossomed. The cultural activities are a wonderful bonus — she now performs slokas and dances at home!",
    avatar: "PS",
    color: "from-saffron to-magenta",
  },
  {
    name: "Rajesh Kumar",
    role: "Parent of Arjun (LKG)",
    content:
      "What impressed us most is how the teachers genuinely care about each child. Arjun was shy and reluctant when he started, but within weeks he was running to school every morning. The play-based approach really works.",
    avatar: "RK",
    color: "from-teal to-purple",
  },
  {
    name: "Deepa Venkatesh",
    role: "Parent of Kavya (Nursery)",
    content:
      "As working parents, the day care facility is a blessing. We feel completely safe knowing Kavya is in such loving hands. The regular photo updates and parent meetings keep us connected to her progress.",
    avatar: "DV",
    color: "from-purple to-magenta",
  },
  {
    name: "Suresh Reddy",
    role: "Parent of Twins (Play School)",
    content:
      "Managing twins is challenging, but the teachers handle it beautifully. The school's blend of modern teaching methods with traditional values is exactly what we wanted for our children.",
    avatar: "SR",
    color: "from-green to-teal",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-saffron/5 via-purple/5 to-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-magenta/10 text-magenta font-heading font-semibold text-sm rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy mb-4">
            Loved by{" "}
            <span className="gradient-text">Parents</span>
          </h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear what our community has to say.
          </p>
        </FadeIn>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-cream/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-saffron/10 text-center"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto text-saffron/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
                </svg>
              </div>

              <p className="text-navy/70 text-lg sm:text-xl leading-relaxed mb-8 italic">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>

              {/* Avatar and name */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[activeIndex].color} flex items-center justify-center text-white font-heading font-bold text-sm`}
                >
                  {testimonials[activeIndex].avatar}
                </div>
                <div className="text-left">
                  <p className="font-heading font-semibold text-navy">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-navy/50 text-sm">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative flex items-center justify-center w-11 h-11"
                aria-label={`View testimonial ${i + 1}`}
              >
                <span className={`block transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-10 h-3 bg-gradient-to-r from-saffron to-magenta"
                    : "w-3 h-3 bg-navy/15"
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
