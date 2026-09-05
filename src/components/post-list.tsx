import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}/`}
            className="group block py-6 transition-colors hover:bg-card sm:py-7"
          >
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted">
              {formatDate(post.date)}
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
              {post.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
