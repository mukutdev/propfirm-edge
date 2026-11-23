import type { ReactNode } from "react";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-40">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Placeholder — full text coming soon</p>
        <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
        <p className="mt-10 text-sm text-muted-foreground">
          Questions? Email <a href="mailto:info@tradingwithpropfirms.com" className="text-primary hover:underline">info@tradingwithpropfirms.com</a>.
        </p>
      </section>
      <Footer />
    </main>
  );
}
