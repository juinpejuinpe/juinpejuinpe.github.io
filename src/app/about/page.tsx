import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A little about the writer behind this site.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
        About
      </p>
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">
        A little about me
      </h1>

      <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          This is where your bio will live. Tell readers who you are, what you
          write, and why this corner of the internet exists — in a few warm,
          honest sentences.
        </p>
        <p>
          You might mention where your work has appeared, the themes you keep
          returning to, or the small rituals that keep you at the desk.
        </p>
        <p>
          When you&apos;re ready, replace this text with your own words — and
          feel free to add links to your socials or email in the space below.
        </p>
      </div>

      <div className="mt-12 border-t border-line pt-8 font-sans text-sm text-muted">
        <p>Elsewhere on the internet:</p>
        <p className="mt-2">(Add your links here.)</p>
      </div>
    </main>
  );
}
