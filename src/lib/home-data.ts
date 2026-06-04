export const tickerItems = [
  "Apex Trader Funding • Up to $300K Funding",
  "Lucid Trading • Same-Day Payouts",
  "FundedNext Futures • 90% Profit Split",
  "Take Profit Trader • 1-Step Evaluation",
  "Tradeify • Flexible Drawdown",
  "Legends Trading • Pro Trader Program",
  "MyFundedFutures • $0 Activation",
  "Funded Futures Network • Scalable Accounts",
  "DayTraders.com • Trusted Veteran Firm",
  "Bluenox • 2-Step Evaluation",
  "TradeDay • No Daily Drawdown",
];

export type Firm = {
  name: string;
  rating: number;
  maxFunding: string;
  split: string;
  fee: string;
  badge: string;
  badgeColor: "purple" | "pink" | "green";
};

export type ReviewFirm = Firm & {
  description: string;
  markets: string[];
  categories: ("Futures" | "Forex" | "Crypto" | "Stocks")[];
  feeNumeric: number;
  fundingNumeric: number;
  addedOrder: number; // higher = newer
};

export const featuredFirms: Firm[] = [
  { name: "Apex Trader Funding", rating: 4.8, maxFunding: "$300K", split: "90%", fee: "$137/mo", badge: "Editor's Pick", badgeColor: "purple" },
  { name: "MyFundedFutures", rating: 4.7, maxFunding: "$150K", split: "90%", fee: "$80/mo", badge: "Fast Payouts", badgeColor: "pink" },
  { name: "TradeDay", rating: 4.6, maxFunding: "$100K", split: "85%", fee: "$99/mo", badge: "Best for Beginners", badgeColor: "green" },
  { name: "Take Profit Trader", rating: 4.5, maxFunding: "$150K", split: "90%", fee: "$150/mo", badge: "1-Step Eval", badgeColor: "purple" },
  { name: "FundedNext Futures", rating: 4.5, maxFunding: "$200K", split: "90%", fee: "$99/mo", badge: "New & Trusted", badgeColor: "pink" },
  { name: "Tradeify", rating: 4.4, maxFunding: "$100K", split: "90%", fee: "$107/mo", badge: "Flexible Rules", badgeColor: "green" },
  { name: "Bluenox", rating: 4.3, maxFunding: "$250K", split: "90%", fee: "$115/mo", badge: "Best Value", badgeColor: "purple" },
  { name: "Funded Futures Network", rating: 4.3, maxFunding: "$100K", split: "90%", fee: "$97/mo", badge: "Community Pick", badgeColor: "pink" },
  { name: "Lucid Trading", rating: 4.2, maxFunding: "$150K", split: "90%", fee: "$125/mo", badge: "Fast Funding", badgeColor: "green" },
  { name: "Legends Trading", rating: 4.1, maxFunding: "$150K", split: "85%", fee: "$130/mo", badge: "Pro Program", badgeColor: "purple" },
  { name: "DayTraders.com", rating: 4.0, maxFunding: "$100K", split: "80%", fee: "$99/mo", badge: "Veteran Firm", badgeColor: "pink" },
];

export type ComparisonRow = {
  firm: string;
  maxAccount: string;
  split: string;
  drawdown: string;
  futures: string;
  rating: string;
  highlight?: boolean;
};

export const comparisonRows: ComparisonRow[] = [
  { firm: "Apex Trader Funding", maxAccount: "$300K", split: "90%", drawdown: "Trailing", futures: "Yes", rating: "4.8 / 5", highlight: true },
  { firm: "MyFundedFutures", maxAccount: "$150K", split: "90%", drawdown: "Intraday", futures: "Yes", rating: "4.7 / 5" },
  { firm: "TradeDay", maxAccount: "$100K", split: "85%", drawdown: "End of Day", futures: "Yes", rating: "4.6 / 5" },
  { firm: "Take Profit Trader", maxAccount: "$150K", split: "90%", drawdown: "Static", futures: "Yes", rating: "4.5 / 5" },
  { firm: "FundedNext Futures", maxAccount: "$200K", split: "90%", drawdown: "Trailing", futures: "Yes", rating: "4.5 / 5" },
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