import Link from "next/link";
import { school } from "@/lib/site";

export default function ProgramQuestions() {
  return (
    <section aria-labelledby="program-questions" className="bg-cream py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="program-questions" className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">Choosing a program for your child</h2>
        <p className="text-navy/75 mb-8">Explore preschool and day care at {school.name} in {school.street}, {school.city}. These details can help you plan your school visit.</p>
        <div className="divide-y divide-navy/10">
          <details className="py-5" open>
            <summary className="cursor-pointer font-heading font-semibold text-lg text-navy">Which age group is each program for?</summary>
            <p className="mt-3 text-navy/75 leading-relaxed">Play Group is for ages 2–3, Nursery for 3–4, LKG for 4–5 and UKG for 5–6. Day Care is available for ages 2–12. Our team can help you choose a program during your visit.</p>
          </details>
          <details className="py-5">
            <summary className="cursor-pointer font-heading font-semibold text-lg text-navy">What are the preschool and day care timings?</summary>
            <p className="mt-3 text-navy/75 leading-relaxed">Preschool programs run Monday to Friday, starting at 9:00 AM. Play Group finishes at 12:00 PM, Nursery at 1:00 PM, LKG at 2:30 PM and UKG at 3:00 PM. Day Care runs Monday to Saturday, 8:00 AM to 5:00 PM.</p>
          </details>
          <details className="py-5">
            <summary className="cursor-pointer font-heading font-semibold text-lg text-navy">How do children learn at SSV?</summary>
            <p className="mt-3 text-navy/75 leading-relaxed">Our programs combine play-based learning with Indian cultural values. Activities include stories, creative arts, music, movement and age-appropriate literacy and numeracy. Explore each program above for its learning activities.</p>
          </details>
          <details className="py-5">
            <summary className="cursor-pointer font-heading font-semibold text-lg text-navy">How can I visit the school?</summary>
            <p className="mt-3 text-navy/75 leading-relaxed"><Link href="/contact" className="underline underline-offset-4 font-medium">Request a school visit</Link> using our enquiry form, or call <a href={`tel:${school.phone}`} className="underline underline-offset-4">{school.phoneDisplay}</a>. Our team will contact you to arrange your visit. You can also <Link href="/gallery" className="underline underline-offset-4">explore the campus photo gallery</Link>.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
