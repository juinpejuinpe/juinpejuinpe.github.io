import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  tags: string[];
};

export type Post = PostMeta & {
  content: string;
  wordCount: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function toDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").slice(0, 10);
}

function toTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

async function readPostFile(fileName: string): Promise<Post> {
  const raw = await fs.readFile(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.md$/, "");
  const title = typeof data.title === "string" ? data.title : slug;
  const date = toDateString(data.date);
  const excerpt =
    typeof data.excerpt === "string"
      ? data.excerpt
      : content.replace(/\s+/g, " ").trim().slice(0, 160) + "…";

  return {
    slug,
    title,
    date,
    excerpt,
    tags: toTags(data.tags),
    content: content.trim(),
    wordCount: content.trim().split(/\s+/).filter(Boolean).length,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries
    .filter((entry) => entry.endsWith(".md"))
    .sort((a, b) => b.localeCompare(a));

  const posts = await Promise.all(files.map((file) => readPostFile(file)));
  return posts
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, wordCount: _wordCount, ...meta }) => meta);
}

export async function getPostBySlug(
  slug: string,
): Promise<Post | undefined> {
  try {
    return await readPostFile(`${slug}.md`);
  } catch {
    return undefined;
  }
}

export async function getRecentPosts(count: number): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
