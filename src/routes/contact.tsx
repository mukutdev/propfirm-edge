import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ResponsePromise } from "@/components/contact/ResponsePromise";
import { AltContactMethods } from "@/components/contact/AltContactMethods";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Trading With Prop Firms" },
      { name: "description", content: "Get in touch with Trading With Prop Firms. Partnerships, media enquiries, or report outdated info — we respond within 24 hours." },
      { property: "og:title", content: "Contact — Trading With Prop Firms" },
      { property: "og:description", content: "Questions, partnerships, or just want to say hello — we'd love to hear from you." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ContactHero />
      <div id="contact-form">
        <ContactForm />
      </div>
      <ResponsePromise />
      <AltContactMethods />
      <Footer />
    </main>
  );
}