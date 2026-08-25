ALTER TABLE public.prop_firms
  ADD COLUMN IF NOT EXISTS promo_expiry date,
  ADD COLUMN IF NOT EXISTS deal_type text NOT NULL DEFAULT 'percentage',
  ADD COLUMN IF NOT EXISTS promo_discount integer NOT NULL DEFAULT 0;