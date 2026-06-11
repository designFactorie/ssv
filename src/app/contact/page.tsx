import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Book a School Visit | Contact Sairam Sanskruthi Vidhyalaya, Bangalore",
  description:
    "Schedule a visit to Sairam Sanskruthi Vidhyalaya in Appa Garden, Bangalore. Call +91 98765 43210, email info@sairamsanskruthi.com, or fill out our enquiry form.",
  openGraph: {
    title: "Book a School Visit | Sairam Sanskruthi Vidhyalaya",
    description:
      "Schedule a campus visit. Call +91 98765 43210 or fill out our enquiry form.",
    url: "https://www.sairamsanskruthividhyalaya.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
