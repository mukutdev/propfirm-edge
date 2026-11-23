import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/risk-disclosure")({
  head: () => ({
    meta: [
      { title: "Risk Disclosure — Trading With Prop Firms" },
      { name: "description", content: "Trading futures involves substantial risk of loss." },
      { property: "og:title", content: "Risk Disclosure — Trading With Prop Firms" },
      { property: "og:description", content: "Trading futures involves substantial risk of loss." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Risk Disclosure">
      <p>Trading futures involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Nothing on this site is financial advice.</p>
    </LegalPage>
  ),
});
