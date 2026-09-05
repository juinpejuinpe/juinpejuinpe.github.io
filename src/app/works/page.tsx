import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent, wrapTitle } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "已出版作品及經歷",
  description: "刊載於文學刊物與平台的作品記錄。",
};

export default function WorksPage() {
  const { publications } = getSiteContent();

  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <Link
        href="/"
        className="font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        ← 首頁
      </Link>

      <header className="mt-8">
        <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.25em] text-accent">
          Publications
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          已出版作品及經歷
        </h1>
      </header>

      <div className="mt-12 space-y-12">
        {publications.map((group) => (
          <section key={group.collection}>
            <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
              <span>{wrapTitle(group.collection)}</span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-line"
              />
            </h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {group.entries.map((entry) => (
                <li
                  key={`${entry.title}-${entry.issue ?? ""}`}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <p className="text-base">{wrapTitle(entry.title)}</p>
                  <p className="font-sans text-sm text-muted">
                    {entry.issue ?? entry.note ?? ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
