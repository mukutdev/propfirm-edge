import { Link } from "@tanstack/react-router";
import type { NewsArticle } from "@/lib/news-data";
import { getRelatedNewsArticles } from "@/lib/news-data";
import { ChartArt } from "./ChartArt";

function body(article: NewsArticle): string[] {
  return [
    article.excerpt || `Breaking ${article.category.toLowerCase()} news with implications for funded traders, retail and prop firm operators alike.`,
    `Markets reacted within minutes. Volume spiked across the relevant instruments and volatility expanded into the session close, giving short-term traders both opportunity and added risk.`,
    `We're tracking the story as it develops. Expect follow-up coverage with reaction from analysts, prop firm operators and the trading community over the coming hours.`,
    `Want updates like this in your inbox? Subscribe to the daily newsletter at the bottom of this page.`,
  ];
}

export function NewsArticleView({ article }: { article: NewsArticle }) {
  const related = getRelatedNewsArticles(article, 4);
  return (
    <article className="mx-auto max-w-4xl px-4 pb-16 pt-8">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-white">Home</Link>
        <span className="px-2">/</span>
        <Link to="/news" className="hover:text-white">News</Link>
        <span className="px-2">/</span>
        <span className="text-white">{article.category}</span>
      </nav>

      <header className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-3 py-1 font-bold uppercase tracking-wider text-white">
            {article.category}
          </span>
          <span className="text-muted-foreground">{article.timeAgo}</span>
          {article.badge && (
            <span className={"rounded-full px-2 py-0.5 text-[11px] font-semibold " + (article.badge.color === "green" ? "bg-emerald-500/15 text-emerald-300" : "bg-orange-500/15 text-orange-300")}>
              {article.badge.label}
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {article.title}
        </h1>
        {article.excerpt && <p className="text-lg text-muted-foreground">{article.excerpt}</p>}
        <div className="flex flex-wrap items-center gap-3 border-y border-[#222] py-4 text-sm">
          {article.author && (
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
              <div>
                <div className="font-semibold text-white">{article.author}</div>
                <div className="text-xs text-muted-foreground">{article.date || article.timeAgo}</div>
              </div>
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            <button className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1.5 text-xs text-muted-foreground transition hover:text-white">Share</button>
            <button className="rounded-full border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-1.5 text-xs text-muted-foreground transition hover:text-white">Save</button>
          </div>
        </div>
      </header>

      <div className="relative mb-10 aspect-[16/8] w-full overflow-hidden rounded-2xl border border-[#222]">
        <ChartArt seed={article.id.length + 9} />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          {body(article).map((p, i) => (
            <p key={i} className="mb-5 text-base leading-relaxed text-[#d4d4d8]">{p}</p>
          ))}

          <div className="my-8 rounded-xl border border-[#222] bg-[#141414] p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-300">Key Takeaways</div>
            <ul className="mt-3 space-y-2 pl-5 text-sm text-[#d4d4d8] [&>li]:list-disc">
              <li>What changed and when it takes effect</li>
              <li>Which traders are most affected</li>
              <li>How to adjust your risk plan today</li>
            </ul>
          </div>

          <p className="mb-5 text-base leading-relaxed text-[#d4d4d8]">
            We'll update this story as more details emerge. Bookmark this page and follow our news feed for live coverage.
          </p>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-5">
            <h3 className="font-display text-base font-bold text-white">Get news alerts</h3>
            <p className="mt-1 text-sm text-muted-foreground">Daily market and prop firm updates.</p>
            <input
              type="email"
              placeholder="you@email.com"
              className="mt-3 w-full rounded-lg border border-[#2a2a2a] bg-[#0c0c0c] px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none"
            />
            <button className="mt-2 w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              Subscribe
            </button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 font-display text-2xl font-bold text-white">More from {article.category}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((a, i) => (
              <Link
                key={a.id}
                to="/news/$slug"
                params={{ slug: a.id }}
                className="group flex gap-4 rounded-xl border border-[#222] bg-[#141414] p-4 transition hover:border-purple-500/40 hover:bg-white/[0.02]"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                  <ChartArt seed={i + 17} />
                </div>
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-purple-300">{a.category}</span>
                    <span className="text-muted-foreground">{a.timeAgo}</span>
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold text-white group-hover:text-purple-200">{a.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}