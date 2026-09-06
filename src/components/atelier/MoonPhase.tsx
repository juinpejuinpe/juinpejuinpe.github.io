"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Full-moon photo shaded by a canvas phase shader.
 *
 * Phase starts at today's real lunar phase (approximate synodic formula) and
 * advances smoothly as the hero itself scrolls out of view, finishing one full
 * synodic cycle exactly when the hero section is off the page. Reduced motion
 * keeps it at today's phase.
 */

const SYNODIC_MS = 29.530588853 * 86_400_000;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);
const MOON_SRC = "/images/moon.webp";

function realPhase(): number {
  const cycles = (Date.now() - KNOWN_NEW_MOON) / SYNODIC_MS;
  const phase = cycles - Math.floor(cycles);
  return phase < 0 ? phase + 1 : phase;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

function paintMoon(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  phase: number
) {
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

  const frame = ctx.getImageData(0, 0, width, height);
  const pixels = frame.data;
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const radius = Math.min(width, height) / 2 - 0.5;

  const angle = phase * Math.PI * 2;
  const boundary = Math.cos(angle); // +1 new moon, -1 full moon
  const waxing = phase <= 0.5; // waxing: lit edge on the right
  const softEdge = radius * 0.12;

  for (let y = 0; y < height; y += 1) {
    const dy = (y - cy) / radius;
    const dySq = dy * dy;
    if (dySq > 1) continue;
    const limb = Math.sqrt(Math.max(0, 1 - dySq));
    const rowOffset = y * width * 4;

    for (let x = 0; x < width; x += 1) {
      const dx = (x - cx) / radius;
      if (dx < -limb || dx > limb) continue;

      // Distance into the lit side. Positive = illuminated.
      const distance = waxing ? dx - boundary : -boundary - dx;
      const terminator = clamp01(0.5 + distance / (softEdge / radius));
      const lit = smooth(terminator);
      const brightness = 0.07 + 0.93 * lit;

      const i = rowOffset + x * 4;
      pixels[i] = pixels[i] * brightness;
      pixels[i + 1] = pixels[i + 1] * brightness;
      pixels[i + 2] = pixels[i + 2] * brightness;
    }
  }

  ctx.putImageData(frame, 0, 0);
}

export default function MoonPhase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const image = new Image();
    image.src = MOON_SRC;
    const hero = canvas.closest<HTMLElement>(".hero");

    let scrollTrigger: ScrollTrigger | null = null;
    let lastDrawn = -1;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const draw = (phase: number) => paintMoon(ctx, image, width, height, phase);

    image.onload = () => {
      lastDrawn = realPhase();
      draw(lastDrawn);

      if (reduced) return;

      gsap.registerPlugin(ScrollTrigger);
      if (!hero) return;
      scrollTrigger = ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const phase = (realPhase() + self.progress) % 1;
          const delta = Math.abs(phase - lastDrawn);
          if (Math.min(delta, 1 - delta) < 0.004) return;
          lastDrawn = phase;
          draw(phase);
        },
      });
    };

    return () => {
      scrollTrigger?.kill();
    };
  }, []);

  return (
    <div className="moon" aria-hidden="true">
      <span className="moon-halo" />
      <canvas
        ref={canvasRef}
        className="moon-canvas"
        width={800}
        height={800}
      />
      {/* Static fallback: visible until the shader's first paint. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOON_SRC} alt="" className="moon-fallback" loading="eager" />
    </div>
  );
}
