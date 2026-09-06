import AtelierSite from "@/components/atelier/AtelierSite";
import { getSiteContent } from "@/lib/site-content";

export default function HomePage() {
  const site = getSiteContent();
  return <AtelierSite site={site} />;
}
