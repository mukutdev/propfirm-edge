export type FirmDetail = {
  slug: string;
  name: string;
  tagline: string;
  rating: number;
  lastUpdated: string;
  recommended: "Top Pick" | "Recommended" | "Solid Choice";
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
  experience: string[];
  ratings: { label: string; score: number }[];
  finalRecommendation: string;
  alternatives: { name: string; rating: number; maxFunding: string; split: string }[];
  couponCode: string;
  offerEnds: string;
};

export const firmDetails: Record<string, FirmDetail> = {
  topstep: {
    slug: "topstep",
    name: "Topstep",
    tagline: "Based on our in-depth testing & real account experience",
    rating: 4.8,
    lastUpdated: "January 2025",
    recommended: "Top Pick",
    verdict:
      "Topstep remains the gold standard for futures-focused prop firm evaluations. Their rules are fair, payouts are punctual, and the educational ecosystem around the Trading Combine genuinely helps new traders get funded.",
    quickPros: [
      "Industry-leading payout reliability and customer support",
      "Generous 90% profit split after first $5K withdrawn",
      "Mature platform integrations and clean rule set",
    ],
    quickCons: [
      "Monthly fee is higher than newer competitors",
      "Trailing drawdown can feel restrictive for swing traders",
    ],
    stats: {
      maxAccount: "$150,000",
      profitSplit: "90%",
      challengeFee: "$165/mo",
      drawdownType: "Trailing",
      payoutFrequency: "Weekly",
      instruments: "Futures",
    },
    overview: [
      "Topstep is one of the original futures prop firms, founded in 2012 in Chicago. They pioneered the single-step Trading Combine evaluation model and have funded thousands of traders globally.",
      "Unlike many newer firms, Topstep has consistently paid out for over a decade — a track record almost no other futures prop can match. Their funded accounts run on real broker infrastructure with transparent rules.",
      "Topstep is best known for its disciplined, education-first approach. Their coaching staff, daily market briefings, and trader-development tools set them apart from firms that purely sell access to evaluations.",
    ],
    rules: [
      { rule: "Profit Target", details: "6%" },
      { rule: "Max Daily Loss", details: "3%" },
      { rule: "Max Trailing Drawdown", details: "5%" },
      { rule: "Min Trading Days", details: "5" },
      { rule: "News Trading", details: "Allowed" },
      { rule: "Overnight Holding", details: "Not Allowed" },
    ],
    pricing: [
      { size: "$50K", fee: "$49/mo" },
      { size: "$100K", fee: "$99/mo", popular: true },
      { size: "$150K", fee: "$165/mo" },
    ],
    payout: {
      splitTrader: 90,
      splitFirm: 10,
      timeline: "Withdrawals processed every Monday; payouts hit accounts within 1–2 business days.",
      methods: ["ACH", "Wire Transfer", "Wise (international)"],
    },
    platforms: ["NinjaTrader", "Tradovate", "TradingView", "Quantower"],
    instruments: ["NQ", "ES", "RTY", "YM", "CL", "GC", "Micros", "MES", "MNQ"],
    pros: [
      "Over a decade of consistent payouts and brand trust",
      "90% profit split is at the top of the market",
      "Excellent educational content and coaching staff",
      "Strong customer support with real humans, not just chatbots",
      "Reset and discount offers run almost every month",
    ],
    cons: [
      "Monthly fees are above the cheapest competitors",
      "Trailing drawdown locks profits aggressively",
      "No crypto, forex, or equities — futures only",
    ],
    bestFor: [
      { label: "Best for Beginners", description: "World-class education and a forgiving rule set make this an ideal first prop firm.", icon: "rocket" },
      { label: "Best for Scalpers", description: "Low-latency execution on Tradovate and tight rules suit short-term traders.", icon: "zap" },
      { label: "Best for Disciplined Traders", description: "Reward consistency through scaling plans and trader-development pathways.", icon: "target" },
    ],
    experience: [
      "We ran a $150K Trading Combine for 6 weeks and passed in 19 trading days. The platform was rock solid the entire run, and rule enforcement was clear and predictable.",
      "Our first payout request was approved in under 24 hours and the funds hit our bank account within 36 hours. No questions, no friction — exactly what every funded trader hopes for.",
      "The only real complaint: the trailing drawdown does what it advertises. If you have a big winning day, the threshold tightens fast. Plan your risk accordingly and you'll be fine.",
    ],
    ratings: [
      { label: "Pricing", score: 4.4 },
      { label: "Rules", score: 4.6 },
      { label: "Payout", score: 5.0 },
      { label: "Support", score: 4.9 },
      { label: "Platform", score: 4.7 },
    ],
    finalRecommendation:
      "If you are serious about getting funded for futures and want a firm that will still be here in 5 years, Topstep is the safest bet on the market. We recommend it without hesitation.",
    alternatives: [
      { name: "Apex Trader Funding", rating: 4.8, maxFunding: "$300K", split: "90%" },
      { name: "MyFundedFutures", rating: 4.7, maxFunding: "$150K", split: "90%" },
      { name: "TradeDay", rating: 4.6, maxFunding: "$100K", split: "85%" },
    ],
    couponCode: "SAVE20",
    offerEnds: "2d 14h 22m",
  },
};

export function getFirmDetail(slug: string): FirmDetail {
  return firmDetails[slug] ?? { ...firmDetails.topstep, slug, name: prettify(slug) };
}

function prettify(slug: string) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}