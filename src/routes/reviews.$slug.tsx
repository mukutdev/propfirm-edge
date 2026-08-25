import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { FirmReview } from "@/components/firm/FirmReview";
import { getFirmPage } from "@/lib/firms.functions";

const firmQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["firm-page", slug],
    queryFn: async () => {
      const data = await getFirmPage({ data: { slug } });
      if (!data) throw notFound();
      return data;
    },
  });

export const Route = createFileRoute("/reviews/$slug")({
  loader: ({ params, context }) => context.queryClient.ensureQueryData(firmQueryOptions(params.slug)),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Firm review unavailable — Trading With Prop Firms" }, { name: "robots", content: "noindex" }] };
    }
    const { firm, averageRating, reviewCount } = loaderData;
    const title = `${firm.name} Review (${new Date().getFullYear()}) — Evaluation, Drawdown & Payouts`;
    const description = `${firm.name}: ${firm.stats.drawdownType} drawdown, ${firm.stats.profitSplit} split, ${firm.stats.payoutFrequency} payouts, up to ${firm.stats.maxAccount} allocation. ${reviewCount} trader reviews averaging ${averageRating || firm.rating}/5.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FirmReviewPage,
  pendingComponent: FirmPending,
  errorComponent: ({ error }) => (
    <FirmMessage title="We could not load this review" body={error.message} />
  ),
  notFoundComponent: () => (
    <FirmMessage
      title="No review for that firm yet"
      body="This prop firm is not in our database. Browse every firm we have tested on the reviews page."
    />
  ),
});

function FirmReviewPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(firmQueryOptions(slug));
  return (
    <main className="bg-background text-foreground min-h-screen pb-32">
      <Navbar />
      <FirmReview
        firm={data.firm}
        reviews={data.reviews}
        averageRating={data.averageRating}
        reviewCount={data.reviewCount}
      />
      <Footer />
    </main>
  );
}

function FirmPending() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-6 animate-pulse">
        <div className="h-10 w-72 rounded-lg bg-[#1a1a1a]" />
        <div className="h-40 rounded-xl bg-[#141414]" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[#141414]" />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-[#141414]" />
      </div>
    </main>
  );
}

function FirmMessage({ title, body }: { title: string; body: string }) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-40 pb-32 text-center">
        <h1 className="font-display font-bold text-3xl md:text-4xl">{title}</h1>
        <p className="text-[#888] mt-4">{body}</p>
        <Link to="/reviews" className="btn-gradient mt-8 inline-flex">Browse all prop firm reviews</Link>
      </div>
      <Footer />
    </main>
  );
}
