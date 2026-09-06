import MoonMapSite from "@/components/moonmap/MoonMapSite";
import { getMoonContent } from "@/lib/moon-content";

export default function HomePage() {
  const site = getMoonContent();
  return <MoonMapSite site={site} />;
}
