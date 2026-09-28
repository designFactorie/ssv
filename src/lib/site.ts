// School details confirmed by the site owner. Keep contact information consistent site-wide.
export const school = {
  name: "Sairam Sanskruthi Vidhyalaya",
  shortName: "SSV",
  url: "https://www.sairamsanskruthividhyalaya.com",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  whatsapp: "https://wa.me/919876543210",
  email: "info@sairamsanskruthi.com",
  street: "Appa Garden",
  city: "Bangalore",
  region: "Karnataka",
  country: "India",
  countryCode: "IN",
  foundingDate: "2008",
  latitude: 12.9716,
  longitude: 77.5946,
  hours: "Mon - Sat: 8:00 AM - 5:00 PM",
  logo: "/SSV%20-%20logo.png",
  image: "/SSV-building.jpeg",
} as const;

export const sitePages = [
  { path: "/", label: "Home", title: "Preschool in Appa Garden, Bangalore", description: "Play Group, Nursery, LKG, UKG and Day Care in Appa Garden, Bangalore. Discover play-based learning and Indian cultural values at Sairam Sanskruthi Vidhyalaya." },
  { path: "/about", label: "About", title: "About Our Preschool", description: "Meet Sairam Sanskruthi Vidhyalaya in Appa Garden, Bangalore. Learn about our school, founded in 2008, and our approach to play-based learning and cultural values." },
  { path: "/programs", label: "Programs", title: "Preschool & Day Care Programs", description: "Explore Play Group, Nursery, LKG, UKG and Day Care in Appa Garden, Bangalore. Find age groups, schedules and learning activities, then book a school visit." },
  { path: "/gallery", label: "Gallery", title: "Campus & Activities Gallery", description: "Explore Sairam Sanskruthi Vidhyalaya's campus, classrooms, play areas and cultural celebrations in Appa Garden, Bangalore through our school photo gallery." },
  { path: "/contact", label: "Contact", title: "Contact & Book a School Visit", description: `Visit Sairam Sanskruthi Vidhyalaya in Appa Garden, Bangalore. Call ${school.phoneDisplay}, find our opening hours, or send an enquiry to arrange a campus visit.` },
] as const;

export type SitePath = (typeof sitePages)[number]["path"];
export const absoluteUrl = (path: string) => new URL(path, school.url).toString();
