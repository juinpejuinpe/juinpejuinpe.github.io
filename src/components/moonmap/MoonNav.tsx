"use client";

import type { MouseEvent } from "react";
import { OrbitGlyph } from "./icons";

const LINKS = [
  { href: "#book", label: "鎮店之月" },
  { href: "#shelf", label: "月相圖" },
  { href: "#about", label: "觀月者" },
  { href: "#archive", label: "星曆" },
  { href: "#contact", label: "來找我" },
];

type MoonNavProps = {
  name: string;
  followLabel: string;
  followUrl: string;
  onNavigate: (href: string) => void;
};

export default function MoonNav({
  name,
  followLabel,
  followUrl,
  onNavigate,
}: MoonNavProps) {
  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <header className="mm-nav">
      <div className="mm-nav-inner container">
        <a
          href="#top"
          className="mm-logo"
          onClick={(event) => go(event, "#top")}
          aria-label={`${name}，回到觀月台`}
        >
          <OrbitGlyph className="mm-logo-glyph" />
          <span>{name}</span>
        </a>

        <nav className="mm-nav-links" aria-label="觀月台各區">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => go(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={followUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mm-nav-follow"
        >
          {followLabel}
        </a>
      </div>

      <nav className="mm-nav-mobile container" aria-label="觀月台各區（流動）">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => go(event, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
