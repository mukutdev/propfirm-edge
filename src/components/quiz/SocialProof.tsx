import { testimonials } from "@/lib/quiz-data";

export function SocialProof() {
  return (
    <section className="px-4 pb-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Traders who used this quiz
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-purple-500/20 bg-[#141414] p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" />
                <div>
                  <figcaption className="font-display font-bold text-white">{t.name}</figcaption>
                  <div className="text-xs text-yellow-400">★★★★★</div>
                </div>
              </div>
              <blockquote className="mt-3 text-sm text-muted-foreground">"{t.quote}"</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}