import type { BlogPostRow } from "@/lib/blog.functions";
import { categoryLabel, formatPostDate } from "@/lib/blog-data";
import { ChartArt } from "@/components/news/ChartArt";
import { Link } from "@tanstack/react-router";

export function FeaturedPost({ post }: { post: BlogPostRow }) {
  const p = post;
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <article className="group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-purple-500/20 bg-[#141414] shadow-[0_0_70px_-30px_rgba(124,58,237,0.7)] md:grid-cols-[55%_45%]">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            📌 Start Here
          </span>
          <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-display text-2xl font-bold leading-tight text-white transition hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#EC4899] hover:bg-clip-text hover:text-transparent sm:text-3xl md:text-4xl">
            <h2>{p.title}</h2>
          </Link>
          <p className="text-base text-muted-foreground">{p.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex w-fit items-center rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-300">
              {categoryLabel(p.category)}
            </span>
            <span className="inline-flex w-fit items-center rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1 text-xs text-muted-foreground">
              ⏱ {p.readTimeMins} min read
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
            <span className="text-white">{p.authorName}</span>
            <span className="text-muted-foreground">· {formatPostDate(p.publishedAt)}</span>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Read Guide →
          </Link>
        </div>
        <Link to="/blog/$slug" params={{ slug: p.slug }} className="relative h-56 overflow-hidden md:h-auto">
          {p.featuredImage ? (
            <img src={p.featuredImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <ChartArt seed={11} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:bg-gradient-to-l" />
        </Link>
      </article>
    </section>
  );
}
