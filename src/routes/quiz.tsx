import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { QuizApp } from "@/components/quiz/QuizApp";
import { HowItWorks } from "@/components/quiz/HowItWorks";
import { SocialProof } from "@/components/quiz/SocialProof";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Which Prop Firm Is Right For You? — Free Quiz" },
      { name: "description", content: "Answer 7 quick questions and get matched with the best prop firm for your trading style, experience and goals. Free, takes 60 seconds." },
      { property: "og:title", content: "Find Your Perfect Prop Firm — Free Quiz" },
      { property: "og:description", content: "Personalised prop firm match in 60 seconds. Exclusive discounts included." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quiz" },
    ],
    links: [{ rel: "canonical", href: "/quiz" }],
  }),
  component: QuizRoute,
});

function QuizRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <QuizApp />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </main>
  );
}