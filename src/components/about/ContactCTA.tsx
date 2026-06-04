export function ContactCTA() {
  return (
    <section className="px-4 py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-purple-500/20 bg-[#141414] p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 0%, #7C3AED, transparent 60%)" }}
        />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Have a Question or Want to Work Together?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Whether you're a trader with a question or a prop firm interested in an honest review — I'd love to hear from you.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Get In Touch →
          </a>
        </div>
      </div>
    </section>
  );
}