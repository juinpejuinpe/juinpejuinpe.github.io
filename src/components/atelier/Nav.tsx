"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUpRightGlyph } from "./icons";

const LINKS = [
  { href: "#book", label: "鎮店之作" },
  { href: "#shelf", label: "架上書" },
  { href: "#about", label: "調香師" },
  { href: "#archive", label: "墨跡" },
  { href: "#contact", label: "來找我" },
];

type NavProps = {
  name: string;
  handle: string;
  followLabel: string;
  followUrl: string;
  onNavigate: (href: string) => void;
  onMenuChange?: (open: boolean) => void;
};

export default function Nav({
  name,
  handle,
  followLabel,
  followUrl,
  onNavigate,
  onMenuChange,
}: NavProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    onMenuChange?.(open);
  }, [open, onMenuChange]);

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    close();
    onNavigate(href);
  };

  return (
    <header className="atelier-nav">
      <div className="nav-inner">
        <a
          href="#top"
          className="atelier-logo"
          onClick={(event) => go(event, "#top")}
          aria-label={`${name}，回到店門`}
        >
          <span className="logo-mark" aria-hidden="true" />
          <span>{name}</span>
        </a>

        <nav className="nav-links" aria-label="調香室各區">
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

        <div className="nav-actions">
          <a
            href={followUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-follow nav-follow"
          >
            {followLabel}
          </a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "關閉選單" : "開啟選單"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className={`nav-overlay${open ? " is-open" : ""}`}
      >
        <nav className="overlay-links" aria-label="調香室各區（流動選單）">
          {LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => go(event, link.href)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="overlay-foot">
          <a
            href={followUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-follow"
            onClick={close}
          >
            {followLabel}
            <ArrowUpRightGlyph className="btn-arrow" />
          </a>
          <span className="overlay-handle">@{handle}</span>
        </div>
      </div>
    </header>
  );
}
