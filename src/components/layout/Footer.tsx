"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  Programs: [
    { label: "Play Group", href: "/programs#playgroup" },
    { label: "Nursery", href: "/programs#nursery" },
    { label: "Day Care", href: "/programs#daycare" },
    { label: "LKG", href: "/programs#lkg" },
    { label: "UKG", href: "/programs#ukg" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden -mt-1">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <FadeIn direction="up" delay={0}>
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 relative shrink-0">
                  <Image
                    src="/SSV - logo.png"
                    alt="Sairam Sanskruthi Vidhyalaya"
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">
                    Sairam Sanskruthi
                  </h3>
                  <p className="text-xs text-white/50 font-medium tracking-wider">
                    VIDHYALAYA
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Where play meets culture. Nurturing young minds with love,
                creativity, and rich cultural values in the heart of Bangalore.
              </p>
              <div className="flex gap-3">
                {["phone", "mail", "map"].map((icon) => (
                  <motion.div
                    key={icon}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-saffron/20 transition-colors cursor-pointer"
                  >
                    {icon === "phone" && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    )}
                    {icon === "mail" && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {icon === "map" && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], colIdx) => (
            <FadeIn key={title} direction="up" delay={0.1 * (colIdx + 1)}>
              <div>
                <h4 className="font-heading font-semibold text-base mb-5 text-saffron-light">
                  {title}
                </h4>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/50 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block py-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}

          {/* Contact Info */}
          <FadeIn direction="up" delay={0.3}>
            <div>
              <h4 className="font-heading font-semibold text-base mb-5 text-saffron-light">
                Visit Us
              </h4>
              <div className="space-y-4 text-sm text-white/60">
                <p className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Appa Garden, Bangalore, Karnataka
                </p>
                <p className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mon - Sat: 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Sairam Sanskruthi Vidhyalaya. All
            rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with care in Bangalore
          </p>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple/5 rounded-full blur-3xl" />
    </footer>
  );
}
