import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type SocialLink = {
  label: string;
  url: string;
  icon?: string;
};

export type HubButton = {
  label: string;
  href: string;
  external?: boolean;
};

export type SerialNovel = {
  title: string;
  genre: string;
  status: string;
  note?: string;
  tags: string[];
  url: string;
};

export type PublicationEntry = {
  issue?: string;
  note?: string;
  title: string;
};

export type PublicationGroup = {
  collection: string;
  entries: PublicationEntry[];
};

export type ContactContent = {
  heading: string;
  intro: string;
  ctaLabel: string;
  ctaUrl: string;
  note: string;
};

export type SiteContent = {
  siteName: string;
  siteNameEn: string;
  role: string;
  tagline: string;
  avatarImage: string;
  bio: string[];
  socials: SocialLink[];
  buttons: HubButton[];
  serials: SerialNovel[];
  publications: PublicationGroup[];
  contact: ContactContent;
};

const FILE_PATH = path.join(process.cwd(), "content", "site.yaml");

let cache: SiteContent | undefined;

export function getSiteContent(): SiteContent {
  if (cache) return cache;

  const raw = fs.readFileSync(FILE_PATH, "utf8");
  const data = matter(raw).data as Partial<SiteContent>;

  cache = {
    siteName: data.siteName ?? "香淚月",
    siteNameEn: data.siteNameEn ?? "Scentmoon",
    role: data.role ?? "",
    tagline: data.tagline ?? "",
    avatarImage: data.avatarImage ?? "",
    bio: data.bio ?? [],
    socials: data.socials ?? [],
    buttons: data.buttons ?? [],
    serials: data.serials ?? [],
    publications: data.publications ?? [],
    contact: data.contact ?? {
      heading: "合作諮詢",
      intro: "",
      ctaLabel: "聯絡我",
      ctaUrl: "",
      note: "",
    },
  };

  return cache;
}

export function wrapTitle(title: string): string {
  return title.startsWith("《") ? title : `《${title}》`;
}
