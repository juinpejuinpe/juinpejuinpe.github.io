"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import Nav from "./Nav";
import Hero from "./Hero";
import {
  ArrowUpRightGlyph,
  InstagramGlyph,
  MailGlyph,
} from "./icons";
import type { SiteContent } from "@/lib/site-content";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type AtelierSiteProps = {
  site: SiteContent;
};

export default function AtelierSite({ site }: AtelierSiteProps) {
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
          opacity: 0,
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
            y: 36,
            opacity: 0,
            duration: 1,
            stagger: 0.09,
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
              { yPercent: 5 },
              {
                yPercent: -5,
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
    const float = document.querySelector<HTMLElement>(".follow-float");
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
    const isTop = href === "#top";
    const target = isTop
      ? null
      : document.querySelector<HTMLElement>(href);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(isTop ? 0 : (target ?? 0), {
        duration: 1.4,
      });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const { hero, follow, book, works, nightSeries, about, archive, footprints, contact, footer } =
    site;

  return (
    <div ref={rootRef} className="atelier">
      <Nav
        name={site.siteName}
        followLabel={follow.label}
        followUrl={follow.url}
        onNavigate={scrollTo}
      />

      <main id="main">
        <Hero hero={hero} follow={follow} onNavigate={scrollTo} />

        {/* 01 鎮店之香 */}
        <section id="book" className="section" aria-labelledby="book-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow mono">
                <span className="eyebrow-no">01</span>
                {book.eyebrow}
              </p>
              <span className="tag tag-new">{book.tag}</span>
            </div>

            <div className="book-grid">
              <div className="book-copy">
                <h2 className="display-title" id="book-title">
                  {book.title}
                </h2>
                <p className="book-subtitle">{book.subtitle}</p>

                <div className="book-intro">
                  {book.intro.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="book-actions" data-reveal>
                  {book.actions.map((action, index) =>
                    index === 0 ? (
                      <a
                        key={action.label}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold"
                      >
                        {action.label}
                        <ArrowUpRightGlyph className="btn-arrow" />
                      </a>
                    ) : (
                      <a
                        key={action.label}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                      >
                        {action.label}
                        <ArrowUpRightGlyph className="btn-arrow" />
                      </a>
                    )
                  )}
                </div>
                <p className="book-note mono">{book.note}</p>
              </div>

              <figure className="book-visual" data-reveal>
                <div className="book-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images, explicit width/height for CLS */}
                  <img
                    src={book.cover}
                    alt={book.coverAlt}
                    width={1080}
                    height={1080}
                    className="book-image"
                  />
                  <div className="book-price mono">
                    {book.price}・{book.publisher}
                  </div>
                </div>
                <figcaption className="book-meta mono">
                  <span>{book.provenance}</span>
                  <span>{book.crafted}</span>
                </figcaption>
              </figure>
            </div>

            <blockquote className="book-quote" data-reveal>
              <p>「{book.quote}」</p>
              <cite>——{book.quoteBy}</cite>
            </blockquote>
          </div>
        </section>

        {/* 02 香氣陳列 */}
        <section id="shelf" className="section" aria-labelledby="shelf-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow mono">
                <span className="eyebrow-no">02</span>
                架上書
              </p>
            </div>
            <h2 className="display-title display-title-sm" id="shelf-title">
              架上其他書
            </h2>

            <div className="work-list" data-reveal-group>
              {works.map((work) => (
                <a
                  key={work.no}
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-label"
                >
                  <span className="work-label-head mono">
                    <span>香淚月 Scentmoon・作品 {work.no}</span>
                    <span>{work.status ?? "連載中"}</span>
                  </span>
                  <span className="work-label-title">{work.title}</span>
                  <span className="work-label-meta mono">
                    <span>{work.kind}</span>
                    <span>{work.provenance}</span>
                  </span>
                  <span className="work-label-foot mono">
                    <span>{work.cta}</span>
                    <ArrowUpRightGlyph className="work-arrow" />
                  </span>
                </a>
              ))}
            </div>

            <div className="night-banner" data-reveal>
              <div>
                <p className="eyebrow mono">{nightSeries.eyebrow}</p>
                <h3 className="night-title">{nightSeries.title}</h3>
                <p className="night-desc">{nightSeries.desc}</p>
              </div>
              <a
                href={nightSeries.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                {nightSeries.ctaLabel}
                <InstagramGlyph className="btn-icon" />
              </a>
            </div>
          </div>
        </section>

        {/* 03 調香師 */}
        <section id="about" className="section" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-sticky">
              <p className="eyebrow mono">
                <span className="eyebrow-no">03</span>
                {about.eyebrow}
              </p>
              <blockquote className="about-quote" data-reveal>
                「{about.quote}」
              </blockquote>
              <p className="about-signature">{site.siteName}</p>
              <p className="about-signature-en mono">{site.siteNameEn}</p>
            </div>

            <div className="about-body">
              <h2 className="display-title display-title-sm" id="about-title">
                {about.heading}
              </h2>
              <div className="about-paragraphs">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="fact-list" data-reveal-group>
                {about.facts.map((fact) => (
                  <div key={fact.label} className="fact">
                    <dt className="mono">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 04 墨跡 */}
        <section id="archive" className="section" aria-labelledby="archive-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow mono">
                <span className="eyebrow-no">04</span>
                {archive.eyebrow}
              </p>
              <p className="section-note">更多紀錄，持續調製中。</p>
            </div>
            <h2 className="display-title display-title-sm" id="archive-title">
              {archive.heading}
            </h2>

            <div className="archive-list" data-reveal-group>
              {archive.groups.map((group) => (
                <div key={group.collection} className="archive-group">
                  <h3 className="archive-collection">{group.collection}</h3>
                  <ul>
                    {group.entries.map((entry) => (
                      <li key={`${group.collection}-${entry.title}`}>
                        <span className="archive-issue mono">
                          {entry.issue}
                        </span>
                        <span className="archive-title">{entry.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 足跡 */}
        <section className="footprint-strip" aria-label="文字走過的地方">
          <div className="container">
            <ul className="footprints mono">
              {footprints.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 來找我 */}
        <section id="contact" className="section section-contact" aria-labelledby="contact-title">
          <div className="container contact-center">
            <p className="eyebrow mono">
              <span className="eyebrow-no">05</span>
              {contact.eyebrow}
            </p>
            <h2 className="display-title" id="contact-title">
              {contact.heading}
            </h2>
            <p className="contact-intro">{contact.intro}</p>

            <div className="contact-actions" data-reveal>
              <a
                href={contact.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                {contact.dmLabel}
                <InstagramGlyph className="btn-icon" />
              </a>
              <a href={`mailto:${contact.email}`} className="btn btn-ghost btn-lg">
                {contact.emailLabel}
                <MailGlyph className="btn-icon" />
              </a>
            </div>
            <p className="contact-email mono">{contact.email}</p>

            <ul className="contact-socials mono" data-reveal>
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {social.label}
                    <ArrowUpRightGlyph className="social-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="atelier-footer">
        <div className="container atelier-footer-inner">
          <p className="mono">{footer.hours}</p>
          <p className="atelier-footer-mark" aria-hidden="true">
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
        className="follow-float"
        aria-label={follow.label}
      >
        <span>{follow.label}</span>
        <ArrowUpRightGlyph className="follow-float-arrow" />
      </a>
    </div>
  );
}
