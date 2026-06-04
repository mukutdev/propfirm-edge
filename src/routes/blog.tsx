import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { BlogPage } from "@/components/blog/BlogPage";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Trading Education & Prop Firm Guides — Trading With Prop Firms" },
      { name: "description", content: "In-depth prop firm guides, futures trading lessons, risk management frameworks and trading psychology. The education hub for funded traders." },
      { property: "og:title", content: "Trading Education & Prop Firm Guides" },
      { property: "og:description", content: "Long-form guides on prop trading, futures, risk and psychology." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogRoute,
});

function BlogRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <BlogPage />
      <BlogNewsletter />
      <Footer />
    </main>
  );
}