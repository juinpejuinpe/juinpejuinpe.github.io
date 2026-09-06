import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type SocialLink = {
  label: string;
  url: string;
};

export type HeroContent = {
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  subline: string;
  since: string;
  hours: string;
  hoursNote: string;
};

export type FollowContent = {
  label: string;
  handle: string;
  url: string;
  dmLabel: string;
  dmUrl: string;
};

export type BookAction = {
  label: string;
  url: string;
};

export type BookContent = {
  eyebrow: string;
  tag: string;
  title: string;
  subtitle: string;
  price: string;
  publisher: string;
  cover: string;
  coverAlt: string;
  provenance: string;
  crafted: string;
  quote: string;
  quoteBy: string;
  intro: string[];
  actions: BookAction[];
  note: string;
};

export type WorkContent = {
  no: string;
  title: string;
  kind: string;
  status?: string;
  provenance: string;
  url: string;
  cta: string;
};

export type NightSeriesContent = {
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  url: string;
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  quote: string;
};

export type ArchiveEntry = {
  issue: string;
  title: string;
};

export type ArchiveGroup = {
  collection: string;
  entries: ArchiveEntry[];
};

export type ArchiveContent = {
  eyebrow: string;
  heading: string;
  groups: ArchiveGroup[];
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  dmLabel: string;
  dmUrl: string;
  email: string;
  emailLabel: string;
  socials: SocialLink[];
};

export type FooterContent = {
  hours: string;
  copyright: string;
};

export type SiteContent = {
  siteName: string;
  siteNameEn: string;
  role: string;
  metaDescription: string;
  hero: HeroContent;
  follow: FollowContent;
  book: BookContent;
  works: WorkContent[];
  nightSeries: NightSeriesContent;
  about: AboutContent;
  archive: ArchiveContent;
  footprints: string[];
  contact: ContactContent;
  footer: FooterContent;
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
    role: data.role ?? "香港作者",
    metaDescription: data.metaDescription ?? "",
    hero: data.hero ?? {
      kicker: "香港作者｜香淚月",
      titleLine1: "把淚釀成香",
      titleLine2: "的人。",
      subline: "",
      since: "",
      hours: "",
      hoursNote: "",
    },
    follow: data.follow ?? {
      label: "追蹤香淚月",
      handle: "scent._.moon",
      url: "https://www.instagram.com/scent._.moon/",
      dmLabel: "私訊調香師",
      dmUrl: "https://ig.me/m/scent._.moon",
    },
    book: data.book ?? {
      eyebrow: "鎮店之香",
      tag: "",
      title: "",
      subtitle: "",
      price: "",
      publisher: "",
      cover: "",
      coverAlt: "",
      provenance: "",
      crafted: "",
      quote: "",
      quoteBy: "",
      intro: [],
      actions: [],
      note: "",
    },
    works: data.works ?? [],
    nightSeries: data.nightSeries ?? {
      eyebrow: "午夜試香",
      title: "",
      desc: "",
      ctaLabel: "",
      url: "",
    },
    about: data.about ?? {
      eyebrow: "調香師",
      heading: "",
      paragraphs: [],
      facts: [],
      quote: "",
    },
    archive: data.archive ?? {
      eyebrow: "墨跡",
      heading: "",
      groups: [],
    },
    footprints: data.footprints ?? [],
    contact: data.contact ?? {
      eyebrow: "來找我",
      heading: "",
      intro: "",
      dmLabel: "",
      dmUrl: "",
      email: "",
      emailLabel: "",
      socials: [],
    },
    footer: data.footer ?? {
      hours: "",
      copyright: "",
    },
  };

  return cache;
}
