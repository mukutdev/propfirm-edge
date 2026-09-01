import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FirmsShowcase } from "@/components/home/FirmsShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { MarketNews } from "@/components/home/MarketNews";
import { CouponsBanner } from "@/components/home/CouponsBanner";
import { WhyTrustUs } from "@/components/home/WhyTrustUs";
import { DiscordCTA } from "@/components/home/DiscordCTA";
import { LiveMarketWatch } from "@/components/home/LiveMarketWatch";
import { TraderReviews } from "@/components/home/TraderReviews";
import { YoutubeLive } from "@/components/home/YoutubeLive";
import { Footer } from "@/components/home/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trading With Prop Firms — Find Your Edge. Get Funded." },
      { name: "description", content: "Unbiased reviews, real comparisons and exclusive discounts on the top prop firms for futures traders." },
      { property: "og:title", content: "Trading With Prop Firms — Find Your Edge. Get Funded." },
      { property: "og:description", content: "Unbiased reviews, real comparisons and exclusive discounts on the top prop firms for futures traders." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <LiveMarketWatch />
      <FirmsShowcase />
      <HowItWorks />
      <ComparisonTable />
      <TraderReviews />
      <MarketNews />
      <CouponsBanner />
      <WhyTrustUs />
      <YoutubeLive />
      <DiscordCTA />
      <Footer />
    </main>
  );
}
