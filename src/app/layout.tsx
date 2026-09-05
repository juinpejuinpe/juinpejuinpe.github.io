import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_NAME_EN } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME}｜${SITE_NAME_EN}`,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:text-accent"
        >
          跳到主要內容
        </a>
        <header className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-4 sm:px-8">
            <Link
              href="/"
              className="text-lg font-semibold tracking-wide text-foreground transition-colors hover:text-accent"
            >
              {SITE_NAME}
            </Link>
            <div className="flex items-center gap-5 font-sans text-sm text-muted">
              <Link
                href="/works/"
                className="transition-colors hover:text-foreground"
              >
                作品經歷
              </Link>
              <Link
                href="/contact/"
                className="transition-colors hover:text-foreground"
              >
                合作諮詢
              </Link>
            </div>
          </nav>
        </header>
        <div id="main" className="flex-1">
          {children}
        </div>
        <footer className="border-t border-line">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-1 px-5 py-8 font-sans text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} {SITE_NAME}</p>
            <p>所有文字與創作皆屬作者所有。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
