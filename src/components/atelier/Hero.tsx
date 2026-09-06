"use client";

import type { CSSProperties } from "react";
import { ArrowUpRightGlyph } from "./icons";
import type { FollowContent, HeroContent } from "@/lib/site-content";

function CharacterLine({ text }: { text: string }) {
  return (
    <span className="hero-line" aria-hidden="true">
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="hero-char"
          style={{ "--i": index } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

type HeroProps = {
  hero: HeroContent;
  follow: FollowContent;
  onNavigate: (href: string) => void;
};

export default function Hero({ hero, follow, onNavigate }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" data-parallax />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker reveal-soft">{hero.kicker}</p>
          <h1 className="hero-title" id="hero-title">
            <span className="sr-only">
              {hero.titleLine1}
              {hero.titleLine2}
            </span>
            <span aria-hidden="true" className="hero-title-visual">
              <CharacterLine text={hero.titleLine1} />
              <CharacterLine text={hero.titleLine2} />
            </span>
          </h1>
          <p className="hero-subline">
            「{hero.subline}」
          </p>

          <div className="hero-actions">
            <a
              href={follow.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg hero-follow"
            >
              {follow.label}
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

        <div className="hero-side" aria-hidden="true">
          <div className="hero-visual">
            <div className="hero-video-slot" />
            <p className="hero-video-note mono">
              影片位｜Seedance 片段待補
            </p>
          </div>

          <div className="hero-hours">
            <p className="mono hero-hours-line">
              {hero.hours}
              <span className="hero-hours-note">{hero.hoursNote}</span>
            </p>
            <p className="mono hero-since">{hero.since}</p>
          </div>
        </div>
      </div>

      <div className="hero-footer mono">
        <span>{follow.handle}</span>
        <span className="hero-footer-dot" aria-hidden="true" />
        <span>{hero.hours}・{hero.hoursNote}</span>
        <span className="hero-footer-dot" aria-hidden="true" />
        <span>{hero.since}</span>
      </div>
    </section>
  );
}
