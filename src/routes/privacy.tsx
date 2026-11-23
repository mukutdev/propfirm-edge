import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Trading With Prop Firms" },
      { name: "description", content: "How Trading With Prop Firms handles your personal information." },
      { property: "og:title", content: "Privacy Policy — Trading With Prop Firms" },
      { property: "og:description", content: "How Trading With Prop Firms handles your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy Policy">
      <p>We only collect the information you choose to send us, such as contact form messages and reviews, and use it to reply to you and run this site.</p>
    </LegalPage>
  ),
});
