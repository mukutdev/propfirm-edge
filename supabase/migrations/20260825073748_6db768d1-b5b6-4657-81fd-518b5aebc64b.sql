CREATE TABLE public.prop_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  recommended text NOT NULL DEFAULT 'Solid Choice',
  verdict text NOT NULL DEFAULT '',
  max_account text NOT NULL DEFAULT '',
  profit_split text NOT NULL DEFAULT '',
  challenge_fee text NOT NULL DEFAULT '',
  drawdown_type text NOT NULL DEFAULT '',
  payout_frequency text NOT NULL DEFAULT '',
  evaluation_type text NOT NULL DEFAULT '1-step',
  platforms text[] NOT NULL DEFAULT '{}',
  instrument_list text[] NOT NULL DEFAULT '{}',
  coupon_code text NOT NULL DEFAULT '',
  affiliate_url text NOT NULL DEFAULT '',
  funding_numeric integer NOT NULL DEFAULT 0,
  fee_numeric integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.prop_firms TO anon;
GRANT SELECT ON public.prop_firms TO authenticated;
GRANT ALL ON public.prop_firms TO service_role;

ALTER TABLE public.prop_firms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Prop firms are publicly readable"
  ON public.prop_firms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE public.firm_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_id uuid NOT NULL REFERENCES public.prop_firms(id) ON DELETE CASCADE,
  trader_name text NOT NULL,
  rating integer NOT NULL,
  review_text text NOT NULL,
  is_verified boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT firm_reviews_rating_range CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT firm_reviews_status_values CHECK (status IN ('pending','approved','rejected'))
);

CREATE INDEX firm_reviews_firm_status_idx
  ON public.firm_reviews (firm_id, status, created_at DESC);

GRANT SELECT, INSERT ON public.firm_reviews TO anon;
GRANT SELECT, INSERT ON public.firm_reviews TO authenticated;
GRANT ALL ON public.firm_reviews TO service_role;

ALTER TABLE public.firm_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are publicly readable"
  ON public.firm_reviews FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Anyone can submit a review for moderation"
  ON public.firm_reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND is_verified = false
    AND char_length(trader_name) BETWEEN 2 AND 60
    AND char_length(review_text) BETWEEN 20 AND 4000
  );

INSERT INTO public.prop_firms
  (slug, name, rating, recommended, verdict, max_account, profit_split, challenge_fee, drawdown_type, payout_frequency, evaluation_type, platforms, instrument_list, coupon_code, funding_numeric, fee_numeric, updated_at)
VALUES
  ('apex-trader-funding','Apex Trader Funding',4.8,'Top Pick','Apex is still the default answer for futures traders who want size. A 1-step evaluation, 90% split and allocation up to $300K, with a trailing drawdown that tightens the moment you bank a big day.','$300,000','90%','$137/mo','Trailing','Same week','1-step',ARRAY['Rithmic','Tradovate','NinjaTrader','TradingView'],ARRAY['NQ','ES','RTY','YM','CL','GC','MNQ','MES'],'TWPF20',300000,137,now() - interval '3 days'),
  ('myfundedfutures','MyFundedFutures',4.7,'Top Pick','The cheapest serious evaluation on this list. Intraday drawdown resets each session, payouts clear every five trading days, and the rule set is short enough to actually read.','$150,000','90%','$80/mo','Intraday','Every 5 trading days','1-step',ARRAY['Tradovate','TradingView','Quantower'],ARRAY['NQ','ES','RTY','MNQ','MES'],'TWPF15',150000,80,now() - interval '5 days'),
  ('tradeday','TradeDay',4.6,'Recommended','End-of-day drawdown is the whole pitch here. Intraday heat will not close your account, which makes TradeDay the most forgiving structure for traders still tightening their risk model.','$100,000','85%','$99/mo','End of day','Bi-weekly','1-step',ARRAY['NinjaTrader','Tradovate','TradingView'],ARRAY['NQ','ES','CL','MNQ','MES'],'TWPF10',100000,99,now() - interval '8 days'),
  ('take-profit-trader','Take Profit Trader',4.5,'Recommended','A static drawdown that never trails, so the plan you write on day one is the plan you trade on day thirty. You pay for that with a higher monthly fee.','$150,000','90%','$150/mo','Static','Bi-weekly','1-step',ARRAY['Tradovate','TradingView'],ARRAY['NQ','ES','YM','MNQ'],'TWPF10',150000,150,now() - interval '11 days'),
  ('fundednext-futures','FundedNext Futures',4.5,'Recommended','The futures arm of a heavyweight prop. Broad platform support and global payout rails, with a trailing drawdown that demands you flatten winners rather than hold for the runner.','$200,000','90%','$99/mo','Trailing','Bi-weekly','1-step',ARRAY['Tradovate','TradingView','MT5'],ARRAY['NQ','ES','EURUSD','MNQ'],'TWPF20',200000,99,now() - interval '6 days'),
  ('tradeify','Tradeify',4.4,'Recommended','Weekly payouts and clean Tradovate execution at a mid-tier price. The trailing drawdown locks in profit fast, which helps discipline and hurts swing-style intraday holds.','$100,000','90%','$107/mo','Trailing','Weekly','1-step',ARRAY['Tradovate','TradingView'],ARRAY['NQ','ES','CL','MNQ','MES'],'TWPF10',100000,107,now() - interval '9 days'),
  ('bluenox','Bluenox',4.3,'Solid Choice','European-run 2-step evaluation with fast KYC and end-of-day drawdown. Good for DAX and index traders who want allocation up to $250K without US-only payout rails.','$250,000','90%','$115/mo','End of day','Bi-weekly','2-step',ARRAY['Rithmic','Quantower','TradingView'],ARRAY['NQ','ES','DAX','FDAX'],'TWPF10',250000,115,now() - interval '14 days'),
  ('funded-futures-network','Funded Futures Network',4.3,'Solid Choice','Community-driven futures prop with weekly payouts and a published rule set. Allocation ceiling is modest, but the evaluation is honest and the Discord is active.','$100,000','90%','$97/mo','Intraday','Weekly','1-step',ARRAY['Tradovate','TradingView'],ARRAY['NQ','ES','MNQ','MES'],'TWPF10',100000,97,now() - interval '12 days'),
  ('lucid-trading','Lucid Trading',4.2,'Solid Choice','Same-day payout processing is the headline, and it holds up. Newer firm, so treat the trailing drawdown and the shorter track record as the risk you are pricing.','$150,000','90%','$125/mo','Trailing','Same day','1-step',ARRAY['Rithmic','Tradovate'],ARRAY['NQ','ES','GC','CL'],'TWPF15',150000,125,now() - interval '4 days'),
  ('earn2trade','Earn2Trade',4.2,'Solid Choice','Education-first prop with the longest-running evaluation programme here. The 80% split is below market, but end-of-day drawdown and real coaching earn part of that back.','$200,000','80%','$150/mo','End of day','Bi-weekly','1-step',ARRAY['NinjaTrader','Finamark','Rithmic'],ARRAY['NQ','ES','CL','EURUSD'],'TWPF10',200000,150,now() - interval '18 days'),
  ('legends-trading','Legends Trading',4.1,'Solid Choice','A pro-trader track aimed at experienced futures traders scaling size. Two evaluation stages and a trailing drawdown make this the wrong first account and a fine second one.','$150,000','85%','$130/mo','Trailing','Bi-weekly','2-step',ARRAY['Rithmic','Quantower'],ARRAY['NQ','ES','CL','GC'],'TWPF10',150000,130,now() - interval '21 days'),
  ('daytraders','DayTraders.com',4.0,'Solid Choice','A veteran multi-asset shop with a long payout history. The 80% split and 2-step evaluation feel dated next to newer futures props, but the firm has been paying for years.','$100,000','80%','$99/mo','End of day','Bi-weekly','2-step',ARRAY['NinjaTrader','MT5','Rithmic'],ARRAY['NQ','ES','EURUSD','BTC'],'TWPF10',100000,99,now() - interval '25 days');

INSERT INTO public.firm_reviews (firm_id, trader_name, rating, review_text, is_verified, status, created_at)
SELECT f.id, v.trader_name, v.rating, v.review_text, v.is_verified, 'approved', now() - (v.days || ' days')::interval
FROM public.prop_firms f
JOIN (VALUES
  ('apex-trader-funding','Marcus D.',5,'Passed the eval in 11 sessions trading MNQ off the open. First payout request cleared in three business days, no KYC drama and no clawback questions.',true,4),
  ('apex-trader-funding','Priya S.',4,'Allocation ceiling is unmatched, but the trailing drawdown is real. I gave back one funded account learning to flatten instead of holding for the runner.',true,12),
  ('apex-trader-funding','Tom R.',5,'Six payouts in and still paid on schedule every cycle. The consistency rule keeps you honest about size, which is not a bad thing.',false,21),
  ('myfundedfutures','Alex K.',5,'Cheapest serious evaluation I have traded. The intraday loss limit resetting daily suits how I scalp ES around the cash open.',true,6),
  ('myfundedfutures','Dana W.',4,'Payouts every five trading days changed my cash flow completely. Support is slow to answer over the weekend, that is the only gripe.',true,17),
  ('tradeday','Chris B.',5,'End-of-day drawdown is why I stayed. Intraday heat does not kill the account while a trade is still working out.',true,9),
  ('tradeday','Sofia M.',4,'Beginner-friendly rule set, smaller allocation ceiling. Perfect as a first funded account before moving size elsewhere.',false,25),
  ('take-profit-trader','Nate H.',4,'Static drawdown means I can actually size the way my plan says. Both bi-weekly payout requests cleared without a follow-up email.',true,14),
  ('tradeify','Owen L.',4,'Weekly payouts and clean Tradovate fills. The trailing drawdown tightened fast after a big CL day, so plan your risk before the session.',true,8),
  ('fundednext-futures','Ibrahim A.',4,'Solid rules and support that answers across time zones. The evaluation target was reachable trading NQ twice a day without forcing setups.',false,19)
) AS v(slug, trader_name, rating, review_text, is_verified, days) ON v.slug = f.slug;