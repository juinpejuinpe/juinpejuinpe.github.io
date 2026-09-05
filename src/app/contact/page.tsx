import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, SocialIcon } from "@/components/icons";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "合作諮詢",
  description: "合作、邀稿或其他想法，歡迎透過 Instagram 私訊聯絡。",
};

export default function ContactPage() {
  const site = getSiteContent();
  const { contact } = site;

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <Link
        href="/"
        className="font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        ← 首頁
      </Link>

      <header className="mt-8">
        <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent">
          Contact
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {contact.heading}
        </h1>
      </header>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
        {contact.intro}
      </p>

      <a
        href={contact.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {contact.ctaLabel}
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>

      {contact.note && (
        <p className="mt-3 font-sans text-xs text-muted">{contact.note}</p>
      )}

      <div className="mt-12 border-t border-line pt-8">
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-muted">
          其他平台
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <SocialIcon
                name={social.icon ?? "link"}
                className="h-4 w-4"
              />
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
