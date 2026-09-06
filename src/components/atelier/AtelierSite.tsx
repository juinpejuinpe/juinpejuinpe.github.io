"use client";

import { useCallback, useEffect, useRef } from "react";
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

      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: "expo.out", duration: 1 });

      const scope = rootRef.current;
      if (!scope) return;

      /* ---- page-load choreography: nav, then the vertical poem ---- */
      const load = gsap.timeline({ defaults: { ease: "expo.out" } });
      load
        .from(".nav-inner", { y: -18, opacity: 0, duration: 0.7 }, 0)
        .from(
          ".hero-char",
          { yPercent: 118, duration: 1.3, stagger: 0.055 },
          0.12
        )
        .from(
          ".poem-spine",
          { scaleY: 0, transformOrigin: "top center", duration: 1.5 },
          0.3
        )
        .from(".hero-kicker", { y: 12, opacity: 0, duration: 0.6 }, 0.72)
        .from(".hero-subline", { y: 18, opacity: 0, duration: 0.9 }, 0.84)
        .from(
          ".hero-actions .btn, .hero-actions .link-underline",
          { y: 16, opacity: 0, stagger: 0.09, duration: 0.7 },
          0.98
        )
        .from(".hero-foot", { opacity: 0, duration: 0.8 }, 1.1)
        .from(
          ".hero-video-frame",
          { opacity: 0, y: 46, duration: 1.1 },
          1.05
        );

      /* ---- mask reveals for block titles (type is the architecture) ---- */
      gsap.utils.toArray<HTMLElement>("[data-lines]", scope).forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          y: 40,
          duration: 1.35,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });

      /* ---- featured cover: printed sheet lifted into view ---- */
      gsap.utils.toArray<HTMLElement>("[data-cover]", scope).forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        });
      });

      /* ---- grouped rows: prose, specs, facts, ledger, contact ---- */
      gsap.utils
        .toArray<HTMLElement>("[data-rows]", scope)
        .forEach((group) => {
          const children = Array.from(
            group.querySelectorAll<HTMLElement>("[data-row]")
          );
          if (!children.length) return;
          gsap.from(children, {
            y: 22,
            opacity: 0,
            duration: 0.85,
            stagger: 0.07,
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          });
        });

      /* ---- shelf: brass rails draw in, then the bottles arrive ---- */
      const stage = scope.querySelector<HTMLElement>(".shelf-stage");
      if (stage) {
        const rails = stage.querySelectorAll<HTMLElement>(".shelf-floor");
        gsap.from(rails, {
          scaleX: 0,
          transformOrigin: "center",
          duration: 1.6,
          stagger: 0.14,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: stage,
            start: "top 78%",
            once: true,
          },
        });

        gsap.from(stage.querySelectorAll(".label"), {
          yPercent: 28,
          opacity: 0,
          duration: 1.3,
          stagger: 0.16,
          clearProps: "transform",
          scrollTrigger: {
            trigger: stage,
            start: "top 76%",
            once: true,
          },
        });
      }

      /* ---- archive & contact hairline rows slide in row by row ---- */
      gsap.utils
        .toArray<HTMLElement>(".ledger-row, .contact-row", scope)
        .forEach((row) => {
          gsap.from(row, {
            y: 14,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              once: true,
            },
          });
        });
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

  const handleMenuChange = useCallback((open: boolean) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, []);

  useEffect(() => {
    const float = document.querySelector<HTMLElement>(".follow-float");
    if (!float) return;

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
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

  /* One work stands on the upper rail; two stand on the front rail. */
  const backWork = works[2] ?? works[1] ?? works[0];
  const frontWorks = [works[0], works[1]].filter(
    (work): work is NonNullable<typeof works[number]> => Boolean(work)
  );

  return (
    <div ref={rootRef} className="atelier">
      <Nav
        name={site.siteName}
        handle={follow.handle}
        followLabel={follow.label}
        followUrl={follow.url}
        onNavigate={scrollTo}
        onMenuChange={handleMenuChange}
      />

      <main id="main">
        <Hero hero={hero} follow={follow} onNavigate={scrollTo} />

        {/* 01 鎮店之作 */}
        <section id="book" className="sec" aria-labelledby="book-title">
          <div className="container">
            <div className="sec-head feat-head">
              <p className="eyebrow mono">
                <span className="eyebrow-no">01</span>
                {book.eyebrow}
              </p>
              <span className="tag">{book.tag}</span>
            </div>

            <h2 className="feat-title" id="book-title" data-lines>
              {book.title}
            </h2>

            <div className="feat-layout">
              <div className="feat-copy">
                <p className="feat-sub" data-rows>
                  {book.subtitle}
                </p>

                <div className="feat-intro" data-rows>
                  {book.intro.map((line) => (
                    <p key={line} data-row>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="feat-actions" data-rows>
                  {book.actions.map((action, index) => (
                    <a
                      key={action.label}
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-row
                      className={index === 0 ? "btn btn-gold" : "btn btn-ghost"}
                    >
                      {action.label}
                      <ArrowUpRightGlyph className="btn-arrow" />
                    </a>
                  ))}
                </div>

                <p className="feat-note" data-row>
                  {book.note}
                </p>
              </div>

              <aside className="feat-meta mono">
                <div className="meta-row">
                  <span className="meta-label">價格</span>
                  <span className="meta-value">{book.price}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">出版</span>
                  <span className="meta-value">{book.publisher}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">產地</span>
                  <span className="meta-value">{book.provenance}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">年份</span>
                  <span className="meta-value">{book.crafted}</span>
                </div>
              </aside>

              <figure className="feat-cover" data-cover>
                <div className="feat-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images */}
                  <img
                    src={book.cover}
                    alt={book.coverAlt}
                    width={1080}
                    height={1080}
                    className="feat-img"
                  />
                </div>
                <figcaption className="feat-caption mono">
                  <span>{book.publisher}</span>
                  <span>{book.price}</span>
                </figcaption>
              </figure>
            </div>

            <blockquote className="feat-quote" data-rows>
              <p data-row>
                <span className="quote-mark">「</span>
                {book.quote}
                <span className="quote-mark">」</span>
              </p>
              <cite className="mono" data-row>
                ——{book.quoteBy}
              </cite>
            </blockquote>
          </div>
        </section>

        {/* 02 架上書 */}
        <section id="shelf" className="sec sec-shelf" aria-labelledby="shelf-title">
          <div className="container">
            <p className="eyebrow mono" aria-hidden="true">
              <span className="eyebrow-no">02</span>
              架上書
            </p>
            <h2 id="shelf-title" className="sr-only">
              架上書
            </h2>

            {backWork ? (
              <div className="shelf-stage">
                <span className="shelf-floor shelf-floor--upper" aria-hidden="true" />
                <span className="shelf-floor shelf-floor--lower" aria-hidden="true" />

                <a
                  href={backWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label label--back"
                >
                  <span className="label-head mono">
                    <span>香淚月 Scentmoon・作品 {backWork.no}</span>
                    <span className="label-status">
                      {backWork.status ?? "連載中"}
                    </span>
                  </span>
                  <span className="label-title">{backWork.title}</span>
                  <span className="label-kind mono">{backWork.kind}</span>
                  <span className="label-from mono">{backWork.provenance}</span>
                  <span className="label-cta mono">
                    <span>{backWork.cta}</span>
                    <ArrowUpRightGlyph className="work-arrow" />
                  </span>
                </a>

                {frontWorks.map((work, index) => (
                  <a
                    key={work.no}
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`label label--front ${
                      index === 0 ? "label--front-l" : "label--front-r"
                    }`}
                  >
                    <span className="label-head mono">
                      <span>香淚月 Scentmoon・作品 {work.no}</span>
                      <span className="label-status">
                        {work.status ?? "連載中"}
                      </span>
                    </span>
                    <span className="label-title">{work.title}</span>
                    <span className="label-kind mono">{work.kind}</span>
                    <span className="label-from mono">{work.provenance}</span>
                    <span className="label-cta mono">
                      <span>{work.cta}</span>
                      <ArrowUpRightGlyph className="work-arrow" />
                    </span>
                  </a>
                ))}
              </div>
            ) : null}

            <div className="night-row">
              <div className="night-copy">
                <p className="eyebrow mono">{nightSeries.eyebrow}</p>
                <h3 className="night-title">{nightSeries.title}</h3>
                <p className="night-desc">{nightSeries.desc}</p>
              </div>
              <a
                href={nightSeries.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost night-cta"
              >
                {nightSeries.ctaLabel}
                <InstagramGlyph className="btn-icon" />
              </a>
            </div>
          </div>
        </section>

        {/* 03 調香師 */}
        <section id="about" className="sec" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-intro">
              <h2 className="block-title about-heading" id="about-title" data-lines>
                <span className="eyebrow mono">
                  <span className="eyebrow-no">03</span>
                  {about.eyebrow}
                </span>
                {about.heading}
              </h2>
              <p className="about-bio mono">
                {site.siteNameEn}・{hero.since}
              </p>
            </div>

            <div className="about-body">
              <div className="about-paragraphs">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <dl className="fact-rows" data-rows>
                {about.facts.map((fact) => (
                  <div key={fact.label} className="fact-row" data-row>
                    <dt className="fact-label mono">{fact.label}</dt>
                    <dd className="fact-value">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="container">
            <blockquote className="about-quote" data-rows>
              <p data-row>
                <span className="quote-mark">「</span>
                {about.quote}
                <span className="quote-mark">」</span>
              </p>
              <p className="about-sign" data-row>
                {site.siteName}
              </p>
              <p className="about-sign-en mono" data-row>
                {site.siteNameEn}
              </p>
            </blockquote>
          </div>
        </section>

        {/* 04 墨跡 */}
        <section id="archive" className="sec" aria-labelledby="archive-title">
          <div className="container">
            <div className="sec-head archive-head">
              <h2 className="block-title" id="archive-title" data-lines>
                <span className="eyebrow mono">
                  <span className="eyebrow-no">04</span>
                  {archive.eyebrow}
                </span>
                {archive.heading}
              </h2>
              <p className="archive-note mono">更多紀錄，持續補上。</p>
            </div>

            <div className="ledger">
              {archive.groups.map((group) => (
                <div key={group.collection} className="ledger-group">
                  <h3 className="ledger-collection mono">
                    {group.collection}
                  </h3>
                  <ul>
                    {group.entries.map((entry) => (
                      <li
                        key={`${group.collection}-${entry.title}`}
                        className="ledger-row"
                      >
                        <span className="ledger-issue mono">
                          {entry.issue}
                        </span>
                        <span className="ledger-title">{entry.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 足跡 */}
        <section className="trace" aria-label="文字走過的地方">
          <div className="trace-track">
            <ul className="trace-list mono">
              {footprints.map((place) => (
                <li key={place} className="trace-item">
                  {place}
                </li>
              ))}
            </ul>
            <ul className="trace-list mono" aria-hidden="true">
              {footprints.map((place) => (
                <li key={place} className="trace-item">
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05 來找我 */}
        <section id="contact" className="sec" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-intro-block">
              <h2 className="block-title contact-heading" id="contact-title" data-lines>
                <span className="eyebrow mono">
                  <span className="eyebrow-no">05</span>
                  {contact.eyebrow}
                </span>
                {contact.heading}
              </h2>
              <p className="contact-desc">{contact.intro}</p>
              <a
                href={`mailto:${contact.email}`}
                className="contact-mail mono"
              >
                {contact.email}
              </a>
            </div>

            <div className="contact-rows">
              <a
                href={contact.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row contact-row--main"
              >
                <span className="contact-row-label">
                  <InstagramGlyph />
                  {contact.dmLabel}
                </span>
                <ArrowUpRightGlyph className="contact-row-arrow" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="contact-row contact-row--main"
              >
                <span className="contact-row-label">
                  <MailGlyph />
                  {contact.emailLabel}
                </span>
                <ArrowUpRightGlyph className="contact-row-arrow" />
              </a>

              {contact.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row"
                >
                  <span className="contact-row-label">{social.label}</span>
                  <ArrowUpRightGlyph className="contact-row-arrow" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="atelier-footer">
        <div className="container footer-grid">
          <p className="footer-hours mono">{footer.hours}</p>
          <p className="footer-copy mono">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
        <p className="footer-word" aria-hidden="true">
          {site.siteName}
        </p>
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
