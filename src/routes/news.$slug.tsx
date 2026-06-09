import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { NewsArticleView } from "@/components/news/NewsArticleView";
import { getNewsArticleBySlug } from "@/lib/news-data";

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
  loader: ({ params }) => {
    const article = getNewsArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Story not found</h1>
        <p className="mt-2 text-muted-foreground">This story may have been removed or the link is incorrect.</p>
      </div>
      <Footer />
    </main>
  ),
  errorComponent: ({ error, reset }) => (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-4 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2 text-sm font-semibold text-white">Try again</button>
      </div>
      <Footer />
    </main>
  ),
  component: NewsArticleRoute,
});

function NewsArticleRoute() {
  const { article } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <NewsArticleView article={article} />
      <Footer />
    </main>
  );
}