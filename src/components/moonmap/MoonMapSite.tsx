"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import MoonNav from "./MoonNav";
import MoonHero from "./MoonHero";
import MoonPhase from "./MoonPhase";
import {
  ArrowUpRightGlyph,
  CometGlyph,
  InstagramGlyph,
  MailGlyph,
  OrbitGlyph,
} from "./icons";
import type { MoonContent, MoonWork } from "@/lib/moon-content";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type MoonMapSiteProps = {
  site: MoonContent;
};

function AtlasRow({ work }: { work: MoonWork }) {
  return (
    <a
      key={work.no}
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mm-row"
    >
      <span className="mm-row-phase">
        <MoonPhase
          pct={work.phasePct}
          side={work.phaseSide}
          className="mmp-svg mmp-svg-row"
        />
      </span>

      <span className="mm-row-moon">
        <span className="mm-row-no mono">{work.no}・童幻月亮</span>
        <span className="mm-row-name">{work.moonName}</span>
        <span className="mm-row-phase-meta mono">
          {work.phase}（可見 {work.phasePct}%）
        </span>
      </span>

      <span className="mm-row-work">
        <span className="mm-row-title">{work.title}</span>
        <span className="mm-row-kind mono">
          {work.kind}
          {work.status ? `・${work.status}` : ""}
        </span>
      </span>

      <span className="mm-row-story">
        <span className="mm-row-line">{work.moonLine}</span>
        <span className="mm-row-meta mono">
          <span>母行星｜{work.planet}</span>
          <span>{work.period}</span>
        </span>
      </span>

      <span className="mm-row-cta mono">
        {work.cta}
        <ArrowUpRightGlyph className="mm-row-arrow" />
      </span>
    </a>
  );
}

export default function MoonMapSite({ site }: MoonMapSiteProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.registerPlugin(useGSAP, ScrollTrigger);
      gsap.defaults({ ease: "expo.out", duration: 1.1 });

      const scope = rootRef.current;
      if (!scope) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
        gsap.from(el, {
          y: 44,
          autoAlpha: 0,
          duration: 1.1,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-group]", scope)
        .forEach((group) => {
          const children = Array.from(group.children);
          gsap.from(children, {
            y: 34,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          });
        });

      if (window.innerWidth >= 768) {
        gsap.utils
          .toArray<HTMLElement>("[data-parallax]", scope)
          .forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: 4 },
              {
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              }
            );
          });
      }

      gsap.fromTo(
        ".mm-stream-track",
        { strokeDashoffset: 240 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".mm-stream",
            start: "top 82%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    },
    { scope: rootRef }
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const float = document.querySelector<HTMLElement>(".mm-follow-float");
    if (!float) return;

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      float.classList.toggle("is-visible", pastHero);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const target =
      href === "#top" ? null : document.querySelector<HTMLElement>(href);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target ?? 0, { duration: 1.4 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const {
    hero,
    follow,
    book,
    works,
    nightSeries,
    about,
    archive,
    footprints,
    contact,
    footer,
  } = site;

  return (
    <div ref={rootRef} className="moonmap">
      <MoonNav
        name={site.siteName}
        followLabel={follow.label}
        followUrl={follow.url}
        onNavigate={scrollTo}
      />

      <main id="main">
        <MoonHero hero={hero} follow={follow} onNavigate={scrollTo} />

        {/* 星軌分隔 */}
        <section className="mm-stream" aria-hidden="true">
          <CometGlyph className="mm-stream-comet" />
          <svg
            className="mm-stream-svg"
            viewBox="0 0 2 150"
            preserveAspectRatio="none"
          >
            <path className="mm-stream-track" d="M1 0 V150" />
          </svg>
          <OrbitGlyph className="mm-stream-orbit" />
        </section>

        {/* 01 鎮店之月 */}
        <section id="book" className="mm-section" aria-labelledby="mm-book-title">
          <div className="container">
            <div className="mm-section-head">
              <p className="mm-eyebrow mono">
                <span className="mm-eyebrow-no">01</span>
                {book.eyebrow}
              </p>
              <span className="mm-tag mm-tag-new">{book.tag}</span>
            </div>

            <div className="mm-book-grid">
              <div className="mm-book-copy">
                <h2 className="mm-display" id="mm-book-title">
                  {book.title}
                </h2>
                <p className="mm-book-subtitle">{book.subtitle}</p>

                <div className="mm-moon-id" data-reveal>
                  <div className="mm-moon-id-glyph">
                    <MoonPhase
                      pct={book.phasePct}
                      side={book.phaseSide}
                      className="mmp-svg mmp-svg-id"
                    />
                  </div>
                  <div className="mm-moon-id-copy">
                    <p className="mm-moon-id-name">{book.moonName}</p>
                    <p className="mm-moon-id-line">{book.moonLine}</p>
                    <p className="mm-moon-id-meta mono">
                      <span>母行星｜{book.planet}</span>
                      <span>{book.planetLine}</span>
                      <span>
                        {book.phase}・可見 {book.phasePct}%
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mm-intro">
                  {book.intro.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mm-records" data-reveal>
                  {book.records.map((record) => (
                    <div key={record.label} className="mm-record">
                      <span className="mm-record-label mono">
                        {record.label}
                      </span>
                      <span className="mm-record-value">{record.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mm-actions" data-reveal>
                  {book.actions.map((action, index) => (
                    <a
                      key={action.label}
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        index === 0 ? "mm-btn mm-btn-gold" : "mm-btn mm-btn-ghost"
                      }
                    >
                      {action.label}
                      <ArrowUpRightGlyph className="mm-btn-arrow" />
                    </a>
                  ))}
                </div>
                <p className="mm-note mono">{book.note}</p>
              </div>

              <figure className="mm-book-visual" data-reveal>
                <div className="mm-book-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images */}
                  <img
                    src={book.cover}
                    alt={book.coverAlt}
                    width={1080}
                    height={1080}
                    className="mm-book-image"
                  />
                  <div className="mm-book-badge">
                    <MoonPhase
                      pct={book.phasePct}
                      side={book.phaseSide}
                      className="mmp-svg mmp-svg-badge"
                    />
                    <span className="mono">
                      {book.moonName}・{book.phase}
                    </span>
                  </div>
                  <div className="mm-book-price mono">
                    {book.price}・{book.publisher}
                  </div>
                </div>
                <figcaption className="mm-book-meta mono">
                  <span>{book.provenance}</span>
                  <span>{book.crafted}</span>
                </figcaption>
              </figure>
            </div>

            <blockquote className="mm-quote" data-reveal>
              <p>「{book.quote}」</p>
              <cite>——{book.quoteBy}</cite>
            </blockquote>
          </div>
        </section>

        {/* 02 月相圖 */}
        <section id="shelf" className="mm-section" aria-labelledby="mm-shelf-title">
          <div className="container">
            <div className="mm-section-head">
              <p className="mm-eyebrow mono">
                <span className="mm-eyebrow-no">02</span>
                月相圖
              </p>
              <p className="mm-section-note mono">
                每部作品，都是一顆童幻月亮
              </p>
            </div>
            <h2 className="mm-display mm-display-sm" id="mm-shelf-title">
              同一片夜空，還有這些月亮
            </h2>

            <div className="mm-atlas" data-reveal-group>
              {works.map((work) => (
                <AtlasRow key={work.no} work={work} />
              ))}
            </div>

            <div className="mm-night" data-reveal>
              <div className="mm-night-glyph">
                <MoonPhase
                  pct={nightSeries.phasePct}
                  side={nightSeries.phaseSide}
                  className="mmp-svg mmp-svg-night"
                />
              </div>
              <div className="mm-night-copy">
                <p className="mm-eyebrow mono">{nightSeries.eyebrow}</p>
                <h3 className="mm-night-title">{nightSeries.title}</h3>
                <p className="mm-night-desc">{nightSeries.desc}</p>
              </div>
              <a
                href={nightSeries.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mm-btn mm-btn-gold"
              >
                {nightSeries.ctaLabel}
                <InstagramGlyph className="mm-btn-icon" />
              </a>
            </div>
          </div>
        </section>

        {/* 03 觀月者 */}
        <section id="about" className="mm-section" aria-labelledby="mm-about-title">
          <div className="container mm-about-grid">
            <div className="mm-about-sticky">
              <p className="mm-eyebrow mono">
                <span className="mm-eyebrow-no">03</span>
                {about.eyebrow}
              </p>
              <blockquote className="mm-about-quote" data-reveal>
                「{about.quote}」
              </blockquote>
              <p className="mm-signature">{site.siteName}</p>
              <p className="mm-signature-en mono">{site.siteNameEn}</p>
            </div>

            <div className="mm-about-body">
              <h2 className="mm-display mm-display-sm" id="mm-about-title">
                {about.heading}
              </h2>
              <div className="mm-about-paragraphs">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="mm-facts" data-reveal-group>
                {about.facts.map((fact) => (
                  <div key={fact.label} className="mm-fact">
                    <dt className="mono">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 04 星曆 */}
        <section id="archive" className="mm-section" aria-labelledby="mm-archive-title">
          <div className="container">
            <div className="mm-section-head">
              <p className="mm-eyebrow mono">
                <span className="mm-eyebrow-no">04</span>
                {archive.eyebrow}
              </p>
              <p className="mm-section-note mono">{archive.note}</p>
            </div>
            <h2 className="mm-display mm-display-sm" id="mm-archive-title">
              {archive.heading}
            </h2>

            <div className="mm-archive" data-reveal-group>
              {archive.groups.map((group) => (
                <div key={group.collection} className="mm-archive-group">
                  <h3 className="mm-archive-collection">{group.collection}</h3>
                  <ul>
                    {group.entries.map((entry) => (
                      <li key={`${group.collection}-${entry.title}`}>
                        <span className="mm-archive-issue mono">
                          {entry.issue}
                        </span>
                        <span className="mm-archive-title">{entry.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 觀測點 */}
        <section className="mm-stations" aria-label={site.observationLabel}>
          <div className="container">
            <p className="mm-stations-label mono">{site.observationLabel}</p>
            <ul className="mm-station-list mono">
              {footprints.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 來找我 */}
        <section id="contact" className="mm-section mm-contact" aria-labelledby="mm-contact-title">
          <div className="container mm-contact-center">
            <p className="mm-eyebrow mono">
              <span className="mm-eyebrow-no">05</span>
              {contact.eyebrow}
            </p>
            <h2 className="mm-display" id="mm-contact-title">
              {contact.heading}
            </h2>
            <p className="mm-contact-intro">{contact.intro}</p>

            <div className="mm-actions mm-contact-actions" data-reveal>
              <a
                href={contact.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mm-btn mm-btn-gold mm-btn-lg"
              >
                {contact.dmLabel}
                <InstagramGlyph className="mm-btn-icon" />
              </a>
              <a href={`mailto:${contact.email}`} className="mm-btn mm-btn-ghost mm-btn-lg">
                {contact.emailLabel}
                <MailGlyph className="mm-btn-icon" />
              </a>
            </div>
            <p className="mm-contact-email mono">{contact.email}</p>

            <ul className="mm-socials mono" data-reveal>
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mm-link-underline"
                  >
                    {social.label}
                    <ArrowUpRightGlyph className="mm-social-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="mm-footer">
        <div className="container mm-footer-inner">
          <p className="mono">{footer.hours}</p>
          <p className="mm-footer-mark">
            {site.siteName} {site.siteNameEn}
          </p>
          <p className="mono">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
      </footer>

      <a
        href={follow.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mm-follow-float"
        aria-label={follow.label}
      >
        <span>{follow.label}</span>
        <ArrowUpRightGlyph className="mm-follow-arrow" />
      </a>
    </div>
  );
}
