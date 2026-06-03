
# Trading With Prop Firms — Homepage Build Plan

## Goal
Build a single, premium, dark-themed homepage at `/` with all 11 sections from the brief. Bloomberg-terminal-meets-modern-SaaS feel. Placeholder content/logos throughout — real content will be swapped in later.

## Design System (src/styles.css)
Replace the default shadcn tokens with the strict palette using `oklch` equivalents, plus raw hex CSS variables for direct gradient use:

- `--background` → #080808
- `--card` / surface → #141414
- `--border` → #222222
- `--primary` → #7C3AED (purple)
- `--secondary` / accent-pink → #EC4899
- `--foreground` → #FFFFFF
- `--muted-foreground` → #888888
- `--positive` → #00D97E
- `--negative` → #FF3B5C
- `--gradient-brand` → `linear-gradient(135deg, #7C3AED, #EC4899)`
- `--shadow-glow` → soft purple/pink bloom for hover and CTAs

Fonts (loaded via Google Fonts `<link>` in `__root.tsx` head):
- Headline: **Syne** (700/800)
- Body: **DM Sans** (400/500/700)
- Register as `--font-display` and `--font-sans` in `@theme`.

Utility classes added in `styles.css`:
- `.text-gradient` — purple→pink gradient text clip
- `.btn-gradient` — pill, gradient bg, glow shadow on hover
- `.btn-ghost-outline` — transparent w/ border, hover fills subtle
- `.card-surface` — #141414 bg, #222 border, hover lifts + purple glow border
- `.section-fade` — fade-in-up on viewport enter (IntersectionObserver hook)
- `.ticker` — infinite horizontal marquee keyframes
- `.hero-bloom` — radial purple/pink mesh glow background
- `.grid-lines` — subtle animated SVG grid overlay

## File Structure

```text
src/
  routes/
    __root.tsx              (add Google Fonts links, update meta)
    index.tsx               (compose all sections)
  components/
    home/
      Navbar.tsx
      Hero.tsx
      TickerBar.tsx
      TrustBar.tsx
      FeaturedFirms.tsx
      HowItWorks.tsx
      ComparisonTable.tsx
      MarketNews.tsx
      CouponsBanner.tsx
      WhyTrustUs.tsx
      DiscordCTA.tsx
      Footer.tsx
    ui/
      (existing shadcn — reuse Button where helpful)
  hooks/
    use-reveal.ts           (IntersectionObserver fade-in-up)
  lib/
    home-data.ts            (placeholder firms, news, ticker items, table rows)
```

## Section-by-section

1. **Navbar** — Sticky. Transparent on top; on scroll (>20px) switches to `#141414/90` with backdrop blur and `#222` bottom border. Logo placeholder box left ("Logo"). Links: Reviews, Compare, News, Coupons, Blog, Discord. Right: "Find A Prop Firm" gradient pill CTA. Mobile: hamburger → fullscreen `#080808/95` overlay with stacked links + CTA.

2. **Hero** — `min-h-screen` flex center. Background: hero-bloom radial gradient behind headline + faint animated grid lines. Big Syne headline "The Smartest Way To Get Prop Funded" with gradient last word. Muted sub-headline. Two CTAs: gradient "Compare Prop Firms" + ghost outlined "See All Reviews". Bottom: TickerBar.

3. **TickerBar** — Full-width dark strip, CSS keyframe marquee (duplicated track for seamless loop). 10–12 items: "Topstep • Up to $150K Funding", etc. Pauses on hover.

4. **TrustBar** — 4 stats row, gradient numbers (Syne, 3xl–5xl), muted labels under, `#222` vertical dividers between. Stacks 2x2 on mobile.

5. **FeaturedFirms** — Title with gradient underline. Desktop: 3-col grid. Mobile: horizontal snap-scroll. 6 cards. Each: logo placeholder (grey block w/ firm name), name, gold star rating, 3 stat columns (Max Funding / Profit Split / Monthly Fee), badge chip (Editor's Pick / Best for Beginners / etc.), two buttons (Read Review outlined, Get Discount gradient). Hover: lift + purple glow border.

6. **HowItWorks** — 3 horizontal steps (vertical on mobile). Large faded gradient step number behind each (e.g. `01`). Lucide icons (Search, Target, TrendingUp). Title + short copy each.

7. **ComparisonTable** — Section title "See How The Top Firms Stack Up". Table with 5 firms × 6 cols (Firm | Max Account | Profit Split | Drawdown Type | Futures Allowed | Our Rating). Alternating row bg `#141414` / `#1a1a1a`. Top pick row has purple left border. Mobile: horizontal scroll wrapper. CTA below: "View Full Comparison" gradient.

8. **MarketNews** — 3-card grid. Each: small category tag chip (gradient border), date, headline, excerpt, "Read More →" purple link. Same hover treatment as firm cards.

9. **CouponsBanner** — Full-bleed section with the brand gradient background (only fully colored section). Bold white headline + sub. White pill CTA with dark text.

10. **WhyTrustUs** — 2 columns. Left: huge Syne statement "Built by a trader. Not a marketer." Right: 4 bullets with `#00D97E` Lucide Check icons.

11. **DiscordCTA** — Dark card, centered. Discord Lucide/SVG icon, headline, sub, blurple `#5865F2` solid button "Join Free Discord".

12. **Footer** — 4 cols on desktop, stacked on mobile. Logo + tagline + social icons (Youtube, MessageCircle for Discord, Twitter). Quick links / Company / Legal columns. Top border `#222`. Bottom muted disclaimer line.

## Interactions & Polish
- `use-reveal` hook adds `.is-visible` class on intersect → triggers fade-in-up via CSS transition (no layout shift, respects `prefers-reduced-motion`).
- All gradient CTAs: pill, gradient bg, `box-shadow` purple/pink bloom intensifies on hover, slight `translate-y -1px`.
- Card hover: `transition` border-color to `#7C3AED/60`, `box-shadow` purple glow, `-translate-y-1`.
- Ticker: pure CSS `@keyframes` translateX -50% over ~40s linear infinite; duplicated content for seamless loop; `animation-play-state: paused` on hover.
- Smooth scroll: `html { scroll-behavior: smooth }` (with reduced-motion guard).
- No stock photos. Decorative SVG: grid lines + abstract chart line in hero corner.

## Routing / SEO
- Update `src/routes/index.tsx` `head()`: title "Trading With Prop Firms — Find Your Edge. Get Funded.", description, og tags. Remove placeholder JSX entirely.
- Single H1 = hero headline. Semantic `<section>` per block with `aria-label`.
- `__root.tsx`: keep `<Outlet />`; add Google Fonts `<link rel="preconnect">` and stylesheet for Syne + DM Sans via `head().links`.

## Out of scope (this turn)
- No backend / Lovable Cloud (no data, no auth).
- No sub-routes (Reviews, Compare, etc.) — links are anchors/`#` placeholders for now.
- No real firm logos or copy — all placeholders.

## Verification
- Build runs clean (TS strict).
- Visual QA in preview at desktop + mobile viewports: all 11 sections render, ticker loops, hover glows fire, mobile menu opens, no white backgrounds anywhere.
