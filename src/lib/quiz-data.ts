export type Option = { icon: string; label: string; sub?: string; value: string };
export type Question = { id: string; text: string; options: Option[] };

export const questions: Question[] = [
  {
    id: "market",
    text: "What do you primarily trade?",
    options: [
      { icon: "📈", label: "Futures", value: "futures" },
      { icon: "💱", label: "Forex", value: "forex" },
      { icon: "🪙", label: "Crypto", value: "crypto" },
      { icon: "📊", label: "Stocks & Indices", value: "stocks" },
    ],
  },
  {
    id: "experience",
    text: "What is your experience level?",
    options: [
      { icon: "🌱", label: "Complete Beginner", sub: "under 1 year", value: "beginner" },
      { icon: "📚", label: "Learning", sub: "1–3 years", value: "learning" },
      { icon: "💼", label: "Experienced", sub: "3–5 years", value: "experienced" },
      { icon: "🏆", label: "Professional", sub: "5+ years", value: "pro" },
    ],
  },
  {
    id: "capital",
    text: "How much starting capital do you want?",
    options: [
      { icon: "💵", label: "Up to $25,000", value: "small" },
      { icon: "💵", label: "$25,000 – $100,000", value: "mid" },
      { icon: "💵", label: "$100,000 – $200,000", value: "large" },
      { icon: "💵", label: "$200,000+", value: "xl" },
    ],
  },
  {
    id: "style",
    text: "What trading style do you use?",
    options: [
      { icon: "⚡", label: "Scalping", sub: "seconds to minutes", value: "scalping" },
      { icon: "📊", label: "Day Trading", sub: "intraday", value: "day" },
      { icon: "🌙", label: "Swing Trading", sub: "days to weeks", value: "swing" },
      { icon: "🤖", label: "Algorithmic / EA", sub: "automated", value: "algo" },
    ],
  },
  {
    id: "priority",
    text: "What is most important to you?",
    options: [
      { icon: "💰", label: "Highest profit split", value: "split" },
      { icon: "📉", label: "Lowest challenge fee", value: "fee" },
      { icon: "🔓", label: "Relaxed drawdown rules", value: "rules" },
      { icon: "⚡", label: "Fast payouts", value: "payout" },
    ],
  },
  {
    id: "fees",
    text: "How do you feel about challenge fees?",
    options: [
      { icon: "🆓", label: "Free trial option", value: "free" },
      { icon: "💲", label: "I'll pay if rules are fair", value: "pay" },
      { icon: "💳", label: "Fee doesn't matter", value: "any" },
      { icon: "🔄", label: "Want reset/refund", value: "reset" },
    ],
  },
  {
    id: "timing",
    text: "When do you want to start trading?",
    options: [
      { icon: "🚀", label: "As soon as possible", value: "now" },
      { icon: "📅", label: "Within the next month", value: "soon" },
      { icon: "🤔", label: "Still researching", value: "research" },
      { icon: "🎓", label: "After more practice", value: "later" },
    ],
  },
];

export type QuizFirm = {
  name: string;
  slug: string;
  rating: number;
  funding: string;
  split: string;
  fee: string;
  code?: string;
  reasons: string[];
};

export const recommendation: QuizFirm[] = [
  {
    name: "Apex Trader Funding",
    slug: "apex",
    rating: 4.8,
    funding: "$300K",
    split: "90%",
    fee: "$137/mo",
    code: "QUIZ20",
    reasons: ["Allows scalping & algo", "90% profit split", "Multiple funding tiers"],
  },
  {
    name: "MyFundedFutures",
    slug: "myfundedfutures",
    rating: 4.7,
    funding: "$150K",
    split: "90%",
    fee: "$80/mo",
    code: "MFF15",
    reasons: ["Fast same-week payouts", "No activation fee", "Generous daily limits"],
  },
  {
    name: "TradeDay",
    slug: "tradeday",
    rating: 4.6,
    funding: "$100K",
    split: "85%",
    fee: "$99/mo",
    code: "DAY10",
    reasons: ["No daily drawdown", "Beginner-friendly rules", "1-step evaluation"],
  },
];

export const testimonials = [
  { name: "Jordan M.", quote: "The quiz pointed me to Apex and I passed in 9 days — the discount code paid for itself." },
  { name: "Priya R.", quote: "Saved me hours of comparing rules. The match was spot-on for a scalper." },
  { name: "Devon K.", quote: "Finally a tool that actually understands what swing traders need." },
];