export interface FuturesContract {
  symbol: string;
  name: string;
  tick: number; // min tick size in points
  tickValue: number; // $ per tick
  pointValue: number; // $ per full point
}

export type Sector =
  | "E-mini"
  | "Micro E-mini"
  | "Nano E-mini"
  | "Energy"
  | "Metals"
  | "Treasuries"
  | "Agricultural"
  | "Livestock";

export const FUTURES_CONTRACTS: Record<Sector, FuturesContract[]> = {
  "E-mini": [
    { symbol: "ES", name: "E-mini S&P 500", tick: 0.25, tickValue: 12.5, pointValue: 50 },
    { symbol: "NQ", name: "E-mini Nasdaq-100", tick: 0.25, tickValue: 5, pointValue: 20 },
    { symbol: "YM", name: "E-mini Dow", tick: 1, tickValue: 5, pointValue: 5 },
    { symbol: "RTY", name: "E-mini Russell 2000", tick: 0.1, tickValue: 5, pointValue: 50 },
  ],
  "Micro E-mini": [
    { symbol: "MES", name: "Micro E-mini S&P 500", tick: 0.25, tickValue: 1.25, pointValue: 5 },
    { symbol: "MNQ", name: "Micro E-mini Nasdaq-100", tick: 0.25, tickValue: 0.5, pointValue: 2 },
    { symbol: "MYM", name: "Micro E-mini Dow", tick: 1, tickValue: 0.5, pointValue: 0.5 },
    { symbol: "M2K", name: "Micro E-mini Russell 2000", tick: 0.1, tickValue: 0.5, pointValue: 5 },
  ],
  "Nano E-mini": [
    { symbol: "NES", name: "Nano S&P 500", tick: 0.05, tickValue: 0.05, pointValue: 1 },
    { symbol: "NNQ", name: "Nano Nasdaq-100", tick: 0.05, tickValue: 0.01, pointValue: 0.2 },
  ],
  Energy: [
    { symbol: "CL", name: "Crude Oil WTI", tick: 0.01, tickValue: 10, pointValue: 1000 },
    { symbol: "MCL", name: "Micro Crude Oil", tick: 0.01, tickValue: 1, pointValue: 100 },
    { symbol: "NG", name: "Natural Gas", tick: 0.001, tickValue: 10, pointValue: 10000 },
    { symbol: "MNG", name: "Micro Natural Gas", tick: 0.001, tickValue: 1, pointValue: 1000 },
    { symbol: "RB", name: "RBOB Gasoline", tick: 0.0001, tickValue: 4.2, pointValue: 42000 },
    { symbol: "HO", name: "Heating Oil", tick: 0.0001, tickValue: 4.2, pointValue: 42000 },
  ],
  Metals: [
    { symbol: "GC", name: "Gold", tick: 0.1, tickValue: 10, pointValue: 100 },
    { symbol: "MGC", name: "Micro Gold", tick: 0.1, tickValue: 1, pointValue: 10 },
    { symbol: "SI", name: "Silver", tick: 0.005, tickValue: 25, pointValue: 5000 },
    { symbol: "SIL", name: "Micro Silver", tick: 0.005, tickValue: 5, pointValue: 1000 },
    { symbol: "HG", name: "Copper", tick: 0.0005, tickValue: 12.5, pointValue: 25000 },
    { symbol: "MHG", name: "Micro Copper", tick: 0.0005, tickValue: 1.25, pointValue: 2500 },
    { symbol: "PL", name: "Platinum", tick: 0.1, tickValue: 5, pointValue: 50 },
  ],
  Treasuries: [
    { symbol: "ZB", name: "30-Year T-Bond", tick: 0.03125, tickValue: 31.25, pointValue: 1000 },
    { symbol: "ZN", name: "10-Year T-Note", tick: 0.015625, tickValue: 15.625, pointValue: 1000 },
    { symbol: "ZF", name: "5-Year T-Note", tick: 0.0078125, tickValue: 7.8125, pointValue: 1000 },
    { symbol: "ZT", name: "2-Year T-Note", tick: 0.00390625, tickValue: 7.8125, pointValue: 2000 },
    { symbol: "SR3", name: "3-Month SOFR", tick: 0.005, tickValue: 12.5, pointValue: 2500 },
    { symbol: "10Y", name: "Micro 10-Year Yield", tick: 0.001, tickValue: 1, pointValue: 1000 },
  ],
  Agricultural: [
    { symbol: "ZC", name: "Corn", tick: 0.25, tickValue: 12.5, pointValue: 50 },
    { symbol: "ZW", name: "Wheat", tick: 0.25, tickValue: 12.5, pointValue: 50 },
    { symbol: "ZS", name: "Soybeans", tick: 0.25, tickValue: 12.5, pointValue: 50 },
    { symbol: "ZL", name: "Soybean Oil", tick: 0.01, tickValue: 6, pointValue: 600 },
    { symbol: "ZM", name: "Soybean Meal", tick: 0.1, tickValue: 10, pointValue: 100 },
    { symbol: "KC", name: "Coffee", tick: 0.05, tickValue: 18.75, pointValue: 375 },
    { symbol: "SB", name: "Sugar #11", tick: 0.01, tickValue: 11.2, pointValue: 1120 },
  ],
  Livestock: [
    { symbol: "LE", name: "Live Cattle", tick: 0.025, tickValue: 10, pointValue: 400 },
    { symbol: "HE", name: "Lean Hogs", tick: 0.025, tickValue: 10, pointValue: 400 },
    { symbol: "GF", name: "Feeder Cattle", tick: 0.025, tickValue: 12.5, pointValue: 500 },
  ],
};

export const TOTAL_CONTRACTS = Object.values(FUTURES_CONTRACTS).reduce(
  (n, list) => n + list.length,
  0
);
