import type { Metadata } from "next";
import { absoluteUrl, school, sitePages, type SitePath } from "./site";

export function pageMetadata(path: SitePath): Metadata {
  const page = sitePages.find(page => page.path === path)!;
  const title = `${page.title} | ${school.name}`;
  const image = { url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: `${school.name} — preschool and day care in ${school.street}, ${school.city}` };
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { type: "website", locale: "en_IN", siteName: school.name, url: absoluteUrl(path), title, description: page.description, images: [image] },
    twitter: { card: "summary_large_image", title, description: page.description, images: [image] },
  };
}

export function schoolSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Preschool", "@id": `${school.url}/#school`, name: school.name, alternateName: school.shortName,
        description: sitePages[0].description, url: absoluteUrl("/"), logo: absoluteUrl(school.logo), image: absoluteUrl(school.image),
        telephone: school.phone, email: school.email, foundingDate: school.foundingDate,
        address: { "@type": "PostalAddress", streetAddress: school.street, addressLocality: school.city, addressRegion: school.region, addressCountry: school.countryCode },
        geo: { "@type": "GeoCoordinates", latitude: school.latitude, longitude: school.longitude },
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "17:00" }],
      },
      { "@type": "WebSite", "@id": `${school.url}/#website`, url: absoluteUrl("/"), name: school.name, publisher: { "@id": `${school.url}/#school` }, inLanguage: "en-IN" },
    ],
  };
}
