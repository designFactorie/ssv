"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";

const showcaseImages = [
  { src: "/SSV_images/IMG-20260522-WA0109.jpg", alt: "School building exterior", span: "col-span-2 row-span-2" },
  { src: "/SSV_images/IMG-20260522-WA0108.jpg", alt: "Children playing outdoors", span: "col-span-1 row-span-1" },
  { src: "/SSV_images/IMG-20260526-WA0021.jpg", alt: "Happy kids waving", span: "col-span-1 row-span-1" },
  { src: "/SSV_images/IMG-20260522-WA0063.jpg", alt: "Colorful classroom", span: "col-span-1 row-span-1" },
  { src: "/SSV_images/IMG-20260522-WA0010.jpg", alt: "Students & teachers", span: "col-span-1 row-span-1" },
];

export default function ImageShowcase() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal/10 text-teal font-heading font-semibold text-sm rounded-full mb-4">
            Our Campus
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-navy mb-4">
            A Glimpse into Our{" "}
            <span className="gradient-text-teal">World</span>
          </h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            Colorful classrooms, vibrant play areas, and happy faces — this is
            what a day at Sairam Samskruthi looks like.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
            {showcaseImages.map((img, i) => (
              <motion.div
                key={img.src}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                transition={{ duration: 0.3 }}
                className={`${img.span} relative rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-heading font-semibold text-sm">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
