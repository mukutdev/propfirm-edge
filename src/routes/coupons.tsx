import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { CouponsHero } from "@/components/coupons/CouponsHero";
import { CouponsDirectory } from "@/components/coupons/CouponsDirectory";
import { EmailStrip } from "@/components/coupons/EmailStrip";
import { CouponsFAQ } from "@/components/coupons/CouponsFAQ";
import { CouponsBottomCTA } from "@/components/coupons/CouponsBottomCTA";

export const Route = createFileRoute("/coupons")({
  head: () => ({
    meta: [
      { title: "Prop Firm Discount Codes & Coupons (2025) — Trading With Prop Firms" },
      { name: "description", content: "Exclusive prop firm discount codes negotiated directly with top firms. Save up to 30% on your challenge fee — verified and updated weekly." },
      { property: "og:title", content: "Prop Firm Discount Codes & Coupons" },
      { property: "og:description", content: "Verified discount codes for every major prop firm. Updated weekly." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CouponsPage,
});

function CouponsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <CouponsHero />
      <CouponsDirectory />
      <EmailStrip />
      <CouponsFAQ />
      <CouponsBottomCTA />
      <Footer />
    </main>
  );
}