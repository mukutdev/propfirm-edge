import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/home/ComingSoon";

export const Route = createFileRoute("/coming-soon")({
  head: () => ({
    meta: [
      { title: "TradingWithPropFirms — Coming Soon" },
      { name: "description", content: "TradingWithPropFirms is launching soon — honest prop firm reviews and the tools serious futures traders actually need." },
      { property: "og:title", content: "TradingWithPropFirms — Coming Soon" },
      { property: "og:description", content: "TradingWithPropFirms is launching soon — honest prop firm reviews and the tools serious futures traders actually need." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ComingSoon,
});
