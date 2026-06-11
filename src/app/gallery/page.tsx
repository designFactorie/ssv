import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery | Photos of Campus, Classrooms & Activities - Sairam Sanskruthi Vidhyalaya",
  description:
    "Browse photos of our vibrant campus, colourful classrooms, play areas, cultural celebrations, and happy students at Sairam Sanskruthi Vidhyalaya, Appa Garden, Bangalore.",
  openGraph: {
    title: "Gallery | Sairam Sanskruthi Vidhyalaya",
    description:
      "Photos of our vibrant campus, classrooms, play areas, and celebrations in Bangalore.",
    url: "https://www.sairamsanskruthividhyalaya.com/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
