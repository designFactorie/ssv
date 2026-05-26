"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Mandala } from "@/components/ui/ShapeDecorations";

const categories = ["All", "Campus", "Classroom", "Play Area", "Activities", "Celebrations"];

const galleryItems = [
  { id: 1, category: "Campus", title: "Our Vibrant School Building", src: "/SSV_images/IMG-20260522-WA0109.jpg", aspect: "aspect-[4/3]" },
  { id: 2, category: "Activities", title: "Children Playing Outdoors", src: "/SSV_images/IMG-20260522-WA0108.jpg", aspect: "aspect-[4/3]" },
  { id: 3, category: "Classroom", title: "Colorful Classroom Setup", src: "/SSV_images/IMG-20260522-WA0063.jpg", aspect: "aspect-[4/3]" },
  { id: 4, category: "Play Area", title: "Indoor Play Zone", src: "/SSV_images/IMG-20260522-WA0014.jpg", aspect: "aspect-[4/3]" },
  { id: 5, category: "Celebrations", title: "Annual Day Celebration", src: "/SSV_images/IMG-20260522-WA0054.jpg", aspect: "aspect-[3/4]" },
  { id: 6, category: "Activities", title: "Happy Kids Waving", src: "/SSV_images/IMG-20260526-WA0021.jpg", aspect: "aspect-[4/3]" },
  { id: 7, category: "Play Area", title: "Colorful Ball Pit", src: "/SSV_images/IMG-20260522-WA0012.jpg", aspect: "aspect-[4/3]" },
  { id: 8, category: "Classroom", title: "Learning in Action", src: "/SSV_images/IMG-20260526-WA0005.jpg", aspect: "aspect-[4/3]" },
  { id: 9, category: "Play Area", title: "Outdoor Playground", src: "/SSV_images/IMG-20260522-WA0024.jpg", aspect: "aspect-[4/3]" },
  { id: 10, category: "Celebrations", title: "Classroom Decorations", src: "/SSV_images/IMG-20260522-WA0074.jpg", aspect: "aspect-[3/4]" },
  { id: 11, category: "Classroom", title: "Classroom with Colorful Benches", src: "/SSV_images/IMG-20260522-WA0115.jpg", aspect: "aspect-[4/3]" },
  { id: 12, category: "Activities", title: "Kids Playing on Swings", src: "/SSV_images/IMG-20260522-WA0114.jpg", aspect: "aspect-[4/3]" },
  { id: 13, category: "Play Area", title: "Lego Wall Station", src: "/SSV_images/IMG-20260522-WA0060.jpg", aspect: "aspect-[4/3]" },
  { id: 14, category: "Activities", title: "Alphabet Learning Session", src: "/SSV_images/IMG-20260526-WA0008.jpg", aspect: "aspect-[4/3]" },
  { id: 15, category: "Classroom", title: "Full Classroom View", src: "/SSV_images/IMG-20260522-WA0070.jpg", aspect: "aspect-[4/3]" },
  { id: 16, category: "Play Area", title: "Crocodile Activity Board", src: "/SSV_images/IMG-20260522-WA0035.jpg", aspect: "aspect-[3/4]" },
  { id: 17, category: "Campus", title: "School Building Side View", src: "/SSV_images/IMG-20260522-WA0110.jpg", aspect: "aspect-[4/3]" },
  { id: 18, category: "Celebrations", title: "Class Group Photo", src: "/SSV_images/IMG-20260522-WA0010.jpg", aspect: "aspect-[4/3]" },
  { id: 19, category: "Classroom", title: "Montessori Learning Tools", src: "/SSV_images/IMG-20260522-WA0056.jpg", aspect: "aspect-[4/3]" },
  { id: 20, category: "Activities", title: "Fun with Friends", src: "/SSV_images/IMG-20260526-WA0022.jpg", aspect: "aspect-[4/3]" },
  { id: 21, category: "Play Area", title: "Kidney Tables & Chairs", src: "/SSV_images/IMG-20260522-WA0009.jpg", aspect: "aspect-[4/3]" },
  { id: 22, category: "Classroom", title: "Decorated Classroom", src: "/SSV_images/IMG-20260522-WA0065.jpg", aspect: "aspect-[4/3]" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 pattern-rangoli" />
        <div className="absolute -right-16 top-32 opacity-20">
          <Mandala size={250} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-magenta/10 text-magenta font-heading font-semibold text-sm rounded-full mb-6">
              Gallery
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-navy mb-6">
              Moments of{" "}
              <span className="gradient-text">Joy & Discovery</span>
            </h1>
            <p className="text-navy/60 text-lg leading-relaxed">
              A glimpse into the vibrant life at Sairam Samskruthi — where every
              day is filled with laughter, learning, and little victories.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <FadeIn className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 min-h-[44px] rounded-full font-heading font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-saffron to-magenta text-white shadow-lg shadow-saffron/20"
                    : "bg-cream text-navy/60 hover:bg-cream-dark"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </FadeIn>

          {/* Masonry Grid */}
          <motion.div
            layout
            className="columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setLightboxIndex(filtered.indexOf(item))}
                    className={`relative ${item.aspect} rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div>
                        <p className="text-white font-heading font-bold text-lg">
                          {item.title}
                        </p>
                        <p className="text-white/60 text-sm">{item.category}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-white font-heading font-bold text-xl">
                  {filtered[lightboxIndex].title}
                </p>
                <p className="text-white/50 text-sm">
                  {filtered[lightboxIndex].category}
                </p>
              </div>

              {/* Navigation arrows */}
              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {lightboxIndex < filtered.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
