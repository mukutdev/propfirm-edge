import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { SubmitReviewIntro, WhyReviewsMatter } from "@/components/submit/SubmitReviewIntro";
import { SubmitReviewForm } from "@/components/submit/SubmitReviewForm";
import { listFirmOptions } from "@/lib/firms.functions";

export const Route = createFileRoute("/submit-review")({
  validateSearch: (search: Record<string, unknown>) => ({ firm: typeof search["firm"] === "string" ? search["firm"] : "" }),
  loader: () => listFirmOptions(),
  head: () => ({
    meta: [
      { title: "Submit a Prop Firm Review — Trading With Prop Firms" },
      {
        name: "description",
        content:
          "Share your experience with a futures prop firm — evaluation, drawdown rules, payouts and support. Moderated reviews from real funded traders.",
      },
      { property: "og:title", content: "Submit a Prop Firm Review" },
      {
        property: "og:description",
        content: "Real reviews from real traders. Help others pick the right prop firm.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/submit-review" }],
  }),
  errorComponent: ({ error }) => (
    <div role="alert" className="p-10 text-center text-sm text-muted-foreground">
      {error instanceof Error ? error.message : "Please try again."}
    </div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Page not found.</div>,
  component: SubmitReviewRoute,
});

function SubmitReviewRoute() {
  const firms = Route.useLoaderData();
  const { firm } = Route.useSearch();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SubmitReviewIntro />
      <section className="px-4 py-14">
        <SubmitReviewForm firms={firms} preselectedSlug={firm || undefined} />
      </section>
      <WhyReviewsMatter />
      <Footer />
    </main>
  );
}
