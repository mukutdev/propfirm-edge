import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { SessionTimelineChart } from "@/components/market-hours/SessionTimelineChart";

export const Route = createFileRoute("/market-hours")({
  head: () => ({
    meta: [
      { title: "Global Market Session Hours — Futures Trading Timeline" },
      {
        name: "description",
        content:
          "Visual Gantt-style timeline of Sydney, Tokyo, London and New York trading hours — shown in your own timezone with a scrubbable clock.",
      },
      { property: "og:title", content: "Global Market Session Hours — Futures Trading Timeline" },
      {
        property: "og:description",
        content: "See exactly when Sydney, Tokyo, London and New York futures sessions are open.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/market-hours" }],
  }),
  component: MarketHoursRoute,
});

function MarketHoursRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="border-b border-[#1b1b1b] pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl">
            Global <span className="text-gradient">Market Session Hours</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[#9a9a9a]">
            See exactly when Sydney, Tokyo, London and New York are open — in your own timezone.
          </p>
        </div>
      </section>
      <div className="pt-10">
        <SessionTimelineChart />
      </div>
      <Footer />
    </main>
  );
}
