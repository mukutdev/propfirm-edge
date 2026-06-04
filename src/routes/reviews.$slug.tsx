import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { FirmReview } from "@/components/firm/FirmReview";
import { getFirmDetail } from "@/lib/firm-detail-data";

export const Route = createFileRoute("/reviews/$slug")({
  head: ({ params }) => {
    const firm = getFirmDetail(params.slug);
    return {
      meta: [
        { title: `${firm.name} Review (2025) — Trading With Prop Firms` },
        { name: "description", content: `Honest, in-depth review of ${firm.name}. Rules, pricing, payouts, pros and cons, and our real account experience.` },
        { property: "og:title", content: `${firm.name} Review — Trading With Prop Firms` },
        { property: "og:description", content: `Real account experience, full rule breakdown, pricing and exclusive discount on ${firm.name}.` },
      ],
    };
  },
  component: FirmReviewPage,
});

function FirmReviewPage() {
  const { slug } = Route.useParams();
  const firm = getFirmDetail(slug);
  return (
    <main className="bg-background text-foreground min-h-screen pb-32">
      <Navbar />
      <FirmReview firm={firm} />
      <Footer />
    </main>
  );
}