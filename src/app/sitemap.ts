import type { MetadataRoute } from "next";
import { absoluteUrl, sitePages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until real per-page content update dates are available.
  return sitePages.map(page => ({ url: absoluteUrl(page.path) }));
}
