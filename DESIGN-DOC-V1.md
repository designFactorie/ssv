# Sairam Sanskruthi Vidhyalaya - Website Design Document (Version 1)

## Project Overview

**Client:** Sairam Sanskruthi Vidhyalaya
**Location:** Appa Garden, Bangalore, Karnataka
**Type:** Premium Kindergarten Website
**Programs:** Play Group, Nursery, LKG, UKG, Day Care
**Primary Audience:** Parents (95% mobile users)
**Primary CTA:** Book a School Visit
**Live URL:** https://ssv-site-nu.vercel.app
**Repo:** https://github.com/designFactorie/ssv.git

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| GSAP | Advanced animations |
| next/font (Google Fonts) | Typography |
| next/image | Optimized images |
| Vercel | Hosting & deployment |

---

## Design System

### Color Palette (Indian-inspired, vibrant, bold)

| Name | Hex | Usage |
|------|-----|-------|
| Saffron | `#FF6B35` | Primary warm, CTAs, highlights |
| Saffron Light | `#FF8F5E` | Hover states, light accents |
| Teal | `#00B4D8` | Secondary, Day Care, trust |
| Teal Light | `#48CAE4` | Light accents |
| Magenta | `#E91E63` | Accent, playful energy |
| Magenta Light | `#F06292` | Light accents |
| Green | `#4CAF50` | Growth, success, UKG |
| Green Light | `#81C784` | Light accents |
| Purple | `#7B2FF7` | Creative, premium, LKG |
| Purple Light | `#A66FFA` | Light accents |
| Sunshine | `#FFB800` | Joy, warmth |
| Coral | `#FF6B6B` | Decorative |
| Sky | `#74C0FC` | Decorative |
| Cream | `#FFF8F0` | Page background |
| Navy | `#1A1A2E` | Text, footer background |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | Fredoka | 300-700 (rounded, playful) |
| Body | DM Sans | 300-700 (clean, modern) |

### Design Motifs

- **Rangoli-inspired SVG patterns** — subtle background textures
- **Mandala decorations** — slowly rotating SVG mandalas on hero/page tops
- **Floating shapes** — stars, circles, triangles, plus signs with Framer Motion
- **Gradient text** — saffron-magenta-purple and teal-purple gradients
- **Squiggle decorations** — hand-drawn feel SVG waves
- **Blob morphing** — organic border-radius animations
- **Wave transitions** — SVG waves between sections

---

## Pages & Sections

### 1. Home Page (`/`)

| Section | Description |
|---------|-------------|
| **Hero** | Cream background with rangoli pattern, floating shapes, mandala decorations. Large "Where Play Meets Culture" heading with gradient text. Admissions badge, subtitle, two CTA buttons (Book a Visit + Explore Programs), 4 stat cards (500+ students, 15+ years, 50+ teachers, 100% satisfaction). Bottom wave transition. |
| **Image Showcase** | "A Glimpse into Our World" — 5-image masonry grid (2-col + 4-col layout): school building (large), kids playing outdoors, kids waving, classroom, group photo. Hover zoom + overlay with captions. |
| **Programs** | "A Program for Every Little Explorer" — 5 cards in flex-wrap centered layout (3 top, 2 centered bottom): Play Group, Nursery, LKG, UKG, Day Care. Each card has icon, age badge, description, "Learn more" link. Cards change to gradient fill on hover with white text. |
| **Why Choose Us** | "What Makes Us Special" — 6 feature cards in 3x2 grid: Play-Based Learning, Cultural Roots, Safe & Nurturing, Holistic Development, Experienced Educators, Parent Partnership. Each with emoji icon and colored background. |
| **Testimonials** | "Loved by Parents" — Carousel with 4 parent quotes. Large quote card with avatar, name, role. Navigation dots with 44px touch targets. |
| **CTA** | "Give Your Child the Best Start in Life" — Animated gradient background (saffron/magenta/purple/teal cycling), floating decorative shapes, two buttons, trust badges. Wave transition into footer. |

### 2. About Page (`/about`)

| Section | Description |
|---------|-------------|
| **Hero** | "Nurturing Minds, Shaping Futures" with rangoli pattern and mandala. Image grid: building (2-col), learning board, teaching moment, group photo. |
| **Mission & Vision** | Two side-by-side gradient cards with emoji icons. |
| **Values** | 4 value cards in 2x2 grid: Joy in Learning, Cultural Pride, Respect & Kindness, Curiosity First. |
| **Timeline** | Vertical timeline with 5 milestones (2008-2024) with alternating left/right layout and connected dots. |
| **CTA** | "Built on Love, Rooted in Culture" — unique copy per page. |

### 3. Programs Page (`/programs`)

| Section | Description |
|---------|-------------|
| **Hero** | "A Perfect Fit for Every Child" with rangoli and mandala. |
| **Program Cards** | 5 detailed cards with alternating layout. Each has: real photo with gradient overlay (left/right alternating), title, age, tagline, description, 6 highlights in 2-col grid, schedule, "Enquire Now" button. Programs: Play Group (saffron), Nursery (magenta), LKG (purple), UKG (green), Day Care (teal). |
| **CTA** | "Find the Perfect Program for Your Child" — unique copy. |

### 4. Gallery Page (`/gallery`)

| Section | Description |
|---------|-------------|
| **Hero** | "Moments of Joy & Discovery" with rangoli and mandala. |
| **Filter Tabs** | 6 category pills: All, Campus, Classroom, Play Area, Activities, Celebrations. Active tab has gradient fill. 44px min touch targets. |
| **Masonry Grid** | 22 real school photos in 2-col (mobile) / 3-col (desktop) masonry layout. Hover shows dark overlay with title/category. |
| **Lightbox** | Full-screen modal with prev/next navigation arrows and close button. Dark backdrop with blur. |

### 5. Contact Page (`/contact`)

| Section | Description |
|---------|-------------|
| **Hero** | "Book a School Visit" with rangoli and mandala. |
| **Form** | 3-col/5-col grid layout. Left (3-col): booking form with parent name, child name, child age, phone, email, program selector (5 options), message textarea, "Request a Visit" gradient button. Success state with checkmark animation. |
| **Sidebar** | Right (2-col): "Find Us" card with address, phone, email, hours. Map placeholder. "Prefer to call?" green CTA card. |

---

## Layout Components

### Navbar
- Fixed position, transparent on top, white/blur on scroll
- Logo (actual school crest) + "Sairam Sanskruthi / VIDHYALAYA" text
- Desktop: 5 nav links + "Book a Visit" gradient pill button
- Mobile: Animated hamburger (44px touch target) → full-screen overlay with large staggered links

### Footer
- Navy background, directly below CTA (no gap)
- 4-column grid: Brand (logo + description + social icons), Quick Links, Programs, Visit Us
- Footer links have `py-2` padding for 44px mobile tap targets
- Bottom bar with copyright + "Crafted with care in Bangalore"
- Decorative gradient blur orbs

---

## Animations

| Animation | Where Used |
|-----------|-----------|
| `FadeIn` (scroll-triggered) | All section headers, cards, content blocks |
| `ScaleIn` | Occasional emphasis elements |
| `StaggerContainer` / `StaggerItem` | Card grids (programs, features) |
| `FloatingElement` | Decorative shapes on hero and CTA |
| `float` / `float-slow` / `float-delayed` | CSS keyframe floating |
| `gradient-shift` | CTA background gradient cycling |
| `morph` | Blob border-radius morphing |
| `spin-slow` | Mandala rotation (40s cycle) |
| `wiggle` | Hover wiggle on interactive elements |
| `bounce-in` | Element entrance |
| `pulse-glow` | Glow effect on special elements |
| `whileHover` / `whileTap` | Buttons scale up/down, cards lift |
| `AnimatePresence` | Testimonial carousel, gallery filter, lightbox |
| Page transitions | Scroll-triggered with viewport margin |

---

## Images Used

### From School Photo Library (22 selected from 140)

| Image | Description | Used In |
|-------|-------------|---------|
| WA0109 (522) | School building exterior | Home showcase, About, Gallery |
| WA0108 (522) | Kids playing outdoors | Home showcase, Gallery |
| WA0010 (522) | Class group photo | Home showcase, Gallery |
| WA0021 (526) | Kids waving at camera | Home showcase, Gallery |
| WA0063 (522) | Classroom overview | Home showcase, Gallery |
| WA0054 (522) | Annual Day group photo | About, Gallery |
| WA0005 (526) | Teacher teaching alphabet | About, Programs (UKG), Gallery |
| WA0104 (522) | Calendar learning board | About |
| WA0014 (522) | Indoor play area | Programs (Play Group), Gallery |
| WA0024 (522) | Outdoor playground | Programs (Nursery), Gallery |
| WA0088 (522) | Child napping | Programs (Day Care) |
| WA0115 (522) | Classroom with benches | Programs (LKG), Gallery |
| WA0012 (522) | Ball pit | Gallery |
| WA0035 (522) | Crocodile activity board | Gallery |
| WA0060 (522) | Lego pegboard wall | Gallery |
| WA0114 (522) | Kids on swings | Gallery |
| WA0008 (526) | Teacher overhead view | Gallery |
| WA0070 (522) | Full classroom view | Gallery |
| WA0110 (522) | Building side view | Gallery |
| WA0056 (522) | Montessori board | Gallery |
| WA0022 (526) | Kids peace signs | Gallery |
| WA0065 (522) | Decorated classroom | Gallery |
| WA0074 (522) | Corridor with decorations | Gallery |
| WA0009 (522) | Kidney tables & chairs | Gallery |

### Other Assets

| File | Description |
|------|-------------|
| `SSV - logo.png` | School crest logo (bird, book, sun) |
| `SSV-building.jpeg` | Building front photo (added later) |

---

## Mobile Optimizations

- All tap targets minimum 44px (buttons, nav dots, filter tabs, footer links)
- Gallery: 2-column masonry on mobile (reduces scroll by ~50%)
- Hamburger menu: 44px touch target with animated bars
- Full-screen mobile nav overlay with large staggered links
- Contact form inputs: 16px font (prevents iOS zoom)
- Responsive typography scaling via `text-5xl sm:text-6xl md:text-7xl`
- Stats grid: 2-col on mobile, 4-col on desktop
- Program cards: single column stack on mobile

---

## SEO

- **Title:** "Sairam Sanskruthi Vidhyalaya | Premium Kindergarten in Bangalore"
- **Description:** Play-based learning + cultural values messaging
- **Keywords:** kindergarten bangalore, play group appa garden, nursery school bangalore, day care bangalore, LKG UKG bangalore, sairam sanskruthi vidhyalaya, best kindergarten bangalore
- All images use descriptive `alt` text
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`)
- Self-hosted Google Fonts (no external requests)
- Static generation for all pages (fast TTFB)

---

## Deployment

- **Platform:** Vercel
- **Project:** ssv-site
- **Production URL:** https://ssv-site-nu.vercel.app
- **Build:** Static generation, ~25s build time
- **Region:** Washington D.C. (iad1)

---

*Document version: 1.0*
*Last updated: May 26, 2026*
*Design & development: designFactorie*
