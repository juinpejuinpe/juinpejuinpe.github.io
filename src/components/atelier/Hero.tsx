"use client";

import type { CSSProperties } from "react";
import { ArrowUpRightGlyph } from "./icons";
import type { FollowContent, HeroContent } from "@/lib/site-content";
import MoonPhase from "./MoonPhase";

/**
 * The poem is shown as giant vertical type (直排). Punctuation is dropped
 * from the visual column — the real heading stays in the sr-only h1.
 */
function poemCharacters(titleLine1: string, titleLine2: string): string[] {
  return (titleLine1 + titleLine2)
    .replace(/[。．.！!？?，,、「」『』]/g, "")
    .split("");
}

type HeroProps = {
  hero: HeroContent;
  follow: FollowContent;
  onNavigate: (href: string) => void;
};

export default function Hero({ hero, follow, onNavigate }: HeroProps) {
  const chars = poemCharacters(hero.titleLine1, hero.titleLine2);
  const tearIndex = chars.findIndex((char) => char === "淚");

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {hero.titleLine1}
        {hero.titleLine2}
      </h1>

      <div className="hero-grid">
        <div className="hero-poem" aria-hidden="true">
          <span className="poem-spine" />
          {chars.map((char, index) => (
            <span key={`${char}-${index}`} className="char-mask">
              <span
                className={`hero-char${index === tearIndex ? " is-tear" : ""}`}
                style={{ "--i": index } as CSSProperties}
              >
                {char}
              </span>
            </span>
          ))}
        </div>

        <div className="moon-area">
          <MoonPhase />
        </div>

        <div className="hero-copy">
          <div className="hero-copy-text">
            <p className="hero-kicker mono">{hero.kicker}</p>
            <p className="hero-subline">「{hero.subline}」</p>
          </div>
          <div className="hero-actions">
            <a
              href={follow.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-follow btn-lg hero-follow"
            >
              <span>{follow.label}</span>
              <span className="btn-handle">@{follow.handle}</span>
              <ArrowUpRightGlyph className="btn-arrow" />
            </a>
            <a
              href="#book"
              className="link-underline hero-second"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("#book");
              }}
            >
              看最新的書
            </a>
          </div>
        </div>
      </div>

      <div className="hero-foot mono">
        <span>@{follow.handle}</span>
        <span className="hero-foot-sep" aria-hidden="true" />
        <span>
          {hero.hours}・{hero.hoursNote}
        </span>
        <span className="hero-foot-sep" aria-hidden="true" />
        <span>{hero.since}</span>
      </div>
    </section>
  );
}
