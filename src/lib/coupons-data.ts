export type DealType = "Percentage Off" | "Free Trial" | "Special Offer";
export type Category = "Futures" | "Stocks";

export type Coupon = {
  firm: string;
  type: DealType;
  discountLabel: string; // e.g. "20% OFF", "FREE TRIAL"
  headline: string;
  description: string;
  code: string;
  expires: string; // human readable
  expiresAt: string; // ISO
  categories: Category[];
  isNew?: boolean;
  featured?: boolean;
  expired?: boolean;
};

export const coupons: Coupon[] = [
  {
    firm: "Topstep",
    type: "Percentage Off",
    discountLabel: "20% OFF",
    headline: "Save 20% on Any Topstep Challenge",
    description: "Our biggest negotiated discount on the industry's most trusted futures prop firm.",
    code: "TOPSTEP20",
    expires: "Feb 28, 2025",
    expiresAt: "2025-02-28",
    categories: ["Futures"],
    featured: true,
  },
  {
    firm: "Apex Trader Funding",
    type: "Percentage Off",
    discountLabel: "80% OFF",
    headline: "80% Off All Account Sizes",
    description: "Limited-time sitewide discount on every evaluation tier.",
    code: "TWPF80",
    expires: "Mar 15, 2025",
    expiresAt: "2025-03-15",
    categories: ["Futures"],
  },
  {
    firm: "MyFundedFutures",
    type: "Percentage Off",
    discountLabel: "30% OFF",
    headline: "30% Off Starter Accounts",
    description: "Stack with monthly promos for an even bigger discount.",
    code: "MFF30",
    expires: "Feb 14, 2025",
    expiresAt: "2025-02-14",
    categories: ["Futures"],
  },
  {
    firm: "TradeDay",
    type: "Free Trial",
    discountLabel: "FREE TRIAL",
    headline: "Free 7-Day Evaluation Trial",
    description: "Test their platform and rules before committing to a paid challenge.",
    code: "TRYTRADEDAY",
    expires: "Mar 1, 2025",
    expiresAt: "2025-03-01",
    categories: ["Futures"],
  },
  {
    firm: "Take Profit Trader",
    type: "Percentage Off",
    discountLabel: "25% OFF",
    headline: "25% Off 1-Step Evaluation",
    description: "Knock a quarter off the price of any 1-step challenge tier.",
    code: "TPT25",
    expires: "Feb 28, 2025",
    expiresAt: "2025-02-28",
    categories: ["Futures"],
  },
  {
    firm: "FundedNext Futures",
    type: "Percentage Off",
    discountLabel: "15% OFF",
    headline: "15% Off Any Account Size",
    description: "Exclusive code from our team — works at checkout sitewide.",
    code: "FNF15",
    expires: "Apr 1, 2025",
    expiresAt: "2025-04-01",
    categories: ["Futures"],
    isNew: true,
  },
  {
    firm: "Tradeify",
    type: "Special Offer",
    discountLabel: "BOGO",
    headline: "Buy One Challenge, Get One Free",
    description: "Stack accounts for free with this limited weekend promo.",
    code: "TRADEIFYBOGO",
    expires: "Feb 18, 2025",
    expiresAt: "2025-02-18",
    categories: ["Futures"],
  },
  {
    firm: "Bluenox",
    type: "Percentage Off",
    discountLabel: "20% OFF",
    headline: "20% Off 2-Step Evaluation",
    description: "Europe's fast-growing prop, now at a 20% discount through our link.",
    code: "BLUENOX20",
    expires: "Mar 31, 2025",
    expiresAt: "2025-03-31",
    categories: ["Futures"],
    isNew: true,
  },
  {
    firm: "Funded Futures Network",
    type: "Percentage Off",
    discountLabel: "40% OFF",
    headline: "40% Off First Month",
    description: "Massive first-month discount across every account size.",
    code: "FFN40",
    expires: "Feb 28, 2025",
    expiresAt: "2025-02-28",
    categories: ["Futures"],
  },
  {
    firm: "Lucid Trading",
    type: "Free Trial",
    discountLabel: "FREE RESET",
    headline: "Free Reset On First Failed Challenge",
    description: "Pay once, retry for free — exclusive to our readers.",
    code: "LUCIDRESET",
    expires: "Mar 15, 2025",
    expiresAt: "2025-03-15",
    categories: ["Futures"],
  },
  {
    firm: "Legends Trading",
    type: "Percentage Off",
    discountLabel: "15% OFF",
    headline: "15% Off Pro Trader Program",
    description: "Stack-friendly code for the Legends Pro tier.",
    code: "LEGENDS15",
    expires: "Apr 30, 2025",
    expiresAt: "2025-04-30",
    categories: ["Futures"],
  },
  {
    firm: "DayTraders.com",
    type: "Percentage Off",
    discountLabel: "10% OFF",
    headline: "10% Off Multi-Asset Accounts",
    description: "One of the few firms covering futures and stocks under one roof.",
    code: "DAYTRADERS10",
    expires: "May 1, 2025",
    expiresAt: "2025-05-01",
    categories: ["Futures", "Stocks"],
  },
  // Expired
  { firm: "Topstep", type: "Percentage Off", discountLabel: "15% OFF", headline: "15% Off Holiday Promo", description: "Past holiday sale — may still apply at checkout.", code: "HOLIDAY15", expires: "Dec 31, 2024", expiresAt: "2024-12-31", categories: ["Futures"], expired: true },
  { firm: "Apex Trader Funding", type: "Percentage Off", discountLabel: "50% OFF", headline: "Black Friday Mega Deal", description: "Last year's BF promo — sometimes still active.", code: "BF50APEX", expires: "Nov 30, 2024", expiresAt: "2024-11-30", categories: ["Futures"], expired: true },
  { firm: "Tradeify", type: "Special Offer", discountLabel: "DOUBLE PROFIT", headline: "Double First Payout", description: "Last quarter's payout-doubling event.", code: "TRADEIFYDOUBLE", expires: "Dec 15, 2024", expiresAt: "2024-12-15", categories: ["Futures"], expired: true },
];