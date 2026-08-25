CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  author_name text NOT NULL DEFAULT 'Trading With Prop Firms',
  read_time_mins integer NOT NULL DEFAULT 6,
  featured_image text,
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are publicly readable"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.blog_posts (title, slug, category, excerpt, content, author_name, read_time_mins, is_featured, published_at) VALUES
('The Complete Guide to Passing a Prop Firm Evaluation in 2026', 'passing-a-prop-firm-evaluation', 'prop-firm-guides',
 'The exact risk framework funded traders use to clear an evaluation on the first attempt — sizing, daily loss caps, and the routine that keeps drawdown intact.',
 E'## Why most evaluations fail\n\nMost traders do not fail an evaluation because their strategy is broken. They fail because position size is set for the profit target instead of the drawdown limit. On a 50K account with a 2,000 trailing drawdown, two full-size NQ losers can end the account before the strategy has a sample size.\n\n## Set your risk off the drawdown, not the target\n\nDivide your total drawdown by 10. That is your maximum loss per trade. On a 2,000 drawdown that is 200 per trade — roughly 10 ticks on one NQ contract. Ten consecutive losers still leave you in the evaluation.\n\n## Daily loss cap\n\nCap the day at two maximum losses. Once you are down 400, the platform gets closed. Nearly every blown evaluation traces back to a revenge session after a red morning.\n\n## Build the profit target from base hits\n\nA 3,000 profit target on a 50K account is 15 clean 200-dollar wins. Framed that way you stop reaching for a single hero trade and start compounding small edges.\n\n## Routine before the open\n\n- Mark the overnight high and low.\n- Note the economic calendar and skip the two minutes around a release.\n- Write your maximum contracts on paper before the bell.\n\n## Once you pass\n\nDo not change size the moment you are funded. Trade the funded account exactly like the eval for the first payout cycle, then scale according to the firm''s scaling plan.',
 'Hanuman', 12, true, now() - interval '2 days'),

('How Prop Firms Work: A Complete Beginner''s Guide', 'how-prop-firms-work', 'prop-firm-guides',
 'Where the money actually comes from, how payouts clear, and what the firm is really underwriting when it hands you a funded account.',
 E'## The basic model\n\nA futures prop firm sells an evaluation, then routes the traders who pass onto either a live funded account or a simulated account backed by the firm''s own liquidity. Evaluation fees fund operations; profitable traders are paid out of firm capital or live routing revenue.\n\n## What the firm is underwriting\n\nThe firm is not betting on your win rate. It is betting that your maximum loss is capped by the drawdown rule, which means its downside on any trader is known in advance.\n\n## The path to a payout\n\n1. Pass the evaluation profit target without breaching drawdown.\n2. Satisfy the consistency and minimum-trading-days rules.\n3. Request a payout — most firms clear in one to five business days.\n\n## What to check before you pay\n\nDrawdown type, payout split, minimum days, consistency rule, and whether news trading is allowed. Two firms with identical marketing can differ enormously on these five lines.',
 'Hanuman', 9, false, now() - interval '6 days'),

('Trailing vs Static Drawdown Explained', 'trailing-vs-static-drawdown', 'prop-firm-guides',
 'The most misunderstood rule in prop trading, worked through with tick-by-tick examples on a 50K account.',
 E'## Static drawdown\n\nYour loss limit sits at a fixed dollar level from day one. On a 50K account with a 2,000 static drawdown, the floor is 48,000 and it never moves until you are funded.\n\n## Trailing drawdown\n\nThe floor follows your account''s peak. Run the account to 52,000 and the floor moves to 50,000. Unrealised profit counts at most firms, which is why traders get stopped out while technically green on the month.\n\n## Worked example\n\nOpen at 50,000. Take the account to 51,500 intraday and give it all back: with static drawdown you still have 1,500 of room, with trailing you have 500.\n\n## How to trade a trailing account\n\nBank partial profits before the drawdown ratchets against you, and avoid holding large unrealised gains through a chop period.',
 'Sarah Ng', 7, false, now() - interval '9 days'),

('What Futures Contracts Actually Are', 'what-futures-contracts-are', 'futures-trading',
 'Contract specs, tick values, and margin explained without jargon — plus why prop firms build their evaluations around them.',
 E'## A contract, not a share\n\nA futures contract is an agreement to buy or sell an asset at a set price on a set date. You never intend to take delivery; you close the position before expiry.\n\n## Tick values you need memorised\n\n- ES: 12.50 per tick, MES: 1.25\n- NQ: 5.00 per tick, MNQ: 0.50\n- CL: 10.00 per tick\n- GC: 10.00 per tick\n\n## Why prop firms prefer futures\n\nCentralised exchange pricing, regulated clearing, and standardised tick values make risk modelling straightforward — the firm knows exactly what one contract of exposure costs.\n\n## Start on micros\n\nMicros let you take a full technical setup at one-tenth the risk. On an evaluation with a tight drawdown, that difference decides whether you survive a bad week.',
 'David Kim', 6, false, now() - interval '4 days'),

('Best Futures Instruments for Prop Evaluations', 'best-futures-instruments-for-prop-evaluations', 'futures-trading',
 'NQ, ES, MNQ or MES — matching contract size to your account tier and drawdown budget.',
 E'## Match the contract to the drawdown\n\nOn a 50K account with 2,000 of room, one NQ contract risks 200 for a 10-tick stop. That is 10 percent of your total drawdown on a single trade. MNQ takes the same setup down to 20 dollars.\n\n## Liquidity windows\n\nES and NQ are deepest from the 9:30 ET open through midday. CL is cleanest around the 10:30 inventory report. GC trends best on the London-New York overlap.\n\n## Practical pairings\n\n- 25K account: MNQ or MES only\n- 50K account: 1-2 NQ or 5-10 MNQ\n- 100K+: 3-5 NQ, or split across ES and NQ\n\n## Avoid stacking correlated risk\n\nES and NQ move together. Two contracts across both is not diversification — it is one bigger index trade.',
 'Hanuman', 8, false, now() - interval '11 days'),

('Position Sizing for a Trailing Drawdown', 'position-sizing-trailing-drawdown', 'risk-management',
 'A simple formula that keeps you inside the drawdown through a losing streak, with a per-tier contract table.',
 E'## The formula\n\nMax risk per trade = total drawdown / 10. Max contracts = max risk per trade / (stop in ticks x tick value).\n\n## Worked table for a 50K account (2,000 drawdown)\n\n- 10-tick stop on MNQ (0.50/tick): 200 / 5 = 40 micros theoretical, cap at 10.\n- 10-tick stop on NQ (5.00/tick): 200 / 50 = 4 contracts theoretical, trade 1-2.\n\n## Why divide by ten\n\nTen units of risk means a five-trade losing streak costs half your buffer, not all of it. Traders who risk a quarter of the drawdown per trade are two bad trades from a breach.\n\n## Ratchet risk down, never up\n\nAfter two losses in a day, halve size. After a payout, keep size flat for a full cycle.',
 'Marcus Chen', 8, false, now() - interval '3 days'),

('Daily Loss Limits: Setting Them and Respecting Them', 'daily-loss-limits', 'risk-management',
 'How to pick a daily stop that fits your firm''s rules, and the mechanical steps that make it stick when you are tilted.',
 E'## Pick the number before the open\n\nYour daily cap should be no more than a third of the total drawdown, and ideally two maximum trade losses.\n\n## Make it mechanical\n\nSet a bracket order, set a platform daily loss limit if your firm supports one, and physically close the platform when it hits. Willpower fails at the worst possible moment.\n\n## Track the streak, not the day\n\nThree red days in a row is a strategy signal, not a sizing problem. Drop to micros and rebuild the sample before scaling back up.\n\n## Firms that enforce it for you\n\nSeveral futures firms hard-stop the account at the daily loss limit rather than failing the evaluation outright. That is a feature worth paying for if discipline is your weak point.',
 'Sarah Ng', 6, false, now() - interval '13 days'),

('Trading Through a Losing Streak Without Blowing the Account', 'trading-through-a-losing-streak', 'trading-psychology',
 'Revenge trading, size creep, and the recovery routine funded traders use after a red week.',
 E'## The tilt sequence\n\nIt is almost always the same order: a stop gets moved, size goes up to recover, the daily cap gets ignored, the account breaches. Recognising step one is the whole game.\n\n## The reset protocol\n\n1. Stop trading for the session at your daily cap. No exceptions.\n2. Review the losing trades against your written plan — were they setups or improvisation?\n3. Return the next day at half size until you have three green sessions.\n\n## Detach from the payout\n\nTraders who count the payout mid-evaluation start managing money instead of managing risk. Judge the day on whether you followed the plan, not on P&L.\n\n## Journal two lines per trade\n\nSetup, and whether you followed the rule. That is enough data to spot the pattern in a week.',
 'Marcus Chen', 7, false, now() - interval '7 days');