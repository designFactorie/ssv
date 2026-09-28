import type { Metadata } from "next";
import { school } from "@/lib/site";
import { schoolSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { Fredoka, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionPreferences from "@/components/animations/MotionPreferences";

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

export const metadata: Metadata = {
  metadataBase: new URL(school.url),
  title: { default: school.name, template: "%s | " + school.name },
  verification: { google: "3i2D8q6vbY7UMvbXj-iHOS4a4vOmDaAh6OlZcteRH9w" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={schoolSchema()} />
        <MotionPreferences>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-navy">Skip to content</a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer />
        </MotionPreferences>
      </body>
    </html>
  );
}
