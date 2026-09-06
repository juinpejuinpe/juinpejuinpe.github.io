import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MoonLink = {
  label: string;
  url: string;
};

export type MoonHero = {
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  subline: string;
  since: string;
  hours: string;
  hoursNote: string;
  coordinate: string;
};

export type MoonFollow = {
  label: string;
  handle: string;
  url: string;
  dmLabel: string;
  dmUrl: string;
};

export type MoonRecord = {
  label: string;
  value: string;
};

export type MoonBook = {
  eyebrow: string;
  tag: string;
  moonName: string;
  phase: string;
  phasePct: number;
  phaseSide: "left" | "right";
  title: string;
  subtitle: string;
  planet: string;
  planetLine: string;
  price: string;
  publisher: string;
  cover: string;
  coverAlt: string;
  provenance: string;
  crafted: string;
  quote: string;
  quoteBy: string;
  moonLine: string;
  records: MoonRecord[];
  intro: string[];
  actions: MoonLink[];
  note: string;
};

export type MoonWork = {
  no: string;
  moonName: string;
  phase: string;
  phasePct: number;
  phaseSide: "left" | "right";
  title: string;
  kind: string;
  status?: string;
  planet: string;
  planetLine: string;
  period: string;
  moonLine: string;
  url: string;
  cta: string;
};

export type MoonNight = {
  eyebrow: string;
  title: string;
  desc: string;
  phase: string;
  phasePct: number;
  phaseSide: "left" | "right";
  ctaLabel: string;
  url: string;
};

export type MoonAbout = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  quote: string;
};

export type MoonArchiveGroup = {
  collection: string;
  entries: { issue: string; title: string }[];
};

export type MoonArchive = {
  eyebrow: string;
  heading: string;
  note: string;
  groups: MoonArchiveGroup[];
};

export type MoonContact = {
  eyebrow: string;
  heading: string;
  intro: string;
  dmLabel: string;
  dmUrl: string;
  email: string;
  emailLabel: string;
  socials: MoonLink[];
};

export type MoonFooter = {
  hours: string;
  copyright: string;
};

export type MoonContent = {
  siteName: string;
  siteNameEn: string;
  role: string;
  metaDescription: string;
  hero: MoonHero;
  follow: MoonFollow;
  book: MoonBook;
  works: MoonWork[];
  nightSeries: MoonNight;
  about: MoonAbout;
  archive: MoonArchive;
  observationLabel: string;
  footprints: string[];
  contact: MoonContact;
  footer: MoonFooter;
};

const FILE_PATH = path.join(process.cwd(), "content", "moonmap.yaml");

let cache: MoonContent | undefined;

function parseSide(value: unknown): "left" | "right" {
  return value === "left" ? "left" : "right";
}

export function getMoonContent(): MoonContent {
  if (cache) return cache;

  const raw = fs.readFileSync(FILE_PATH, "utf8");
  const data = matter(raw).data as Partial<MoonContent>;

  cache = {
    siteName: data.siteName ?? "香淚月",
    siteNameEn: data.siteNameEn ?? "Scentmoon",
    role: data.role ?? "香港作者",
    metaDescription: data.metaDescription ?? "",
    hero: data.hero ?? {
      kicker: "",
      titleLine1: "",
      titleLine2: "",
      subline: "",
      since: "",
      hours: "",
      hoursNote: "",
      coordinate: "",
    },
    follow: data.follow ?? {
      label: "",
      handle: "",
      url: "",
      dmLabel: "",
      dmUrl: "",
    },
    book: data.book ?? {
      eyebrow: "",
      tag: "",
      moonName: "",
      phase: "",
      phasePct: 100,
      phaseSide: "left",
      title: "",
      subtitle: "",
      planet: "",
      planetLine: "",
      price: "",
      publisher: "",
      cover: "",
      coverAlt: "",
      provenance: "",
      crafted: "",
      quote: "",
      quoteBy: "",
      moonLine: "",
      records: [],
      intro: [],
      actions: [],
      note: "",
    },
    works: (data.works ?? []).map((work) => ({
      ...work,
      phaseSide: parseSide(work.phaseSide),
    })),
    nightSeries: data.nightSeries ?? {
      eyebrow: "",
      title: "",
      desc: "",
      phase: "",
      phasePct: 25,
      phaseSide: "right",
      ctaLabel: "",
      url: "",
    },
    about: data.about ?? {
      eyebrow: "",
      heading: "",
      paragraphs: [],
      facts: [],
      quote: "",
    },
    archive: data.archive ?? {
      eyebrow: "",
      heading: "",
      note: "",
      groups: [],
    },
    observationLabel: data.observationLabel ?? "文字觀測點",
    footprints: data.footprints ?? [],
    contact: data.contact ?? {
      eyebrow: "",
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

  // Normalize sides for book/night too.
  cache.book = { ...cache.book, phaseSide: parseSide(cache.book.phaseSide) };
  cache.nightSeries = {
    ...cache.nightSeries,
    phaseSide: parseSide(cache.nightSeries.phaseSide),
  };

  return cache;
}
