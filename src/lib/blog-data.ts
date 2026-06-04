export type BlogCategory =
  | "Prop Firm Guides"
  | "Futures Trading"
  | "Risk Management"
  | "Trading Psychology"
  | "Interviews";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  readTime: string;
};

export const blogCategories: ("All" | BlogCategory)[] = [
  "All",
  "Prop Firm Guides",
  "Futures Trading",
  "Risk Management",
  "Trading Psychology",
  "Interviews",
];

export const featuredPost: BlogPost = {
  id: "featured-1",
  title: "The Complete Guide to Passing a Prop Firm Challenge in 2025",
  excerpt:
    "Step-by-step framework used by funded traders to clear the evaluation on the first try — risk rules, position sizing, daily routine and the mindset shifts that actually move the needle.",
  category: "Prop Firm Guides",
  author: "Hanuman",
  date: "June 1, 2026",
  readTime: "12 min read",
};

export const categorySections: {
  category: BlogCategory;
  icon: string;
  posts: BlogPost[];
}[] = [
  {
    category: "Prop Firm Guides",
    icon: "🏛️",
    posts: [
      { id: "pf1", title: "How Prop Firms Work: A Complete Beginner's Guide", excerpt: "Everything you need to know about how prop firms make money, how payouts work and why they exist.", category: "Prop Firm Guides", author: "Hanuman", date: "May 28, 2026", readTime: "9 min read" },
      { id: "pf2", title: "Trailing vs Static Drawdown Explained", excerpt: "The single most misunderstood prop firm rule — broken down with real examples and visual diagrams.", category: "Prop Firm Guides", author: "Sarah Ng", date: "May 25, 2026", readTime: "7 min read" },
      { id: "pf3", title: "Best Prop Firms for Beginners in 2025", excerpt: "Honest ranking of beginner-friendly firms based on rules, support and challenge difficulty.", category: "Prop Firm Guides", author: "Marcus Chen", date: "May 20, 2026", readTime: "11 min read" },
    ],
  },
  {
    category: "Futures Trading",
    icon: "📈",
    posts: [
      { id: "ft1", title: "What Are Futures Contracts? A Simple Explanation", excerpt: "No jargon. A clear breakdown of futures, leverage and why prop firms love them.", category: "Futures Trading", author: "David Kim", date: "May 30, 2026", readTime: "6 min read" },
      { id: "ft2", title: "Best Futures Instruments for Prop Trading", excerpt: "NQ, ES, MNQ or MES? Which contract fits your account size and trading style.", category: "Futures Trading", author: "Hanuman", date: "May 27, 2026", readTime: "8 min read" },
      { id: "ft3", title: "How to Read a Futures Chart Like a Pro", excerpt: "From basic candles to volume profile — read price action with the eye of an institutional trader.", category: "Futures Trading", author: "Sarah Ng", date: "May 22, 2026", readTime: "10 min read" },
    ],
  },
  {
    category: "Risk Management",
    icon: "🛡️",
    posts: [
      { id: "rm1", title: "How to Manage Risk on a Prop Firm Account", excerpt: "Your edge means nothing without a risk plan. Here's the framework funded traders actually use.", category: "Risk Management", author: "Marcus Chen", date: "May 31, 2026", readTime: "9 min read" },
      { id: "rm2", title: "Position Sizing for Funded Traders", excerpt: "How to size every trade so you never blow your max drawdown — with calculator examples.", category: "Risk Management", author: "Priya Shah", date: "May 26, 2026", readTime: "7 min read" },
      { id: "rm3", title: "The #1 Reason Traders Fail Their Challenge", excerpt: "It's not lack of skill. It's the silent rule break that destroys 80% of evaluations.", category: "Risk Management", author: "Hanuman", date: "May 19, 2026", readTime: "6 min read" },
    ],
  },
  {
    category: "Trading Psychology",
    icon: "🧠",
    posts: [
      { id: "tp1", title: "How to Handle Losing Streaks as a Funded Trader", excerpt: "The mental playbook for staying composed after 3, 5 or 10 consecutive losses.", category: "Trading Psychology", author: "James O'Brien", date: "May 29, 2026", readTime: "8 min read" },
      { id: "tp2", title: "Why Discipline Matters More Than Strategy", excerpt: "Why two traders with the same setups get wildly different results — and how to be the one who wins.", category: "Trading Psychology", author: "Sarah Ng", date: "May 24, 2026", readTime: "7 min read" },
      { id: "tp3", title: "Building a Trading Routine That Actually Works", excerpt: "The pre-market, in-session and post-market habits that separate funded traders from gamblers.", category: "Trading Psychology", author: "Hanuman", date: "May 18, 2026", readTime: "9 min read" },
    ],
  },
];

export const popularPosts: BlogPost[] = [
  { id: "p1", title: "Apex Trader Funding Full Review (2025 Update)", excerpt: "Our deep-dive review with rules, payouts and discount codes.", category: "Prop Firm Guides", author: "Hanuman", date: "May 30, 2026", readTime: "14 min read" },
  { id: "p2", title: "5 Trading Habits That Doubled My Payouts", excerpt: "", category: "Trading Psychology", author: "Sarah Ng", date: "May 28, 2026", readTime: "6 min read" },
  { id: "p3", title: "How I Passed 3 Prop Firm Evaluations in One Month", excerpt: "", category: "Interviews", author: "Marcus Chen", date: "May 26, 2026", readTime: "8 min read" },
  { id: "p4", title: "Why You Should Trade Micro Futures First", excerpt: "", category: "Futures Trading", author: "David Kim", date: "May 24, 2026", readTime: "7 min read" },
  { id: "p5", title: "The Risk Rule That Saved My Funded Account", excerpt: "", category: "Risk Management", author: "Priya Shah", date: "May 22, 2026", readTime: "5 min read" },
];

export const latestPosts: BlogPost[] = [
  { id: "lt1", title: "Tradeify vs Apex: A Side-by-Side Breakdown", excerpt: "Two of the most popular firms compared on every rule that matters.", category: "Prop Firm Guides", author: "Hanuman", date: "June 3, 2026", readTime: "9 min read" },
  { id: "lt2", title: "How to Build a Pre-Market Checklist", excerpt: "The 7 boxes every funded trader should check before the bell.", category: "Trading Psychology", author: "Sarah Ng", date: "June 2, 2026", readTime: "5 min read" },
  { id: "lt3", title: "Understanding the Order Book for Futures Traders", excerpt: "Read tape and order flow with confidence — without the noise.", category: "Futures Trading", author: "David Kim", date: "June 1, 2026", readTime: "10 min read" },
  { id: "lt4", title: "What 'Consistency Rule' Really Means", excerpt: "The rule that catches more traders off-guard than any other.", category: "Risk Management", author: "Marcus Chen", date: "May 31, 2026", readTime: "6 min read" },
  { id: "lt5", title: "Interview: From $0 to $250K Funded in 8 Months", excerpt: "How one trader cleared four evaluations and scaled up safely.", category: "Interviews", author: "Hanuman", date: "May 30, 2026", readTime: "12 min read" },
  { id: "lt6", title: "Stop Letting Profitable Days Turn Red", excerpt: "A simple session-end framework to lock in green days.", category: "Trading Psychology", author: "Priya Shah", date: "May 29, 2026", readTime: "7 min read" },
];

export const popularCategoriesCount: { name: BlogCategory; count: number }[] = [
  { name: "Prop Firm Guides", count: 42 },
  { name: "Futures Trading", count: 28 },
  { name: "Risk Management", count: 19 },
  { name: "Trading Psychology", count: 24 },
  { name: "Interviews", count: 11 },
];