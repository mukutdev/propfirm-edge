import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { NewsArticleView } from "@/components/news/NewsArticleView";
import { getNewsArticleBySlug } from "@/lib/news-data";
import { useLiveNews } from "@/hooks/use-live-news";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => {
    const a = getNewsArticleBySlug(params.slug);
    const title = a ? `${a.title} — Trading With Prop Firms` : "News — Trading With Prop Firms";
    const desc = a?.excerpt ?? "Latest futures, forex, crypto and prop firm industry news.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
    };
  },
  errorComponent: ({ error, reset }) => (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
        <button onClick={reset} className="mt-4 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">Try again</button>
      </div>
      <Footer />
    </main>
  ),
  component: NewsArticleRoute,
});

function NewsArticleRoute() {
  const { slug } = Route.useParams();
  const local = getNewsArticleBySlug(slug);
  const { articles, loading } = useLiveNews();
  const live = local ? undefined : articles.find((a) => a.slug === slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {local ? (
        <NewsArticleView article={local} />
      ) : live ? (
        <article className="mx-auto max-w-3xl px-4 pb-16 pt-8">
          <nav className="mb-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="px-2">/</span>
            <Link to="/news" className="hover:text-white">News</Link>
            <span className="px-2">/</span>
            <span className="text-white">{live.category}</span>
          </nav>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-gradient-brand px-3 py-1 font-bold uppercase tracking-wider text-white">
              {live.category}
            </span>
            <span className="text-muted-foreground">{live.source} · {live.timeAgo}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {live.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#b5b5b5]">{live.excerpt}</p>
          <a
            href={live.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient mt-8 inline-flex items-center gap-2"
          >
            Read the full story <ExternalLink size={14} />
          </a>
          <p className="mt-4 text-xs text-[#777]">
            Headline syndicated from {live.source}. Full article opens on the publisher's site.
          </p>
        </article>
      ) : loading ? (
        <div className="mx-auto max-w-3xl animate-pulse px-4 py-20">
          <div className="h-8 w-3/4 rounded bg-[#222]" />
          <div className="mt-4 h-4 w-full rounded bg-[#1c1c1c]" />
          <div className="mt-2 h-4 w-5/6 rounded bg-[#1c1c1c]" />
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-white">Story not found</h1>
          <p className="mt-2 text-muted-foreground">This story may have rolled off the wire or the link is incorrect.</p>
          <Link to="/news" className="btn-gradient mt-6 inline-block">Back to News</Link>
        </div>
      )}

      <Footer />
    </main>
  );
}
