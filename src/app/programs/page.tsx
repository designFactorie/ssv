import type { Metadata } from "next";
import ProgramsContent from "./ProgramsContent";

export const metadata: Metadata = {
  title: "Programs | Play Group, Nursery, LKG, UKG & Day Care - Sairam Sanskruthi Vidhyalaya",
  description:
    "Explore our programs: Play Group (2-3 yrs), Nursery (3-4 yrs), LKG (4-5 yrs), UKG (5-6 yrs) & Day Care (2-12 yrs). Play-based learning with cultural values at Sairam Sanskruthi Vidhyalaya, Bangalore.",
  openGraph: {
    title: "Programs | Sairam Sanskruthi Vidhyalaya",
    description:
      "Play Group, Nursery, LKG, UKG & Day Care programs with play-based learning and cultural values in Bangalore.",
    url: "https://www.sairamsanskruthividhyalaya.com/programs",
  },
};

export default function ProgramsPage() {
  return <ProgramsContent />;
}
