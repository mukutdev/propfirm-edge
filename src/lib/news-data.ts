export type NewsCategory = "Futures" | "Forex" | "Prop Firms" | "Crypto" | "Stocks" | "Economic Events";

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  date: string;
  timeAgo: string;
  readCount?: string;
  badge?: { label: string; color: "orange" | "green" };
};

export const breakingHeadlines: string[] = [
  "Apex Trader Funding raises max funding to $300K across all plans",
  "FundedNext Futures launches 1-step evaluation for Forex traders",
  "Fed signals potential rate cut as inflation cools to 2.4%",
  "MyFundedFutures eliminates activation fees on all PA accounts",
  "NQ futures hit record high as tech rally accelerates",
  "Tradeify rolls out new flexible drawdown model — community reacts",
  "Bluenox expands payout schedule to twice-weekly for funded traders",
  "TradeDay removes daily drawdown rule on Pro accounts",
];

export const featuredArticle: NewsArticle = {
  id: "featured-1",
  title: "Apex Trader Funding Overhauls Payout Structure — Here's What Changed",
  excerpt:
    "The industry leader just announced sweeping updates to its profit split model, payout cadence and account scaling rules. We break down what every funded trader needs to know.",
  category: "Prop Firms",
  author: "Marcus Chen",
  date: "June 4, 2026",
  timeAgo: "2h ago",
};

export const topStories: NewsArticle[] = [
  {
    id: "top-1",
    title: "NQ Futures Break All-Time High as Tech Earnings Beat Estimates",
    excerpt:
      "Nasdaq futures surged past 22,500 in overnight trading as megacap tech firms posted stronger-than-expected quarterly results.",
    category: "Futures",
    author: "Sarah Ng",
    date: "June 4, 2026",
    timeAgo: "3h ago",
  },
  {
    id: "top-2",
    title: "ECB Holds Rates Steady — Euro Slides Against Dollar",
    excerpt:
      "The European Central Bank kept its main refinancing rate at 3.25%, citing persistent core inflation in services.",
    category: "Forex",
    author: "James O'Brien",
    date: "June 4, 2026",
    timeAgo: "5h ago",
  },
  {
    id: "top-3",
    title: "Bitcoin Tests $95K Resistance Amid ETF Inflow Surge",
    excerpt:
      "Spot Bitcoin ETFs recorded their largest single-day net inflow since launch, pushing BTC back into yearly highs.",
    category: "Crypto",
    author: "Priya Shah",
    date: "June 3, 2026",
    timeAgo: "12h ago",
  },
  {
    id: "top-4",
    title: "Gold Hits Fresh Record as Treasury Yields Cool",
    excerpt:
      "Spot gold climbed above $2,680/oz as falling real yields and a softer dollar boosted demand for the metal.",
    category: "Futures",
    author: "David Kim",
    date: "June 3, 2026",
    timeAgo: "16h ago",
  },
];

export const latestUpdates: NewsArticle[] = [
  { id: "l1", title: "Crude oil drops 1.2% as OPEC+ signals output hike", excerpt: "", category: "Futures", author: "", date: "", timeAgo: "32m ago" },
  { id: "l2", title: "GBP/USD breaks 1.30 ahead of BoE decision", excerpt: "", category: "Forex", author: "", date: "", timeAgo: "1h ago" },
  { id: "l3", title: "Take Profit Trader updates consistency rule", excerpt: "", category: "Prop Firms", author: "", date: "", timeAgo: "2h ago" },
  { id: "l4", title: "S&P 500 closes at fresh record — 7th straight green day", excerpt: "", category: "Stocks", author: "", date: "", timeAgo: "3h ago" },
  { id: "l5", title: "Ethereum staking yields tick higher post-upgrade", excerpt: "", category: "Crypto", author: "", date: "", timeAgo: "4h ago" },
  { id: "l6", title: "US Non-Farm Payrolls preview: what to expect Friday", excerpt: "", category: "Economic Events", author: "", date: "", timeAgo: "5h ago" },
  { id: "l7", title: "Legends Trading announces Pro Trader scaling plan", excerpt: "", category: "Prop Firms", author: "", date: "", timeAgo: "7h ago" },
  { id: "l8", title: "Yen weakens past 158 vs USD — intervention risk rises", excerpt: "", category: "Forex", author: "", date: "", timeAgo: "9h ago" },
];

export const propFirmNews: NewsArticle[] = [
  {
    id: "pf-1",
    title: "MyFundedFutures Removes Activation Fees Across All PA Accounts",
    excerpt: "Effective immediately, funded traders skip the $130 activation step and keep more of their first payout.",
    category: "Prop Firms",
    author: "Marcus Chen",
    date: "June 4, 2026",
    timeAgo: "4h ago",
    badge: { label: "🆕 New Firm", color: "green" },
  },
  {
    id: "pf-2",
    title: "Tradeify Tightens Daily Loss Limits — Trader Backlash Grows",
    excerpt: "A surprise rule change quietly went live this week, cutting daily drawdown limits on Standard accounts.",
    category: "Prop Firms",
    author: "Sarah Ng",
    date: "June 3, 2026",
    timeAgo: "1d ago",
    badge: { label: "⚠️ Rule Change", color: "orange" },
  },
  {
    id: "pf-3",
    title: "Bluenox Launches Weekly Payout Schedule For Funded Traders",
    excerpt: "Bluenox is now paying out twice weekly, joining a small group of firms offering same-week withdrawals.",
    category: "Prop Firms",
    author: "David Kim",
    date: "June 2, 2026",
    timeAgo: "2d ago",
    badge: { label: "🆕 New Firm", color: "green" },
  },
];

export type EconEvent = {
  date: string;
  time: string;
  event: string;
  market: string;
  impact: "High" | "Medium" | "Low";
  forecast: string;
  previous: string;
  today?: boolean;
};

export const econEvents: EconEvent[] = [
  { date: "Jun 4", time: "08:30 ET", event: "ADP Employment Change", market: "USD", impact: "High", forecast: "175K", previous: "192K", today: true },
  { date: "Jun 4", time: "10:00 ET", event: "ISM Services PMI", market: "USD", impact: "High", forecast: "53.5", previous: "53.8", today: true },
  { date: "Jun 5", time: "07:45 ET", event: "ECB Interest Rate Decision", market: "EUR", impact: "High", forecast: "3.25%", previous: "3.25%" },
  { date: "Jun 6", time: "08:30 ET", event: "US Non-Farm Payrolls", market: "USD", impact: "High", forecast: "180K", previous: "175K" },
  { date: "Jun 6", time: "08:30 ET", event: "Unemployment Rate", market: "USD", impact: "Medium", forecast: "3.9%", previous: "3.9%" },
];

export const trendingNews: { title: string; category: NewsCategory; reads: string }[] = [
  { title: "How Apex's new payout model affects funded traders", category: "Prop Firms", reads: "12.4K reads" },
  { title: "Top 5 prop firms with same-day payouts in 2026", category: "Prop Firms", reads: "9.1K reads" },
  { title: "Fed minutes preview: what traders need to know", category: "Economic Events", reads: "7.8K reads" },
  { title: "NQ vs ES: which futures contract is right for you?", category: "Futures", reads: "6.2K reads" },
  { title: "Best prop firms for swing traders in 2026", category: "Prop Firms", reads: "5.5K reads" },
];

export const marketSnapshot: { ticker: string; price: string; change: string; up: boolean }[] = [
  { ticker: "NQ", price: "22,512.25", change: "+0.45%", up: true },
  { ticker: "ES", price: "5,872.50", change: "-0.12%", up: false },
  { ticker: "GC", price: "2,684.10", change: "+0.78%", up: true },
  { ticker: "CL", price: "72.34", change: "-1.20%", up: false },
];

export const newsCategories: ("All" | NewsCategory)[] = [
  "All",
  "Futures",
  "Forex",
  "Prop Firms",
  "Crypto",
  "Stocks",
  "Economic Events",
];