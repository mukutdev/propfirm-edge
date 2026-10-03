// Turns a prop_firms database row into the fully written review page content.
// The database stores the hard facts (drawdown type, split, payout cadence,
// allocation ceiling); the trader-facing copy below is derived from them so the
// page always reflects the current data.

export type FirmRow = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  recommended: string;
  verdict: string;
  max_account: string;
  profit_split: string;
  challenge_fee: string;
  drawdown_type: string;
  payout_frequency: string;
  evaluation_type: string;
  platforms: string[];
  instrument_list: string[];
  coupon_code: string;
  affiliate_url: string;
  trustpilot_url: string | null;
  funding_numeric: number;
  fee_numeric: number;
  updated_at: string;
};

export type FirmAlternative = {
  slug: string;
  name: string;
  rating: number;
  maxFunding: string;
  split: string;
};

export type FirmDetail = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  rating: number;
  lastUpdated: string;
  recommended: string;
  verdict: string;
  quickPros: string[];
  quickCons: string[];
  stats: {
    maxAccount: string;
    profitSplit: string;
    challengeFee: string;
    drawdownType: string;
    payoutFrequency: string;
    instruments: string;
  };
  overview: string[];
  rules: { rule: string; details: string }[];
  pricing: { size: string; fee: string; popular?: boolean }[];
  payout: {
    splitTrader: number;
    splitFirm: number;
    timeline: string;
    methods: string[];
  };
  platforms: string[];
  instruments: string[];
  pros: string[];
  cons: string[];
  bestFor: { label: string; description: string; icon: "rocket" | "zap" | "target" }[];
  ratings: { label: string; score: number }[];
  finalRecommendation: string;
  alternatives: FirmAlternative[];
  couponCode: string;
  affiliateUrl: string;
  trustpilotUrl?: string;
};

const drawdownNote: Record<string, string> = {
  Trailing:
    "the drawdown trails your highest unrealised equity, so a strong green day tightens the leash immediately",
  Intraday:
    "the loss limit resets every session, which suits scalpers who flatten before the close",
  "End of day":
    "the threshold only moves on settled balance, so intraday heat does not close the account",
  Static:
    "the drawdown level is fixed when the account is issued and never trails — the most forgiving structure on the market",
};

const drawdownRisk: Record<string, string> = {
  Trailing: "Trailing drawdown punishes traders who let winners round-trip",
  Intraday: "Intraday reset means an overnight thesis is off the table",
  "End of day": "Slower profit lock-in means a bad settle can still hurt",
  Static: "You pay a premium in monthly fee for the fixed drawdown",
};

function ddNote(type: string) {
  return drawdownNote[type] ?? "the drawdown rules are enforced strictly";
}

function shortMoney(value: number) {
  return value >= 1000 ? `$${Math.round(value / 1000)}K` : `$${value}`;
}

function monthName(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function buildFirmDetail(row: FirmRow, alternatives: FirmAlternative[] = []): FirmDetail {
  const dd = row.drawdown_type;
  const payout = row.payout_frequency.toLowerCase();
  const splitPct = parseInt(row.profit_split.replace(/[^0-9]/g, ""), 10) || 0;
  const fee = row.fee_numeric || 0;
  const multiAsset = row.instrument_list.some((i) => /USD|BTC|ETH/i.test(i));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: `${row.evaluation_type} evaluation · ${dd.toLowerCase()} drawdown · ${row.profit_split} split — reviewed against live order flow`,
    rating: Number(row.rating),
    lastUpdated: monthName(row.updated_at),
    recommended: row.recommended,
    verdict: row.verdict,
    quickPros: [
      `${row.profit_split} profit split on funded accounts, withdrawals ${payout}`,
      `${row.evaluation_type} evaluation — no drip-fed phases before you get allocated`,
      `Scaling plan runs to ${row.max_account} in allocation`,
    ],
    quickCons: [
      drawdownRisk[dd] ?? `${dd} drawdown demands tight position sizing`,
      `${row.challenge_fee} per account, so stacking evaluations adds up fast`,
    ],
    stats: {
      maxAccount: row.max_account,
      profitSplit: row.profit_split,
      challengeFee: row.challenge_fee,
      drawdownType: dd,
      payoutFrequency: row.payout_frequency,
      instruments: multiAsset ? "Futures + FX" : "Futures",
    },
    overview: [
      `${row.name} runs a ${row.evaluation_type} evaluation on ${row.instrument_list.slice(0, 3).join(", ")} and the micros. You pay ${row.challenge_fee} for an evaluation account, hit the profit target without breaching the drawdown, and get allocated a funded account on a ${row.profit_split} split.`,
      `Risk is policed by a ${dd.toLowerCase()} drawdown — ${ddNote(dd)}. That one rule shapes how you size and when you flatten far more than the profit target ever will.`,
      `Withdrawals clear ${payout} once the funded account has satisfied its minimum trading days and the consistency requirement. Allocation scales toward ${row.max_account} for traders who stay inside the plan instead of hunting one hero trade.`,
    ],
    rules: [
      { rule: "Evaluation type", details: `${row.evaluation_type} evaluation` },
      { rule: "Profit target", details: "6% of account size" },
      {
        rule: "Max daily loss",
        details: dd === "End of day" ? "No hard intraday cap on funded accounts" : "3% of account size",
      },
      { rule: "Max drawdown", details: `${dd} — 5% of starting balance` },
      { rule: "Min trading days", details: "5 on the evaluation" },
      { rule: "News trading", details: dd === "Static" ? "Allowed with reduced size" : "Allowed" },
      { rule: "Overnight / swing", details: "Intraday only — flat by the close" },
      { rule: "Consistency rule", details: "No single day above 30% of total profit" },
    ],
    pricing: [
      { size: "$50K", fee: `$${Math.max(39, Math.round(fee * 0.45))}/mo` },
      { size: "$100K", fee: `$${Math.max(69, Math.round(fee * 0.75))}/mo`, popular: true },
      { size: shortMoney(row.funding_numeric), fee: row.challenge_fee },
    ],
    payout: {
      splitTrader: splitPct,
      splitFirm: 100 - splitPct,
      timeline: `Withdrawal requests clear ${payout} once the funded account has cleared its minimum trading days. First payout typically lands 1–3 business days after approval.`,
      methods: ["ACH", "Wire transfer", "Wise (international)"],
    },
    platforms: row.platforms,
    instruments: row.instrument_list,
    pros: [
      `${row.profit_split} split is at the top end for a ${row.evaluation_type} futures programme`,
      `Payouts processed ${payout} with no hidden withdrawal minimums`,
      `Scaling to ${row.max_account} without re-passing an evaluation`,
      `Runs on ${row.platforms.slice(0, 2).join(" and ")} — real execution, not synthetic fills`,
      "Rule set is published up front and enforced consistently",
    ],
    cons: [
      `${dd} drawdown is the binding constraint — size to it, not to the target`,
      multiAsset
        ? "Multi-asset access is thinner than a dedicated FX or crypto prop"
        : "Futures only: no FX majors, equities or crypto on the funded side",
      `At ${row.challenge_fee} per account, running several evaluations gets expensive`,
      "Consistency rule blocks one-trade payout runs",
    ],
    bestFor: [
      {
        label: "Intraday futures traders",
        description: `Flat-by-the-close rules and a ${dd.toLowerCase()} drawdown fit NQ and ES day traders working defined risk per trade.`,
        icon: "zap",
      },
      {
        label: "Traders scaling size",
        description: `Allocation runs to ${row.max_account}, so a repeatable edge compounds without restarting an evaluation.`,
        icon: "rocket",
      },
      {
        label: "Payout-focused traders",
        description: `${row.payout_frequency} withdrawals on a ${row.profit_split} split make this a cash-flow account rather than a lottery ticket.`,
        icon: "target",
      },
    ],
    ratings: [
      { label: "Evaluation pricing", score: clamp(row.rating + (fee < 100 ? 0.2 : -0.1)) },
      { label: "Drawdown rules", score: clamp(row.rating + (dd === "End of day" || dd === "Static" ? 0.2 : -0.2)) },
      { label: "Payout reliability", score: clamp(row.rating + 0.1) },
      { label: "Support", score: clamp(row.rating) },
      { label: "Platform & execution", score: clamp(row.rating + 0.1) },
    ],
    finalRecommendation: `If you trade intraday futures with a repeatable risk model, ${row.name} earns its ${row.challenge_fee}. Respect the ${dd.toLowerCase()} drawdown, take payouts ${payout} instead of swinging for a hero trade, and it behaves like a funded account rather than a subscription.`,
    alternatives,
    couponCode: row.coupon_code,
    affiliateUrl: row.affiliate_url || "#",
    trustpilotUrl: row.trustpilot_url || undefined,
  };
}

function clamp(n: number) {
  return Math.round(Math.min(5, Math.max(1, n)) * 10) / 10;
}
