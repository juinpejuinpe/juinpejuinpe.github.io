"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRightGlyph, CrescentGlyph } from "./icons";
import type { FollowContent, HeroContent } from "@/lib/site-content";

type MoonInfo = {
  visible: number;
  waxing: boolean;
  name: string;
};

function moonInfo(date: Date): MoonInfo {
  const SYNODIC = 29.53058867;
  const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
  const age =
    ((date.getTime() - KNOWN_NEW_MOON) / 86400000) % SYNODIC;
  const phase = (age + SYNODIC) % SYNODIC;
  const visible = Math.round(
    (0.5 * (1 - Math.cos((2 * Math.PI * phase) / SYNODIC))) * 100
  );
  const waxing = phase < SYNODIC / 2;
  const names = [
    "新月",
    "娥眉月",
    "上弦月",
    "盈凸月",
    "滿月",
    "虧凸月",
    "下弦月",
    "殘月",
  ];
  const waningNames = ["新月", "殘月", "下弦月", "虧凸月"];
  const bucket = Math.round((phase / SYNODIC) * 8) % 8;
  return {
    visible,
    waxing,
    name: waxing ? names[bucket] : waningNames[bucket] ?? names[bucket],
  };
}

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
  const [moon, setMoon] = useState<MoonInfo | null>(null);

  useEffect(() => {
    const update = () => {
      const info = moonInfo(new Date());
      setMoon(info);
    };
    update();
    const timer = window.setInterval(update, 30 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

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
          <div className="moon-window" data-parallax>
            <div className="moon-halo" />
            <div className="moon-disc">
              <CrescentGlyph className="moon-crescent" />
            </div>
            <p className="moon-caption mono">
              {moon ? `今晚的月｜${moon.name}｜可見 ${moon.visible}%` : "今晚的月｜計算中"}
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
