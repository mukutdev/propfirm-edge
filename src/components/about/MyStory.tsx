export function MyStory() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">
          Why I Built This Site
        </h2>
        <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          <p>
            I started trading my own capital in the mid-2010s — small MES lots, slow bleed, and the slow,
            unglamorous grind toward consistency. When funded-account prop firms blew up, I was in early. I
            ran evaluations across a dozen of them and learned the hard way which ones paid out and which
            ones quietly buried trader-hostile rules in the fine print.
          </p>
          <p>
            The more I dug, the more it stung. Every "best prop firm" list was clearly assembled by someone
            who had never held a funded account. Same firms, same order, same affiliate priority dressed up
            as objectivity — and not a single word about whether the drawdown was trailing or static.
          </p>
          <blockquote className="relative my-6 rounded-2xl border border-purple-500/20 bg-[#141414] p-8 text-center">
            <span className="pointer-events-none absolute left-3 top-0 font-display text-[120px] leading-none text-purple-500/10">
              "
            </span>
            <p className="relative bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text font-display text-xl italic text-transparent sm:text-2xl">
              I didn't build this to get rich off affiliate links. I built it because I needed it and it didn't exist.
            </p>
            <span className="pointer-events-none absolute bottom-0 right-3 font-display text-[120px] leading-none text-purple-500/10">
              "
            </span>
          </blockquote>
          <p>
            So I started writing the reviews I wished I'd found before I burned challenge fees. Real
            evaluations. Real payout screenshots. Real rule breakdowns — scaling plans, consistency caps,
            the lot. If a firm's drawdown model was brutal, I said so, even when it cost me an affiliate deal.
          </p>
          <p>
            Today this site helps thousands of traders pick the right firm the first time and skip the
            expensive ones. That's the only scorecard I care about.
          </p>
        </div>
      </div>
    </section>
  );
}