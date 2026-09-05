import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · writing`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-10 border-b border-line bg-background/85 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="font-serif text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {SITE_NAME}
            </Link>
            <div className="flex items-center gap-6 font-sans text-sm text-muted">
              <Link
                href="/posts/"
                className="transition-colors hover:text-foreground"
              >
                Writing
              </Link>
              <Link
                href="/about/"
                className="transition-colors hover:text-foreground"
              >
                About
              </Link>
            </div>
          </nav>
        </header>
        <div id="main" className="flex-1">
          {children}
        </div>
        <footer className="border-t border-line">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-5 py-8 font-sans text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {SITE_NAME}. All words belong to
              their author.
            </p>
            <p>Published with Next.js on GitHub Pages.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
