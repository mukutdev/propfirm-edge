import { Link } from "@tanstack/react-router";
import { Radio, ExternalLink } from "lucide-react";
import { useLiveNews } from "@/hooks/use-live-news";

export function LiveNewsFeed() {
  const { articles, loading, error } = useLiveNews();
  const items = articles.slice(0, 12);

  return (
    <section aria-label="Live news wire">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
          <Radio size={18} className="text-[#c4a8ff]" /> Live Wire
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5cf3ad]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d97e] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d97e]" />
          </span>
          Auto-refresh 5m
        </span>
      </div>

      {error && items.length === 0 && (
        <p className="rounded-lg border border-[#222] bg-[#141414] p-4 text-sm text-[#888]">
          The live wire is unavailable right now. Curated coverage below is unaffected.
        </p>
      )}

      <div className="divide-y divide-[#1e1e1e] rounded-xl border border-[#222] bg-[#141414]">
        {loading && items.length === 0
          ? [0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse p-4">
                <div className="h-4 w-3/4 rounded bg-[#222]" />
                <div className="mt-2 h-3 w-1/3 rounded bg-[#1c1c1c]" />
              </div>
            ))
          : items.map((a) => (
              <article key={a.slug} className="group p-4 transition-colors hover:bg-[#181818]">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
                  <span className="rounded-full border border-[#7c3aed]/40 px-2 py-0.5 text-[#c4a8ff]">{a.category}</span>
                  <span className="text-[#777]">{a.source}</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-[#777]">{a.timeAgo}</span>
                </div>
                <Link
                  to="/news/$slug"
                  params={{ slug: a.slug }}
                  className="mt-2 block font-display text-base font-semibold leading-snug text-white group-hover:text-[#c4a8ff]"
                >
                  {a.title}
                </Link>
                <p className="mt-1.5 line-clamp-2 text-sm text-[#888]">{a.excerpt}</p>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-[#a78bfa] hover:text-white"
                >
                  Source <ExternalLink size={11} />
                </a>
              </article>
            ))}
      </div>
    </section>
  );
}
