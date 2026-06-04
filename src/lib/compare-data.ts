import { reviewFirms, type ReviewFirm } from "./home-data";

export type DrawdownType = "Trailing" | "Static" | "EOD";

export type CompareFirm = ReviewFirm & {
  drawdownType: DrawdownType;
  dailyLoss: string;
  trailingStop: string;
  minDays: string;
  payoutSpeed: string;
  payoutSpeedDays: number;
  topPick?: boolean;
};

const extras: Record<string, Omit<CompareFirm, keyof ReviewFirm>> = {
  "Apex Trader Funding": { drawdownType: "Trailing", dailyLoss: "None", trailingStop: "$2,500", minDays: "1 day", payoutSpeed: "1–2 days", payoutSpeedDays: 2, topPick: true },
  "MyFundedFutures": { drawdownType: "Trailing", dailyLoss: "None", trailingStop: "$2,000", minDays: "0 days", payoutSpeed: "Same day", payoutSpeedDays: 1 },
  "TradeDay": { drawdownType: "EOD", dailyLoss: "None", trailingStop: "$2,000", minDays: "5 days", payoutSpeed: "1–3 days", payoutSpeedDays: 3 },
  "Take Profit Trader": { drawdownType: "Static", dailyLoss: "None", trailingStop: "$2,500", minDays: "5 days", payoutSpeed: "Weekly", payoutSpeedDays: 7 },
  "FundedNext Futures": { drawdownType: "Trailing", dailyLoss: "5%", trailingStop: "$3,000", minDays: "5 days", payoutSpeed: "1–2 days", payoutSpeedDays: 2 },
  "Tradeify": { drawdownType: "Trailing", dailyLoss: "None", trailingStop: "$2,500", minDays: "0 days", payoutSpeed: "1–3 days", payoutSpeedDays: 3 },
  "Bluenox": { drawdownType: "Static", dailyLoss: "4%", trailingStop: "$3,000", minDays: "5 days", payoutSpeed: "2–4 days", payoutSpeedDays: 4 },
  "Funded Futures Network": { drawdownType: "EOD", dailyLoss: "None", trailingStop: "$2,000", minDays: "1 day", payoutSpeed: "Weekly", payoutSpeedDays: 7 },
  "Lucid Trading": { drawdownType: "Trailing", dailyLoss: "None", trailingStop: "$2,500", minDays: "0 days", payoutSpeed: "Same day", payoutSpeedDays: 1 },
  "Legends Trading": { drawdownType: "Static", dailyLoss: "3%", trailingStop: "$3,000", minDays: "5 days", payoutSpeed: "Weekly", payoutSpeedDays: 7 },
  "DayTraders.com": { drawdownType: "EOD", dailyLoss: "4%", trailingStop: "$3,500", minDays: "10 days", payoutSpeed: "Bi-weekly", payoutSpeedDays: 14 },
  "Earn2Trade": { drawdownType: "Trailing", dailyLoss: "5%", trailingStop: "$2,000", minDays: "10 days", payoutSpeed: "1–2 days", payoutSpeedDays: 2 },
};

export const compareFirms: CompareFirm[] = reviewFirms.map((f) => ({
  ...f,
  ...(extras[f.name] ?? { drawdownType: "Trailing" as DrawdownType, dailyLoss: "—", trailingStop: "—", minDays: "—", payoutSpeed: "—", payoutSpeedDays: 7 }),
}));