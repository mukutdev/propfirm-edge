ALTER TABLE public.prop_firms
  ADD COLUMN IF NOT EXISTS assets text[] NOT NULL DEFAULT '{}'::text[];

UPDATE public.prop_firms
SET assets = (
  SELECT ARRAY(
    SELECT a FROM (VALUES
      ('Futures'),
      ('Forex'),
      ('Crypto'),
      ('Stocks')
    ) AS t(a)
    WHERE
      (a = 'Futures')
      OR (a = 'Forex'  AND EXISTS (SELECT 1 FROM unnest(instrument_list) i WHERE i ~* '6E|6B|6J|EUR|GBP|USD|DX'))
      OR (a = 'Crypto' AND EXISTS (SELECT 1 FROM unnest(instrument_list) i WHERE i ~* 'BTC|ETH|MBT|Bitcoin|Ether'))
      OR (a = 'Stocks' AND EXISTS (SELECT 1 FROM unnest(instrument_list) i WHERE i ~* 'ES|NQ|YM|RTY|MES|MNQ|S&P|Nasdaq|Dow|Russell|Equity|Index'))
  )
)
WHERE cardinality(assets) = 0;