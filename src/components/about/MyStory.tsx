export function MyStory() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">
          Why I Built This Site
        </h2>
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I started trading the markets in the mid-2010s — small accounts, big losses, and slowly, with
            time, real consistency. When prop firms exploded onto the scene, I jumped in early and learned
            the hard way which firms could be trusted and which ones quietly buried trader-unfriendly rules.
          </p>
          <p>
            The more I dug, the more frustrated I got. Every "top 10 prop firms" article was clearly written
            by someone who had never opened an account. The same firms appeared on every list, in the same
            order, with no real reasoning — just affiliate priority dressed up as objectivity.
          </p>
          <blockquote className="relative my-6 rounded-2xl border border-purple-500/20 bg-[#141414] p-8 text-center">
            <span className="pointer-events-none absolute left-3 top-0 font-display text-[120px] leading-none text-purple-500/10">
              "
            </span>
            <p className="relative bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-xl italic text-transparent sm:text-2xl">
              I didn't build this to get rich off affiliate links. I built it because I needed it
              and it didn't exist.
            </p>
            <span className="pointer-events-none absolute bottom-0 right-3 font-display text-[120px] leading-none text-purple-500/10">
              "
            </span>
          </blockquote>
          <p>
            So I started writing the reviews I wished I had found years ago. Real accounts. Real payouts.
            Real rule breakdowns. If a firm was bad, I said so — even when it cost me an affiliate deal.
          </p>
          <p>
            Today this site helps thousands of traders pick the right firm the first time. That's the only
            scorecard I care about.
          </p>
        </div>
      </div>
    </section>
  );
}