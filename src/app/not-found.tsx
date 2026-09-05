import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-28 text-center sm:px-8">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.3em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        這一頁走失了
      </h1>
      <p className="mt-4 text-muted">你尋找的內容不在這裡——或者它已經搬家了。</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-6 py-2.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        回首頁
      </Link>
    </main>
  );
}
