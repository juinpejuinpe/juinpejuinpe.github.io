import Link from "next/link";
import { PostList } from "@/components/post-list";
import { getRecentPosts } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";

export default async function HomePage() {
  const recentPosts = await getRecentPosts(3);

  return (
    <main>
      <section className="mx-auto w-full max-w-3xl px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
        <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
          A writer&apos;s desk
        </p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Essays, stories, and small observations from a writing life.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-8 flex items-center gap-5">
          <Link
            href="/posts/"
            className="rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Read the writing
          </Link>
          <Link
            href="/about/"
            className="font-sans text-sm font-medium text-foreground underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            About me
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-serif text-xl font-semibold tracking-tight">
            Newest words
          </h2>
          <Link
            href="/posts/"
            className="font-sans text-sm text-muted transition-colors hover:text-accent"
          >
            View all →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <PostList posts={recentPosts} />
        ) : (
          <p className="border-y border-line py-12 text-center text-muted">
            No posts yet — check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
