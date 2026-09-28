import { pageMetadata } from "@/lib/seo";
import ProgramsContent from "./ProgramsContent";

export const metadata = pageMetadata("/programs");

export default function ProgramsPage() {
  return <ProgramsContent />;
}
