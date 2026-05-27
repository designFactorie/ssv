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

export const metadata: Metadata = {
  title: "Sairam Sanskruthi Vidhyalaya | Premium Kindergarten in Bangalore",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
