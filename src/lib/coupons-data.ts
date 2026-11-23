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
  { firm: "Apex Trader Funding", type: "Percentage Off", discountLabel: "90% OFF", headline: "90% Off with code SAVENOW", description: "Enter SAVENOW at checkout on Apex Trader Funding's site.", code: "SAVENOW", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "Funded Futures Network", type: "Percentage Off", discountLabel: "70% OFF", headline: "70% Off with code Nexus", description: "Enter Nexus at checkout on Funded Futures Network's site.", code: "Nexus", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "TradeDay", type: "Percentage Off", discountLabel: "60% OFF", headline: "60% Off with code SALE60", description: "Enter SALE60 at checkout on TradeDay's site.", code: "SALE60", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "FundedNext Futures", type: "Percentage Off", discountLabel: "47% OFF", headline: "47% Off with code FNDIRECT (Direct accounts)", description: "Enter FNDIRECT at checkout on FundedNext Futures's site. Applies to Direct accounts.", code: "FNDIRECT", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "FundedNext Futures", type: "Percentage Off", discountLabel: "47% OFF", headline: "47% Off with code FNFLEX (Flex accounts)", description: "Enter FNFLEX at checkout on FundedNext Futures's site. Applies to Flex accounts.", code: "FNFLEX", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "FundedNext Futures", type: "Percentage Off", discountLabel: "47% OFF", headline: "47% Off with code RAPID (Rapid accounts)", description: "Enter RAPID at checkout on FundedNext Futures's site. Applies to Rapid accounts.", code: "RAPID", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "MyFundedFutures", type: "Percentage Off", discountLabel: "40% OFF", headline: "40% Off with code CLUB", description: "Enter CLUB at checkout on MyFundedFutures's site.", code: "CLUB", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "Take Profit Trader", type: "Percentage Off", discountLabel: "40% OFF", headline: "40% Off with code NOFEE40", description: "Enter NOFEE40 at checkout on Take Profit Trader's site.", code: "NOFEE40", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "Tradeify", type: "Percentage Off", discountLabel: "30% OFF", headline: "30% Off with code NOV", description: "Enter NOV at checkout on Tradeify's site.", code: "NOV", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "Legends Trading", type: "Percentage Off", discountLabel: "30% OFF", headline: "30% Off with code LTG", description: "Enter LTG at checkout on Legends Trading's site.", code: "LTG", expires: "", expiresAt: "", categories: ["Futures"] },
  { firm: "Lucid Trading", type: "Special Offer", discountLabel: "BEST DEALS", headline: "Best Deals with code VAULT", description: "Enter VAULT at checkout on Lucid Trading's site.", code: "VAULT", expires: "", expiresAt: "", categories: ["Futures"] },
];
