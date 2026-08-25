import type { BlogPostRow } from "@/lib/blog.functions";
import { categoryLabel, formatPostDate } from "@/lib/blog-data";
import { ChartArt } from "@/components/news/ChartArt";
import { Link } from "@tanstack/react-router";

export function PopularArticles({ posts }: { posts: BlogPostRow[] }) {
  const [hero, ...rest] = posts;
  if (!hero) return null;
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-white">Most Read This Month</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Link to="/blog/$slug" params={{ slug: hero.slug }} className="group flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] transition hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {hero.featuredImage ? (
              <img src={hero.featuredImage} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <ChartArt seed={21} />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-2 py-0.5 font-bold text-white">#1 Most Read</span>
              <span className="text-muted-foreground">⏱ {hero.readTimeMins} min read</span>
            </div>
            <h3 className="font-display text-2xl font-bold leading-snug text-white group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text group-hover:text-transparent">
              {hero.title}
            </h3>
            <p className="text-sm text-muted-foreground">{hero.excerpt}</p>
            <div className="mt-auto flex items-center justify-between pt-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
                <span className="text-white">{hero.authorName}</span>
              </div>
              <span className="text-muted-foreground">{formatPostDate(hero.publishedAt)}</span>
            </div>
          </div>
        </Link>
        <ol className="flex flex-col gap-3">
          {rest.map((p, i) => (
            <li key={p.id}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex gap-4 rounded-xl border border-[#222] bg-[#141414] p-4 transition hover:border-purple-500/40 hover:bg-white/[0.02]"
              >
                <span className="bg-gradient-to-br from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-3xl font-bold leading-none text-transparent">
                  {i + 2}
                </span>
                <div className="flex-1">
                  <h4 className="line-clamp-2 font-display text-base font-bold text-white transition group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#EC4899] group-hover:bg-clip-text group-hover:text-transparent">
                    {p.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-purple-300">{categoryLabel(p.category)}</span>
                    <span className="text-muted-foreground">⏱ {p.readTimeMins} min read</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
