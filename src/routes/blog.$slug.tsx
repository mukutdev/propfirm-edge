import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getBlogPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getBlogPost({ data: { slug: params.slug } });
    if (!result.post) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Trading With Prop Firms` : "Article — Trading With Prop Firms";
    const desc = post?.excerpt ?? "In-depth guides on prop trading, futures, risk and psychology.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
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
  const { post, related } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <BlogArticle post={post!} related={related} />
      <Footer />
    </main>
  );
}
