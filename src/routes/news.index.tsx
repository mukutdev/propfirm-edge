import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsPage } from "@/components/news/NewsPage";
import { NewsletterCTA } from "@/components/news/NewsletterCTA";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "Markets & Trading News — Trading With Prop Firms" },
      { name: "description", content: "Latest futures, forex, crypto and prop firm industry news. Daily market updates, economic calendar and breaking headlines for prop traders." },
      { property: "og:title", content: "Markets & Trading News" },
      { property: "og:description", content: "Daily trading news, prop firm updates and market analysis." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/news" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsRoute,
});

function NewsRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <NewsHero />
      <NewsPage />
      <NewsletterCTA />
      <Footer />
    </main>
  );
}