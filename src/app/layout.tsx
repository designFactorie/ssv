import type { Metadata } from "next";
import { Fredoka, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://ssv-site-nu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sairam Sanskruthi Vidhyalaya | Premium Kindergarten in Bangalore",
    template: "%s | Sairam Sanskruthi Vidhyalaya",
  },
  description:
    "Where play meets culture. A premium kindergarten in Appa Garden, Bangalore offering Play Group, Nursery, LKG, UKG & Day Care with play-based learning and rich cultural values.",
  keywords: [
    "kindergarten bangalore",
    "play group appa garden",
    "nursery school bangalore",
    "day care bangalore",
    "LKG UKG bangalore",
    "sairam sanskruthi vidhyalaya",
    "best kindergarten bangalore",
    "preschool appa garden bangalore",
    "early childhood education bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Sairam Sanskruthi Vidhyalaya",
    title: "Sairam Sanskruthi Vidhyalaya | Premium Kindergarten in Bangalore",
    description:
      "Where play meets culture. Play Group, Nursery, LKG, UKG & Day Care with play-based learning and Indian cultural values in Appa Garden, Bangalore.",
    images: [
      {
        url: "/SSV-building.jpeg",
        width: 1200,
        height: 630,
        alt: "Sairam Sanskruthi Vidhyalaya campus in Appa Garden, Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sairam Sanskruthi Vidhyalaya | Premium Kindergarten in Bangalore",
    description:
      "Where play meets culture. Play-based learning and Indian cultural values in Appa Garden, Bangalore.",
    images: ["/SSV-building.jpeg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${BASE_URL}/#school`,
    name: "Sairam Sanskruthi Vidhyalaya",
    alternateName: "SSV",
    description:
      "Premium kindergarten offering Play Group, Nursery, LKG, UKG and Day Care with play-based learning rooted in Indian cultural values.",
    url: BASE_URL,
    logo: `${BASE_URL}/SSV - logo.png`,
    image: `${BASE_URL}/SSV-building.jpeg`,
    telephone: "+919876543210",
    email: "info@sairamsanskruthi.com",
    foundingDate: "2008",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Appa Garden",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Programs",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Play Group",
          description: "For children aged 2-3 years. Sensory exploration and motor skills development.",
        },
        {
          "@type": "OfferCatalog",
          name: "Nursery",
          description: "For children aged 3-4 years. Creative arts, music, and early academics.",
        },
        {
          "@type": "OfferCatalog",
          name: "LKG",
          description: "For children aged 4-5 years. Foundational literacy, numeracy, and social skills.",
        },
        {
          "@type": "OfferCatalog",
          name: "UKG",
          description: "For children aged 5-6 years. Advanced academics and primary school readiness.",
        },
        {
          "@type": "OfferCatalog",
          name: "Day Care",
          description: "For children aged 2-12 years. Extended care with structured activities and meals.",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
