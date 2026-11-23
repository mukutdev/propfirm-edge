import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/affiliate-disclaimer")({
  head: () => ({
    meta: [
      { title: "Affiliate Disclaimer — Trading With Prop Firms" },
      { name: "description", content: "How affiliate links work on Trading With Prop Firms." },
      { property: "og:title", content: "Affiliate Disclaimer — Trading With Prop Firms" },
      { property: "og:description", content: "How affiliate links work on Trading With Prop Firms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Affiliate Disclaimer">
      <p>Some links on this site are affiliate links. If you buy through them we may earn a commission at no extra cost to you. This never changes the Trustpilot scores or firm data we show.</p>
    </LegalPage>
  ),
});
