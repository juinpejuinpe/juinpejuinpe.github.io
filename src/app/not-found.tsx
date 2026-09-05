import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-24 pt-24 text-center sm:px-8">
      <p className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        This page wandered off
      </h1>
      <p className="mt-4 text-muted">
        The words you&apos;re looking for don&apos;t exist here — or they moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Back home
      </Link>
    </main>
  );
}
