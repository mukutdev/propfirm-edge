export const tickerItems = [
  "Apex Trader Funding • Up to $300K Funding",
  "Lucid Trading • Same-Day Payouts",
  "FundedNext Futures • 90% Profit Split",
  "Take Profit Trader • 1-Step Evaluation",
  "Tradeify • Flexible Drawdown",
  "Legends Trading • Pro Trader Program",
  "MyFundedFutures • $0 Activation",
  "Funded Futures Network • Scalable Accounts",
  "TradeDay • No Daily Drawdown",
];

export type Firm = {
  name: string;
  maxFunding: string;
  split: string;
  fee: string;
  badge: string;
  badgeColor: "purple" | "pink" | "green";
  trustpilotUrl?: string | undefined;
  trustpilotScore?: number | null;
  trustpilotUpdatedAt?: string | null;
};

export type ReviewFirm = Firm & {
  description: string;
  markets: string[];
  categories: ("Futures" | "Stocks")[];
  feeNumeric: number;
  fundingNumeric: number;
  addedOrder: number; // higher = newer
};

export const featuredFirms: Firm[] = [
  { name: "Apex Trader Funding", maxFunding: "$300K", split: "90%", fee: "$137/mo", badge: "Editor's Pick", badgeColor: "purple" },
  { name: "MyFundedFutures", maxFunding: "$150K", split: "90%", fee: "$80/mo", badge: "Fast Payouts", badgeColor: "pink" },
  { name: "TradeDay", maxFunding: "$100K", split: "85%", fee: "$99/mo", badge: "Best for Beginners", badgeColor: "green" },
  { name: "Take Profit Trader", maxFunding: "$150K", split: "90%", fee: "$150/mo", badge: "1-Step Eval", badgeColor: "purple" },
  { name: "FundedNext Futures", maxFunding: "$200K", split: "90%", fee: "$99/mo", badge: "New & Trusted", badgeColor: "pink" },
  { name: "Tradeify", maxFunding: "$100K", split: "90%", fee: "$107/mo", badge: "Flexible Rules", badgeColor: "green" },
  { name: "Funded Futures Network", maxFunding: "$100K", split: "90%", fee: "$97/mo", badge: "Community Pick", badgeColor: "pink" },
  { name: "Lucid Trading", maxFunding: "$150K", split: "90%", fee: "$125/mo", badge: "Fast Funding", badgeColor: "green" },
  { name: "Legends Trading", maxFunding: "$150K", split: "85%", fee: "$130/mo", badge: "Pro Program", badgeColor: "purple" },
];

export type ComparisonRow = {
  firm: string;
  maxAccount: string;
  split: string;
  drawdown: string;
  futures: string;
  highlight?: boolean;
};

export const comparisonRows: ComparisonRow[] = [
  { firm: "Apex Trader Funding", maxAccount: "$300K", split: "90%", drawdown: "Trailing", futures: "Yes", highlight: true },
  { firm: "MyFundedFutures", maxAccount: "$150K", split: "90%", drawdown: "Intraday", futures: "Yes" },
  { firm: "TradeDay", maxAccount: "$100K", split: "85%", drawdown: "End of Day", futures: "Yes" },
  { firm: "Take Profit Trader", maxAccount: "$150K", split: "90%", drawdown: "Static", futures: "Yes" },
  { firm: "FundedNext Futures", maxAccount: "$200K", split: "90%", drawdown: "Trailing", futures: "Yes" },
];

export const newsItems = [
  {
    category: "Prop Firms",
    date: "Jun 2, 2026",
    title: "Topstep Lowers Account Fees Across All Plans",
    excerpt: "The well-known futures prop firm rolls out a 20% reduction on monthly subscriptions.",
  },
  {
    category: "Markets",
    date: "Jun 1, 2026",
    title: "ES Futures Hit New All-Time Highs Ahead Of Fed",
    excerpt: "Volatility expands as traders position for the next policy decision out of Washington.",
  },
  {
    category: "Futures",
    date: "May 30, 2026",
    title: "Micro Contracts Continue To Dominate Retail Volume",
    excerpt: "CME data shows micros now make up over 40% of new retail-driven flow this quarter.",
  },
];

export const reviewFirms: ReviewFirm[] = [
  {
    name: "Apex Trader Funding",
    maxFunding: "$300K", fundingNumeric: 300000,
    split: "90%",
    fee: "$137/mo", feeNumeric: 137,
    badge: "Editor's Pick", badgeColor: "purple",
    description: "Industry-leading futures prop firm with massive scaling and same-week payouts.",
    markets: ["NQ", "ES", "CL", "GC"],
    categories: ["Futures"],
    addedOrder: 11,
  },
  {
    name: "MyFundedFutures",
    maxFunding: "$150K", fundingNumeric: 150000,
    split: "90%",
    fee: "$80/mo", feeNumeric: 80,
    badge: "Best Value", badgeColor: "pink",
    description: "Aggressive pricing, fast payouts and a clean rule set for serious day traders.",
    markets: ["NQ", "ES", "RTY"],
    categories: ["Futures"],
    addedOrder: 10,
  },
  {
    name: "TradeDay",
    maxFunding: "$100K", fundingNumeric: 100000,
    split: "85%",
    fee: "$99/mo", feeNumeric: 99,
    badge: "Most Popular", badgeColor: "green",
    description: "End-of-day drawdown and no daily loss limits — beginner-friendly futures funding.",
    markets: ["NQ", "ES", "CL"],
    categories: ["Futures"],
    addedOrder: 6,
  },
  {
    name: "Take Profit Trader",
    maxFunding: "$150K", fundingNumeric: 150000,
    split: "90%",
    fee: "$150/mo", feeNumeric: 150,
    badge: "", badgeColor: "purple",
    description: "Straightforward 1-step evaluation with bi-weekly payouts and PA scaling.",
    markets: ["NQ", "ES", "YM"],
    categories: ["Futures"],
    addedOrder: 5,
  },
  {
    name: "FundedNext Futures",
    maxFunding: "$200K", fundingNumeric: 200000,
    split: "90%",
    fee: "$99/mo", feeNumeric: 99,
    badge: "New & Trusted", badgeColor: "pink",
    description: "Flexible futures rules and global support.",
    markets: ["NQ", "ES", "EURUSD"],
    categories: ["Futures"],
    addedOrder: 12,
  },
  {
    name: "Tradeify",
    maxFunding: "$100K", fundingNumeric: 100000,
    split: "90%",
    fee: "$107/mo", feeNumeric: 107,
    badge: "", badgeColor: "green",
    description: "Trailing drawdown that locks in profit — great mid-tier futures option.",
    markets: ["NQ", "ES", "CL"],
    categories: ["Futures"],
    addedOrder: 8,
  },
  {
    name: "Funded Futures Network",
    maxFunding: "$100K", fundingNumeric: 100000,
    split: "90%",
    fee: "$97/mo", feeNumeric: 97,
    badge: "", badgeColor: "pink",
    description: "Community-driven futures prop with transparent rules and active trader Discord.",
    markets: ["NQ", "ES"],
    categories: ["Futures"],
    addedOrder: 7,
  },
  {
    name: "Lucid Trading",
    maxFunding: "$150K", fundingNumeric: 150000,
    split: "90%",
    fee: "$125/mo", feeNumeric: 125,
    badge: "", badgeColor: "green",
    description: "Same-day payouts and flexible scaling — newer firm with rapid trader growth.",
    markets: ["NQ", "ES", "GC"],
    categories: ["Futures"],
    addedOrder: 4,
  },
  {
    name: "Legends Trading",
    maxFunding: "$150K", fundingNumeric: 150000,
    split: "85%",
    fee: "$130/mo", feeNumeric: 130,
    badge: "", badgeColor: "purple",
    description: "Pro trader program for seasoned futures traders ready to scale aggressively.",
    markets: ["NQ", "ES", "CL"],
    categories: ["Futures"],
    addedOrder: 3,
  },
];