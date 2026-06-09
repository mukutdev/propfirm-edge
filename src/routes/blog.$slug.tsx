import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getBlogPostBySlug } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    const title = post ? `${post.title} — Trading With Prop Firms` : "Article — Trading With Prop Firms";
    const desc = post?.excerpt ?? "In-depth guides on prop trading, futures, risk and psychology.";
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
    const post = getBlogPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Article not found</h1>
        <p className="mt-2 text-muted-foreground">The post you're looking for doesn't exist or was moved.</p>
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
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { post } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <BlogArticle post={post} />
      <Footer />
    </main>
  );
}