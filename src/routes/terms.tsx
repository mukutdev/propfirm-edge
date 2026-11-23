import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Trading With Prop Firms" },
      { name: "description", content: "The terms for using Trading With Prop Firms." },
      { property: "og:title", content: "Terms of Use — Trading With Prop Firms" },
      { property: "og:description", content: "The terms for using Trading With Prop Firms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Terms of Use">
      <p>This site is for information only. Firm rules, prices and discount codes can change at any time, so always check the firm's own website before you buy.</p>
    </LegalPage>
  ),
});
