import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsDirectory } from "@/components/reviews/ReviewsDirectory";

export const Route = createFileRoute("/reviews/")({
  head: () => ({
    meta: [
      { title: "Prop Firm Reviews — Trading With Prop Firms" },
      { name: "description", content: "Compare prop firms by Trustpilot rating, account limits and the latest discount codes, all in one place." },
      { property: "og:title", content: "Prop Firm Reviews — Trading With Prop Firms" },
      { property: "og:description", content: "Compare prop firms by Trustpilot rating, account limits and the latest discount codes." },
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