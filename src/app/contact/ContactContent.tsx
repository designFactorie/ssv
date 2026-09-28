"use client";

import { school } from "@/lib/site";


import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Mandala } from "@/components/ui/ShapeDecorations";
import { PROGRAMS, normalizeEnquiry, fingerprint, getReceipt, submitEnquiry } from "@/lib/enquiry.mjs";

const programOptions = PROGRAMS;

export default function ContactContent() {
  const [formState, setFormState] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    program: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const pendingReceipt = useRef<{ fingerprint: string; receipt: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    setError("");
    const data = normalizeEnquiry(formState);
    if (!data) {
      setError("Please check both names, enter an age above 0 and up to 12 years (for example, 3 or 2.5), and a 10-digit Indian phone number. If provided, check your email and program too.");
      return;
    }
    busy.current = true;
    setSubmitting(true);
    try {
      const key = fingerprint(data);
      if (pendingReceipt.current?.fingerprint !== key) {
        pendingReceipt.current = { fingerprint: key, receipt: await getReceipt(data) };
      }
      const result = await submitEnquiry(data, pendingReceipt.current.receipt);
      if (result.ok) {
        setSubmitted(true);
      } else {
        const messages: Record<string, string> = {
          RATE_LIMIT: "A request from this phone number was recently received. Please wait a minute before sending another.",
          CONFIG: "Online requests are temporarily unavailable. Please use the phone or WhatsApp contact option.",
          VALIDATION: "Please check the details and try again.",
          ORIGIN: "This page could not submit your request. Please reload the page and try again.",
        };
        setError(messages[result.code] || "We couldn’t confirm that your request was received. Your details are still here; please retry with the same details so we can check without duplicating your request.");
      }
    } catch {
      setError("We couldn’t submit your request. Please retry, or use the phone or WhatsApp contact option.");
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cream overflow-hidden">
        <div className="absolute inset-0 pattern-rangoli" />
        <div className="absolute -right-16 top-20 opacity-20">
          <Mandala size={300} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-green/10 text-green-ink font-heading font-semibold text-sm rounded-full mb-6">
              Get in Touch
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl font-bold text-navy mb-6">
              Book a{" "}
              <span className="gradient-text">School Visit</span>
            </h1>
            <p className="text-navy/70 text-lg leading-relaxed">
              Come see our campus, meet our teachers, and experience the Sairam
              Sanskruthi difference firsthand. We&apos;d love to welcome you!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <FadeIn direction="left" className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  role="status"
                  tabIndex={-1}
                  ref={(node) => { node?.focus(); }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green/5 border border-green/20 rounded-3xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10 text-green-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="font-heading text-2xl font-bold text-navy mb-3">
                    Thank You!
                  </h3>
                  <p className="text-navy/70 mb-6">
                    We&apos;ve received your request. Our team will contact you within
                    24 hours to schedule your visit.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSubmitted(false);
                      pendingReceipt.current = null;
                      try { sessionStorage.removeItem('ssv-enquiry-receipt'); } catch { /* Optional storage. */ }
                      setFormState({
                        parentName: "",
                        childName: "",
                        childAge: "",
                        phone: "",
                        email: "",
                        program: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 bg-navy text-white font-heading font-semibold rounded-xl"
                  >
                    Submit Another Request
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} aria-busy={submitting} className="bg-cream/30 rounded-3xl p-8 sm:p-10 border border-saffron/10">
                  <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                    Schedule a Visit
                  </h2>
                  <p className="text-navy/70 text-sm mb-8">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  <fieldset disabled={submitting} className="min-w-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Parent Name */}
                    <div>
                      <label htmlFor="parentName" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Parent&apos;s Name *
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        maxLength={120}
                        autoComplete="name"
                        value={formState.parentName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Child Name */}
                    <div>
                      <label htmlFor="childName" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Child&apos;s Name *
                      </label>
                      <input
                        type="text"
                        id="childName"
                        name="childName"
                        maxLength={120}
                        value={formState.childName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                        placeholder="Child's name"
                      />
                    </div>

                    {/* Child Age */}
                    <div>
                      <label htmlFor="childAge" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Child&apos;s Age *
                      </label>
                      <input
                        type="text"
                        id="childAge"
                        name="childAge"
                        maxLength={20}
                        aria-describedby="age-help"
                        value={formState.childAge}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                        placeholder="e.g., 3 years"
                      />
                      <p id="age-help" className="mt-1 text-xs text-navy/70">Age in years, for example 3 or 2.5 (up to 12).</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        maxLength={25}
                        autoComplete="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        maxLength={254}
                        autoComplete="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Program */}
                    <div>
                      <label htmlFor="program" className="block text-sm font-medium text-navy/70 mb-1.5">
                        Interested Program
                      </label>
                      <select
                        id="program"
                        name="program"
                        value={formState.program}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all"
                      >
                        <option value="">Select a program</option>
                        {programOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="message" className="block text-sm font-medium text-navy/70 mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      maxLength={3000}
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 text-navy placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron/50 transition-all resize-none"
                      placeholder="Any specific questions or preferred visit time..."
                    />
                  </div>
                  </fieldset>

                  {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-4 bg-gradient-to-r from-saffron to-magenta text-white font-heading font-bold text-lg rounded-2xl shadow-lg shadow-saffron/25 hover:shadow-saffron/40 transition-shadow"
                  >
                    {submitting ? "Sending request…" : "Request a Visit"}
                  </motion.button>
                </form>
              )}
            </FadeIn>

            {/* Contact Info */}
            <FadeIn direction="right" className="lg:col-span-2 space-y-6">
              {/* Location Card */}
              <div className="bg-cream/30 rounded-3xl p-8 border border-saffron/10">
                <h3 className="font-heading font-bold text-lg text-navy mb-5">
                  Find Us
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-saffron-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy text-sm">Address</p>
                      <p className="text-navy/70 text-sm">
                        Sairam Sanskruthi Vidhyalaya,
                        <br />
                        {school.street}, {school.city},
                        <br />
                        {school.region}, {school.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-teal-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy text-sm">Phone</p>
                      <p className="text-navy/70 text-sm"><a href={`tel:${school.phone}`} className="underline underline-offset-4">{school.phoneDisplay}</a></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy text-sm">Email</p>
                      <p className="text-navy/70 text-sm">
                        <a href={`mailto:${school.email}`} className="underline underline-offset-4">{school.email}</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy text-sm">Hours</p>
                      <p className="text-navy/70 text-sm">
                        {school.hours}
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-3xl overflow-hidden border border-navy/10 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSairam+Sanskruthi+Vidhyalaya+Appa+Garden+Bangalore!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sairam Sanskruthi Vidhyalaya location on Google Maps"
                />
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href={`${school.whatsapp}?text=${encodeURIComponent("Hi, I would like to know more about admissions at " + school.name + ".")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl p-6 text-white text-center"
              >
                <p className="font-heading font-bold text-lg mb-1">
                  Chat on WhatsApp
                </p>
                <p className="text-white/80 text-sm">
                  Tap to message us directly on WhatsApp
                </p>
              </motion.a>

              {/* Phone CTA */}
              <motion.a
                href={`tel:${school.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block bg-gradient-to-r from-green to-teal rounded-2xl p-6 text-white text-center"
              >
                <p className="font-heading font-bold text-lg mb-1">
                  Prefer to call?
                </p>
                <p className="text-white/80 text-sm">
                  Tap to call us directly at {school.phoneDisplay}
                </p>
              </motion.a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
