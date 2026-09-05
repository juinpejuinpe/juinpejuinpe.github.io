import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, stories, and blog posts.",
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent">
        The archive
      </p>
      <h1 className="mb-10 text-4xl font-semibold tracking-tight">Writing</h1>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="border-y border-line py-16 text-center text-muted">
          Nothing here yet — the first post is on its way.
        </p>
      )}
    </main>
  );
}
