import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Sairam Sanskruthi Vidhyalaya - Kindergarten in Bangalore",
  description:
    "Learn about Sairam Sanskruthi Vidhyalaya's mission, vision, and 15+ year journey of nurturing young minds in Appa Garden, Bangalore through play-based learning and Indian cultural values.",
  openGraph: {
    title: "About Us | Sairam Sanskruthi Vidhyalaya",
    description:
      "Learn about our mission, vision, and 15+ year journey of nurturing young minds in Bangalore.",
    url: "https://ssv-site-nu.vercel.app/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
