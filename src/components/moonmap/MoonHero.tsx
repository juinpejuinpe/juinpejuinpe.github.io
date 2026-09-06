"use client";

import { useEffect, useState, type CSSProperties } from "react";
import MoonPhase from "./MoonPhase";
import { ArrowUpRightGlyph } from "./icons";
import type { MoonFollow, MoonHero as MoonHeroContent } from "@/lib/moon-content";

type MoonInfo = {
  pct: number;
  name: string;
  waxing: boolean;
};

function moonInfo(date: Date): MoonInfo {
  const SYNODIC = 29.53058867;
  const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
  const age =
    ((date.getTime() - KNOWN_NEW_MOON) / 86400000) % SYNODIC;
  const phase = (age + SYNODIC) % SYNODIC;
  const pct = Math.round(
    (0.5 * (1 - Math.cos((2 * Math.PI * phase) / SYNODIC))) * 100
  );
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
  const bucket = Math.floor((phase / SYNODIC) * 8) % 8;
  return {
    pct,
    name: names[bucket],
    waxing: phase < SYNODIC / 2,
  };
}

function CharacterLine({ text }: { text: string }) {
  return (
    <span className="mh-line" aria-hidden="true">
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="mh-char"
          style={{ "--i": index } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

type MoonHeroProps = {
  hero: MoonHeroContent;
  follow: MoonFollow;
  onNavigate: (href: string) => void;
};

export default function MoonHero({
  hero,
  follow,
  onNavigate,
}: MoonHeroProps) {
  const [moon, setMoon] = useState<MoonInfo | null>(null);

  useEffect(() => {
    const update = () => setMoon(moonInfo(new Date()));
    update();
    const timer = window.setInterval(update, 30 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  // 盈→虧：亮面從右側移向左側（北半球觀察）
  const liveSide: "left" | "right" =
    moon && !moon.waxing ? "left" : "right";

  return (
    <section className="mh-hero" id="top" aria-labelledby="mh-title">
      <div className="container mh-grid">
        <div className="mh-copy">
          <p className="mh-kicker reveal-soft">{hero.kicker}</p>
          <h1 className="mh-title" id="mh-title">
            <span className="sr-only">
              {hero.titleLine1}
              {hero.titleLine2}
            </span>
            <span aria-hidden="true" className="mh-title-visual">
              <CharacterLine text={hero.titleLine1} />
              <CharacterLine text={hero.titleLine2} />
            </span>
          </h1>
          <p className="mh-subline">
            「{hero.subline}」
          </p>

          <div className="mh-actions">
            <a
              href={follow.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mm-btn mm-btn-gold mm-btn-lg mh-follow"
            >
              {follow.label}
              <span className="mm-btn-handle">@{follow.handle}</span>
              <ArrowUpRightGlyph className="mm-btn-arrow" />
            </a>
            <a
              href="#book"
              className="mm-link-underline mh-second"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("#book");
              }}
            >
              看鎮店之月
            </a>
          </div>
        </div>

        <div className="mh-side" aria-hidden="true">
          <div className="mh-orrery" data-parallax>
            <div className="mh-ring mh-ring-outer" />
            <div className="mh-ring mh-ring-inner" />
            <div className="mh-orbit mh-orbit-a">
              <span className="mh-sat">
                <MoonPhase pct={100} side="left" className="mmp-svg mmp-svg-tiny" />
              </span>
            </div>
            <div className="mh-orbit mh-orbit-b">
              <span className="mh-sat">
                <MoonPhase pct={0} side="right" className="mmp-svg mmp-svg-tiny" />
              </span>
              <span className="mh-sat mh-sat-2">
                <MoonPhase pct={50} side="left" className="mmp-svg mmp-svg-tiny" />
              </span>
            </div>

            <div className="mh-moon">
              <div className="mh-halo" />
              {moon ? (
                <MoonPhase
                  pct={moon.pct}
                  side={liveSide}
                  className="mmp-svg mmp-svg-hero"
                />
              ) : (
                <div className="mh-moon-placeholder" />
              )}
              <p className="mh-moon-caption mono">
                {moon
                  ? `今晚的月｜${moon.name}｜可見 ${moon.pct}%`
                  : "今晚的月｜計算中"}
              </p>
            </div>
          </div>

          <div className="mh-data mono">
            <p>{hero.coordinate}</p>
            <p>
              {hero.hours}
              <span className="mh-data-note">{hero.hoursNote}</span>
            </p>
            <p>{hero.since}</p>
          </div>
        </div>
      </div>

      <div className="mh-footer mono">
        <span>{follow.handle}</span>
        <span className="mh-footer-dot" aria-hidden="true" />
        <span>{hero.hours}・{hero.hoursNote}</span>
        <span className="mh-footer-dot" aria-hidden="true" />
        <span>{hero.since}</span>
      </div>
    </section>
  );
}
