import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsDirectory } from "@/components/reviews/ReviewsDirectory";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Prop Firm Reviews — Trading With Prop Firms" },
      { name: "description", content: "Browse honest reviews of every major prop firm. Filter by market, sort by rating, fee or funding, and find your edge." },
      { property: "og:title", content: "Prop Firm Reviews — Trading With Prop Firms" },
      { property: "og:description", content: "Browse honest reviews of every major prop firm. Filter, compare and get exclusive discounts." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen pb-24">
      <Navbar />
      <ReviewsHero />
      <ReviewsDirectory />
      <Footer />
    </main>
  );
}