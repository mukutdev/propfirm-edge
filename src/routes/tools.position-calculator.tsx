import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { PositionCalculatorPage } from "@/components/tools/PositionCalculator";

export const Route = createFileRoute("/tools/position-calculator")({
  head: () => ({
    meta: [
      { title: "Futures Position Size & P&L Calculator — Trading With Prop Firms" },
      {
        name: "description",
        content:
          "Free futures position sizer and P&L estimator for 44+ CME contracts — accurate tick value for ES, NQ, MES, MNQ, gold, crude oil, treasuries, currencies, and more.",
      },
      { property: "og:title", content: "Futures Position Size & P&L Calculator — Trading With Prop Firms" },
      {
        property: "og:description",
        content:
          "Know your risk before you're in the trade. Position sizing and P&L for every major CME futures contract.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Navbar />
      <PositionCalculatorPage />
      <Footer />
    </>
  );
}
