import Hero from "@/components/sections/Hero";
import ImageShowcase from "@/components/sections/ImageShowcase";
import ProgramsSection from "@/components/sections/Programs";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageShowcase />
      <ProgramsSection />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}
