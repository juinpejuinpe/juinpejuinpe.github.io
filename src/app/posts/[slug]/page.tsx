import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const readingMinutes = Math.max(1, Math.round(post.wordCount / 200));

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <Link
        href="/posts/"
        className="font-sans text-sm text-muted transition-colors hover:text-accent"
      >
        ← All writing
      </Link>

      <article className="mt-8">
        <header className="border-b border-line pb-8">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 font-sans text-sm text-muted">
            {formatDate(post.date)} · {readingMinutes} min read
          </p>
        </header>

        <div className="prose prose-stone mt-10 max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 && (
          <footer className="mt-12 border-t border-line pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-sans text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
