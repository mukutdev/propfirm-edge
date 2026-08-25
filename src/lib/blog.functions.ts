import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  readTimeMins: number;
  featuredImage: string | null;
  isFeatured: boolean;
  publishedAt: string;
};

const COLUMNS =
  "id, title, slug, category, excerpt, content, author_name, read_time_mins, featured_image, is_featured, published_at";

function publicClient() {
  return createClient(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function mapRow(r: Record<string, unknown>): BlogPostRow {
  return {
    id: String(r["id"]),
    title: String(r["title"]),
    slug: String(r["slug"]),
    category: String(r["category"]),
    excerpt: String(r["excerpt"] ?? ""),
    content: String(r["content"] ?? ""),
    authorName: String(r["author_name"] ?? ""),
    readTimeMins: Number(r["read_time_mins"] ?? 6),
    featuredImage: r["featured_image"] ? String(r["featured_image"]) : null,
    isFeatured: Boolean(r["is_featured"]),
    publishedAt: String(r["published_at"]),
  };
}

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async (): Promise<BlogPostRow[]> => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(COLUMNS)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
});

export const getBlogPost = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<{ post: BlogPostRow | null; related: BlogPostRow[] }> => {
    const supabase = publicClient();
    const { data: rows, error } = await supabase
      .from("blog_posts")
      .select(COLUMNS)
      .eq("slug", data.slug)
      .limit(1);
    if (error) throw new Error(error.message);
    const first = rows?.[0];
    if (!first) return { post: null, related: [] };
    const post = mapRow(first as Record<string, unknown>);

    const { data: rel } = await supabase
      .from("blog_posts")
      .select(COLUMNS)
      .eq("category", post.category)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);

    return { post, related: (rel ?? []).map((r) => mapRow(r as Record<string, unknown>)) };
  });
