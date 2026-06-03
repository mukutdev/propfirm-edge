
## Update prop firm roster

Replace the placeholder firms with the user's 11 firms across `src/lib/home-data.ts`. The UI components (FeaturedFirms, ComparisonTable, TickerBar) read from this file, so no component edits are needed.

### Ticker (all 11, with a short hook each)
- Apex Trader Funding • Up to $300K Funding
- Lucid Trading • Same-Day Payouts
- FundedNext Futures • 90% Profit Split
- Take Profit Trader • 1-Step Evaluation
- Tradeify • Flexible Drawdown
- Legends Trading • Pro Trader Program
- MyFundedFutures • $0 Activation
- Funded Futures Network • Scalable Accounts
- DayTraders.com • Trusted Veteran Firm
- Bluenox • 2-Step Evaluation
- TradeDay • No Daily Drawdown

### Featured firms grid (all 11 shown)
Each card keeps the same shape (name, rating, max funding, profit split, monthly fee, badge). Plausible placeholder values:

| Firm | Rating | Max Funding | Split | Fee | Badge |
|---|---|---|---|---|---|
| Apex Trader Funding | 4.8 | $300K | 90% | $137/mo | Editor's Pick (purple) |
| MyFundedFutures | 4.7 | $150K | 90% | $80/mo | Fast Payouts (pink) |
| TradeDay | 4.6 | $100K | 85% | $99/mo | Best for Beginners (green) |
| Take Profit Trader | 4.5 | $150K | 90% | $150/mo | 1-Step Eval (purple) |
| FundedNext Futures | 4.5 | $200K | 90% | $99/mo | New & Trusted (pink) |
| Tradeify | 4.4 | $100K | 90% | $107/mo | Flexible Rules (green) |
| Bluenox | 4.3 | $250K | 90% | $115/mo | Best Value (purple) |
| Funded Futures Network | 4.3 | $100K | 90% | $97/mo | Community Pick (pink) |
| Lucid Trading | 4.2 | $150K | 90% | $125/mo | Fast Funding (green) |
| Legends Trading | 4.1 | $150K | 85% | $130/mo | Pro Program (purple) |
| DayTraders.com | 4.0 | $100K | 80% | $99/mo | Veteran Firm (pink) |

### Comparison table (top 5 by rating)
Apex Trader Funding (highlighted top pick), MyFundedFutures, TradeDay, Take Profit Trader, FundedNext Futures — keep the existing 6 columns (Firm | Max Account | Profit Split | Drawdown Type | Futures Allowed | Our Rating).

### Out of scope
No component code changes, no styling changes, no new routes.
