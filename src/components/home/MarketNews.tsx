import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useLiveNews } from "@/hooks/use-live-news";

export function MarketNews() {
  const ref = useReveal<HTMLDivElement>();
  const { articles, loading, error } = useLiveNews();
  const top = articles.slice(0, 3);

  return (
    <section className="py-14 md:py-20 border-y border-[#222] bg-[#0a0a0a]" aria-label="Latest market news">
      <div ref={ref} className="reveal max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl gradient-underline">
              Markets & Trading News
            </h2>
            <p className="mt-3 text-sm text-[#888]">
              Live market headlines pulled straight from CNBC Markets.
            </p>
          </div>
          <Link to="/news" className="text-sm font-semibold text-gradient">All News →</Link>
        </div>

        {error && top.length === 0 && (
          <p className="text-sm text-[#888]">Unable to refresh the feed right now. <Link to="/news" className="text-[#a78bfa]">Try the news desk</Link>.</p>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {loading && top.length === 0
            ? [0, 1, 2].map((i) => (
                <div key={i} className="card-surface p-6 animate-pulse">
                  <div className="h-4 w-24 rounded bg-[#222]" />
                  <div className="mt-4 h-5 w-full rounded bg-[#222]" />
                  <div className="mt-2 h-5 w-4/5 rounded bg-[#222]" />
                  <div className="mt-4 h-3 w-full rounded bg-[#1c1c1c]" />
                  <div className="mt-2 h-3 w-3/4 rounded bg-[#1c1c1c]" />
                </div>
              ))
            : top.map((n) => (
                <article key={n.slug} className="card-surface p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#7c3aed]/40 text-[#c4a8ff]">
                      {n.category}
                    </span>
                    <span className="text-xs text-[#888]">{n.timeAgo || n.source}</span>
                  </div>
                  <Link
                    to="/news/$slug"
                    params={{ slug: n.slug }}
                    className="font-display font-bold text-lg leading-snug hover:text-[#c4a8ff] transition-colors"
                  >
                    {n.title}
                  </Link>
                  <p className="text-sm text-[#888] leading-relaxed line-clamp-3">{n.excerpt}</p>
                  <Link
                    to="/news/$slug"
                    params={{ slug: n.slug }}
                    className="mt-auto inline-flex items-center gap-1 text-sm text-[#a78bfa] hover:text-white transition-colors"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
