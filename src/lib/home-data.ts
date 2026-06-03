export const tickerItems = [
  "Topstep • Up to $150K Funding",
  "Apex Trader • 90% Profit Split",
  "TradeDay • No Daily Drawdown",
  "Earn2Trade • Flexible Rules",
  "MyFundedFutures • $0 Activation",
  "Bulenox • 2-Step Evaluation",
  "FundedNext • Up to $200K",
  "Take Profit Trader • 1-Step Eval",
  "Leeloo • Trailing Drawdown",
  "Uprofit • Same Day Payouts",
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

export const featuredFirms: Firm[] = [
  {
    name: "Topstep",
    rating: 4.8,
    maxFunding: "$150K",
    split: "90%",
    fee: "$49/mo",
    badge: "Editor's Pick",
    badgeColor: "purple",
  },
  {
    name: "Apex Trader",
    rating: 4.6,
    maxFunding: "$300K",
    split: "90%",
    fee: "$137/mo",
    badge: "Best Value",
    badgeColor: "pink",
  },
  {
    name: "TradeDay",
    rating: 4.5,
    maxFunding: "$100K",
    split: "85%",
    fee: "$99/mo",
    badge: "Best for Beginners",
    badgeColor: "green",
  },
  {
    name: "MyFundedFutures",
    rating: 4.4,
    maxFunding: "$150K",
    split: "90%",
    fee: "$80/mo",
    badge: "Fast Payouts",
    badgeColor: "purple",
  },
  {
    name: "Bulenox",
    rating: 4.3,
    maxFunding: "$250K",
    split: "90%",
    fee: "$115/mo",
    badge: "Flexible Rules",
    badgeColor: "pink",
  },
  {
    name: "Take Profit Trader",
    rating: 4.2,
    maxFunding: "$150K",
    split: "80%",
    fee: "$150/mo",
    badge: "1-Step Eval",
    badgeColor: "green",
  },
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
  { firm: "Topstep", maxAccount: "$150K", split: "90%", drawdown: "Trailing", futures: "Yes", rating: "4.8 / 5", highlight: true },
  { firm: "Apex Trader", maxAccount: "$300K", split: "90%", drawdown: "Trailing", futures: "Yes", rating: "4.6 / 5" },
  { firm: "TradeDay", maxAccount: "$100K", split: "85%", drawdown: "End of Day", futures: "Yes", rating: "4.5 / 5" },
  { firm: "MyFundedFutures", maxAccount: "$150K", split: "90%", drawdown: "Intraday", futures: "Yes", rating: "4.4 / 5" },
  { firm: "Bulenox", maxAccount: "$250K", split: "90%", drawdown: "Trailing", futures: "Yes", rating: "4.3 / 5" },
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