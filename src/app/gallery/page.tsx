import { pageMetadata } from "@/lib/seo";
import GalleryContent from "./GalleryContent";

export const metadata = pageMetadata("/gallery");

export default function GalleryPage() {
  return <GalleryContent />;
}
