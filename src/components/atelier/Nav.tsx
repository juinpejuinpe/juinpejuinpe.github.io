"use client";

import type { MouseEvent } from "react";

const LINKS = [
  { href: "#book", label: "鎮店之作" },
  { href: "#shelf", label: "架上書" },
  { href: "#about", label: "調香師" },
  { href: "#archive", label: "墨跡" },
  { href: "#contact", label: "來找我" },
];

type NavProps = {
  name: string;
  followLabel: string;
  followUrl: string;
  onNavigate: (href: string) => void;
};

export default function Nav({
  name,
  followLabel,
  followUrl,
  onNavigate,
}: NavProps) {
  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <header className="atelier-nav">
      <div className="atelier-nav-inner">
        <a
          href="#top"
          className="atelier-logo"
          onClick={(event) => go(event, "#top")}
          aria-label={`${name}，回到店門`}
        >
          <span className="atelier-logo-mark" aria-hidden="true" />
          <span>{name}</span>
        </a>

        <nav className="atelier-nav-links" aria-label="調香室各區">
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
          className="atelier-nav-follow"
        >
          {followLabel}
        </a>
      </div>

      <nav className="atelier-nav-mobile" aria-label="調香室各區（流動）">
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
