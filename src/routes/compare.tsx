import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { CompareHero } from "@/components/compare/CompareHero";
import { CompareTable } from "@/components/compare/CompareTable";
import { CustomCompare } from "@/components/compare/CustomCompare";
import { Methodology } from "@/components/compare/Methodology";
import { CompareFAQ } from "@/components/compare/CompareFAQ";
import { CompareBottomCTA } from "@/components/compare/CompareBottomCTA";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Prop Firms Side by Side — Trading With Prop Firms" },
      { name: "description", content: "Compare funding, rules, fees, drawdown type and payout speed across every major prop firm in one filterable table." },
      { property: "og:title", content: "Compare Prop Firms Side by Side — Trading With Prop Firms" },
      { property: "og:description", content: "The most complete side-by-side comparison of futures prop firms. Filter, sort and pick the right one." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />
      <CompareHero />
      <CompareTable />
      <CustomCompare />
      <Methodology />
      <CompareFAQ />
      <CompareBottomCTA />
      <Footer />
    </main>
  );
}