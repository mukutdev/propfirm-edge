import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { Founder } from "@/components/about/Founder";
import { MyStory } from "@/components/about/MyStory";
import { ReviewProcess } from "@/components/about/ReviewProcess";
import { Transparency } from "@/components/about/Transparency";
import { ByTheNumbers } from "@/components/about/ByTheNumbers";
import { YoutubeBridge } from "@/components/about/YoutubeBridge";
import { ContactCTA } from "@/components/about/ContactCTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Trading With Prop Firms" },
      { name: "description", content: "Meet the trader behind Trading With Prop Firms. Honest reviews from a real futures trader with 10+ years of experience and multiple funded accounts." },
      { property: "og:title", content: "About — Trading With Prop Firms" },
      { property: "og:description", content: "Honest prop firm reviews from a real trader. No paid placements." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutRoute,
});

function AboutRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <Founder />
      <MyStory />
      <ReviewProcess />
      <Transparency />
      <ByTheNumbers />
      <YoutubeBridge />
      <ContactCTA />
      <Footer />
    </main>
  );
}