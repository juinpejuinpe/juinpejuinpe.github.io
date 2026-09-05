import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookIcon,
  MoonMark,
  SocialIcon,
} from "@/components/icons";
import { getSiteContent, wrapTitle } from "@/lib/site-content";

export default function HomePage() {
  const site = getSiteContent();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 sm:px-8">
      {/* Profile */}
      <section className="flex flex-col items-center pt-14 text-center sm:pt-20">
        {site.avatarImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.avatarImage}
            alt={`${site.siteName} 的頭像`}
            className="h-28 w-28 rounded-full border border-line object-cover"
          />
        ) : (
          <span className="flex h-28 w-28 items-center justify-center rounded-full border border-line bg-card text-accent">
            <MoonMark className="h-14 w-14" />
          </span>
        )}

        <p className="mt-6 font-sans text-xs font-medium uppercase tracking-[0.35em] text-muted">
          {site.siteNameEn}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-wider sm:text-5xl">
          {site.siteName}
        </h1>
        <p className="mt-3 font-sans text-sm tracking-wide text-accent">
          {site.role}
        </p>
        {site.tagline && (
          <p className="mt-4 text-lg italic leading-relaxed text-foreground/90">
            「{site.tagline}」
          </p>
        )}

        <ul className="mt-6 max-w-lg space-y-2 leading-relaxed text-muted">
          {site.bio.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>

        {site.socials.length > 0 && (
          <div className="mt-7 flex items-center gap-3">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <SocialIcon
                  name={social.icon ?? "link"}
                  className="h-5 w-5"
                />
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Button list */}
      <section className="mt-10 flex flex-col gap-3">
        {site.buttons.map((button) => {
          const external = button.external || button.href.startsWith("http");
          const classes =
            "group flex w-full items-center justify-between rounded-2xl border border-line bg-card/40 px-6 py-4 text-left text-base transition-all hover:border-accent/60 hover:bg-card";
          const inner = (
            <>
              <span>{button.label}</span>
              <span className="text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent">
                {external ? (
                  <ArrowUpRightIcon className="h-4 w-4" />
                ) : (
                  <span aria-hidden="true">›</span>
                )}
              </span>
            </>
          );
          return external ? (
            <a
              key={button.label}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {inner}
            </a>
          ) : (
            <Link key={button.label} href={button.href} className={classes}>
              {inner}
            </Link>
          );
        })}
      </section>

      {/* Serialized novels */}
      {site.serials.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center font-sans text-xs font-medium uppercase tracking-[0.3em] text-accent">
            網絡連載小說
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {site.serials.map((serial) => (
              <a
                key={serial.title}
                href={serial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-line bg-card/40 p-5 transition-all hover:border-accent/60 hover:bg-card"
              >
                <span className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <BookIcon className="h-8 w-8" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold leading-snug">
                    {wrapTitle(serial.title)}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {serial.genre}
                    {serial.tags.length > 0 &&
                      ` · ${serial.tags.join(" · ")}`}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-sm">
                    <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-sans text-xs text-accent">
                      {serial.status}
                    </span>
                    <span className="text-muted">
                      {serial.note} · 前往閱讀
                    </span>
                  </span>
                </span>
                <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
