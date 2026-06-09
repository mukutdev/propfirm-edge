import type { NewsArticle } from "@/lib/news-data";
import { ChartArt } from "./ChartArt";
import { Link } from "@tanstack/react-router";

export function TopStories({ articles }: { articles: NewsArticle[] }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-white">Top Stories</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {articles.map((a, i) => (
          <Link
            key={a.id}
            to="/news/$slug"
            params={{ slug: a.id }}
            className="group flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.5)] animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <ChartArt seed={i + 2} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 font-medium text-purple-300">
                  {a.category}
                </span>
                <span className="text-muted-foreground">{a.timeAgo}</span>
              </div>
              <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-white group-hover:text-purple-200">
                {a.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-sm font-semibold text-purple-400 group-hover:text-purple-300">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}